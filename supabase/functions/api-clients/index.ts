import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function authenticate(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims) {
    return { error: "Unauthorized", status: 401 };
  }

  return { supabase, userId: data.claims.sub as string };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const auth = await authenticate(req);
  if ("error" in auth) {
    return jsonResponse({ error: auth.error }, auth.status);
  }
  const { supabase } = auth;

  try {
    if (req.method === "GET") {
      const url = new URL(req.url);
      const phone = url.searchParams.get("phone");
      const search = url.searchParams.get("search");

      let query = supabase
        .from("clients")
        .select("*")
        .order("name");

      if (phone) query = query.eq("phone", phone);
      if (search) query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);

      const { data, error } = await query;
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ data });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const { name, phone, email, notes } = body;

      if (!name || !phone) {
        return jsonResponse({ error: "Missing required fields: name, phone" }, 400);
      }

      const { data: barbershopId } = await supabase.rpc("get_user_barbershop_id");

      const { data, error } = await supabase
        .from("clients")
        .insert({
          name,
          phone,
          email: email || null,
          notes: notes || null,
          barbershop_id: barbershopId,
        })
        .select()
        .single();

      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ data }, 201);
    }

    return jsonResponse({ error: "Method not allowed" }, 405);
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
});
