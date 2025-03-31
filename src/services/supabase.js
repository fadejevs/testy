import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In production, use environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'your-supabase-key';

export const supabase = createClient(supabaseUrl, supabaseKey); 