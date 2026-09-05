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
  try {
    const r = await fetch("/api/simulacro/sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });
    if (!r.ok) return null;
    const { id } = await r.json();
    return typeof id === "string" ? id : null;
  } catch {
    return null;
  }
}

export async function actualizarProgreso(
  sesionId: string,
  respondidas: number,
  faltas: number,
) {
  try {
    await fetch("/api/simulacro/sesion", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sesionId, respondidas, faltas }),
    });
  } catch {
    // modo local: sin seguimiento
  }
}

export async function finalizarSesion(
  sesionId: string,
  respuestas: Respuesta[],
  resultado: ResultadoSimulacro,
  tiempoUsado: number,
  faltas: number,
) {
  try {
    await fetch("/api/simulacro/sesion", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: sesionId,
        terminado_en: new Date().toISOString(),
        respuestas,
        correctas: resultado.correctas,
        puntaje: resultado.porcentaje,
        puntaje_componente: resultado.puntajeComponente,
        tiempo_usado: tiempoUsado,
        faltas,
      }),
    });
  } catch {
    // modo local: sin seguimiento
  }
}