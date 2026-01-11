
import { createClient } from '@supabase/supabase-js';

// Utamakan environment variables dari Vite/Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gwxprdwhjyvyhnjrqfio.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_DssLhpB9hMyze7ZqCQsflg_CVgawYsy';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials are missing! Check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
