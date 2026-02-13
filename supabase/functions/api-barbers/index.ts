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
      const status = url.searchParams.get("status");

      let query = supabase
        .from("barbers")
        .select("*, barber_services(service_id, services(name))")
        .order("name");

      if (status) query = query.eq("status", status);

      const { data, error } = await query;
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ data });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const { name, phone, email, commission_percentage, schedule } = body;

      if (!name) {
        return jsonResponse({ error: "Missing required field: name" }, 400);
      }

      const { data: barbershopId } = await supabase.rpc("get_user_barbershop_id");

      const { data, error } = await supabase
        .from("barbers")
        .insert({
          name,
          phone: phone || null,
          email: email || null,
          commission_percentage: commission_percentage || 40,
          schedule: schedule || undefined,
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
