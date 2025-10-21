import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://ujidpqjtwtsulfpsctmh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqaWRwcWp0d3RzdWxmcHNjdG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTYwMTEsImV4cCI6MjA3NjQzMjAxMX0.e2_TKrXBEgUOeH9M7igXLZKYnaQCFOAWezvMgibs27U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
