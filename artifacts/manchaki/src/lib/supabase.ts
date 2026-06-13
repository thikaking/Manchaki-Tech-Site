import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "VITE_SUPABASE_URL is not defined. Check your .env file."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "VITE_SUPABASE_ANON_KEY is not defined. Check your .env file."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

/**
 * Verify that the Supabase environment variables are correctly configured.
 * Returns true if both URL and anon key are present and properly formatted.
 */
export function isSupabaseConfigured(): boolean {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) return false;
    if (typeof url !== "string" || typeof key !== "string") return false;
    if (url === "your_supabase_project_url_here") return false;
    if (key === "your_supabase_anon_key_here") return false;

    // Basic URL validation
    new URL(url);

    return true;
  } catch {
    return false;
  }
}