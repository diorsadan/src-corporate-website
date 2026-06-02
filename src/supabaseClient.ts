import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    "Supabase environment variables not configured. Using mock client."
  );
  // Create a mock query builder that returns chainable methods
  const mockQuery = {
    order: () => mockQuery,
    eq: () => Promise.resolve({ data: [], error: null }),
    select: () => mockQuery,
  };

  // Create a minimal mock to prevent crashes
  supabase = {
    auth: {
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () =>
        Promise.reject(
          new Error("Supabase not configured")
        ),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => mockQuery,
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.reject(new Error("Storage not configured")),
        remove: () => Promise.resolve({ data: [], error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  };
}

export { supabase };

