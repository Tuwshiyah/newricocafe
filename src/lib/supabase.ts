import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bedqdhqzswjzlnvnpvvi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZHFkaHF6c3dqemxudm5wdnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMzI4ODUsImV4cCI6MjA4NDcwODg4NX0.6rZBGWfCKE_hWMxIfhnbwexOe5riq1oMDPxraUTr6cE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  display_order: number;
  image_url: string | null;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  is_available: boolean;
  display_order: number;
  created_at: string;
}
