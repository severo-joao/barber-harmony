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
      const date = url.searchParams.get("date");
      const barberId = url.searchParams.get("barber_id");

      let query = supabase
        .from("appointments")
        .select("*, barbers(name), clients(name, phone), services(name, price)")
        .order("scheduled_date", { ascending: false })
        .order("scheduled_time", { ascending: true });

      if (status) query = query.eq("status", status);
      if (date) query = query.eq("scheduled_date", date);
      if (barberId) query = query.eq("barber_id", barberId);

      const { data, error } = await query;
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ data });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const { barber_id, client_id, service_id, scheduled_date, scheduled_time, notes } = body;

      if (!barber_id || !client_id || !service_id || !scheduled_date || !scheduled_time) {
        return jsonResponse({ error: "Missing required fields: barber_id, client_id, service_id, scheduled_date, scheduled_time" }, 400);
      }

      // Fetch service details for price/duration
      const { data: service } = await supabase
        .from("services")
        .select("price, duration_minutes, commission_percentage")
        .eq("id", service_id)
        .single();

      if (!service) return jsonResponse({ error: "Service not found" }, 404);

      // Get barbershop_id from profile
      const { data: barbershopId } = await supabase.rpc("get_user_barbershop_id");

      const commissionAmount = (Number(service.price) * (service.commission_percentage || 40)) / 100;

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          barber_id,
          client_id,
          service_id,
          scheduled_date,
          scheduled_time,
          notes: notes || null,
          barbershop_id: barbershopId,
          price: service.price,
          duration_minutes: service.duration_minutes,
          commission_amount: commissionAmount,
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
