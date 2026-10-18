import { useSupabase } from "../context/SupabaseContext.jsx";

const supabase = useSupabase();



export async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'valid.email@supabase.io',
    password: 'example-password',
  })
}