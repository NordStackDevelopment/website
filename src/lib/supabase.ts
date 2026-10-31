// Supabase client for the browser and for build-time data loading.
// Filled in during Phase 3, once the Supabase project exists. Uses the public key only.
import { createClient } from '@supabase/supabase-js';

export function getSupabase() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY must be set (see .env.example).');
  }
  return createClient(url, key);
}
