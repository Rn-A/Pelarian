// Supabase client deactivated - Reverted to local state
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
    signInWithPassword: async () => ({ error: new Error("Supabase is disabled.") })
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    upsert: async () => ({ error: null }),
    delete: () => ({ in: async () => ({ error: null }), neq: async () => ({ error: null }) })
  })
} as any;