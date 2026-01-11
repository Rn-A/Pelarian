import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  // @ts-ignore
  const env = import.meta.env;
  return env?.[key] || '';
};

// Gunakan URL project Anda sebagai default
const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://zwbpwcyoljhebvuhblmc.supabase.co';
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
