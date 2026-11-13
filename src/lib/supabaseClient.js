/**
 * Cấu hình Supabase Client
 * Chỉ sử dụng VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY.
 * Tuyệt đối KHÔNG cấu hình hay để lộ VITE_SUPABASE_SERVICE_ROLE_KEY trên Frontend!
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-public-key-not-secret';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('demo-placeholder')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
