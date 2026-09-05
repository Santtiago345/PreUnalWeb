import { getSupabase } from "@/lib/supabase";
import type { Respuesta, ResultadoSimulacro } from "@/lib/calificacion";

export async function estaHabilitado(): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return true;
  const { data } = await supabase
    .from("simulacro_config")
    .select("habilitado")
    .eq("id", 1)
    .single();
  return data?.habilitado ?? true;
}

export async function habilitarSimulacro(habilitado: boolean): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase
    .from("simulacro_config")
    .upsert({ id: 1, habilitado });
  return !error;
}

export async function iniciarSesion(nombre: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("simulacro_sesiones")
    .insert({ nombre })
    .select("id")
    .single();
  if (error || !data) return null;
  return data.id;
}

export async function actualizarProgreso(
  sesionId: string,
  respondidas: number,
  faltas: number,
) {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase
    .from("simulacro_sesiones")
    .update({
      respondidas,
      faltas,
      ultima_actividad: new Date().toISOString(),
    })
    .eq("id", sesionId);
}

export async function finalizarSesion(
  sesionId: string,
  respuestas: Respuesta[],
  resultado: ResultadoSimulacro,
  tiempoUsado: number,
  faltas: number,
) {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase
    .from("simulacro_sesiones")
    .update({
      terminado_en: new Date().toISOString(),
      respuestas,
      correctas: resultado.correctas,
      puntaje: resultado.porcentaje,
      puntaje_componente: resultado.puntajeComponente,
      tiempo_usado: tiempoUsado,
      faltas,
    })
    .eq("id", sesionId);
}