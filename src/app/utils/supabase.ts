import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
