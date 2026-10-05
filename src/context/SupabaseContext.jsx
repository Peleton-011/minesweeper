import { createContext, useContext, ReactNode } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

const SupabaseContext = createContext<SupabaseClient>(supabase)

// export const SupabaseProvider = ({ children }: { children: ReactNode }) => (
//   <SupabaseContext.Provider value={supabase}>
//     {children}
//   </SupabaseContext.Provider>
// )

export const useSupabase = () => supabase;