
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  // @ts-ignore
  const env = import.meta.env;
  return env?.[key] || '';
};

// Menggunakan kredensial baru yang diberikan oleh user
const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://gwxprdwhjyvyhnjrqfio.supabase.co';
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || 'sb_publishable_DssLhpB9hMyze7ZqCQsflg_CVgawYsy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
