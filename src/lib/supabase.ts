import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigurado = Boolean(url && anonKey);

// Singleton: cada createClient() programa sus propios temporizadores de
// auto-refresh de sesión. Crear uno por petición (p. ej. en el sondeo en
// vivo del panel) acumulaba cientos de clientes y colgaba el navegador.
let cliente: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  cliente ??= createClient(url, anonKey);
  return cliente;
}