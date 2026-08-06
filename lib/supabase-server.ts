import { createClient } from "@supabase/supabase-js";

// Server-only. Never import this from a client component — it uses the
// service role key, which must never reach the browser.
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
