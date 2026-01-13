import { createClient } from '@supabase/supabase-js';

// Menggunakan kredensial project yang Anda berikan
const supabaseUrl = 'https://gwxprdwhjyvyhnjrqfio.supabase.co';
const supabaseAnonKey = 'sb_publishable_DssLhpB9hMyze7ZqCQsflg_CVgawYsy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);