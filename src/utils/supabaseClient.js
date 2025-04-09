import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create a single client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log that we're creating the client (for debugging)
console.log('Supabase client initialized in utils/supabaseClient.js'); 