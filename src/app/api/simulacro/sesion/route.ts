import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const supabase = serviceClient();
  if (!supabase) {
    return NextResponse.json({ error: "no configurado" }, { status: 503 });
  }
  const { nombre } = await req.json();
  if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
    return NextResponse.json({ error: "nombre requerido" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("simulacro_sesiones")
    .insert({ nombre: nombre.trim().slice(0, 80) })
    .select("id")
    .single();
  if (error || !data) {
    return NextResponse.json({ error: "no se pudo crear" }, { status: 500 });
  }
  return NextResponse.json({ id: data.id });
}

export async function PATCH(req: NextRequest) {
  const supabase = serviceClient();
  if (!supabase) {
    return NextResponse.json({ error: "no configurado" }, { status: 503 });
  }
  const body = await req.json();
  const { id, ...fields } = body;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id requerido" }, { status: 400 });
  }
  const permitidos = [
    "respondidas",
    "faltas",
    "terminado_en",
    "respuestas",
    "correctas",
    "puntaje",
    "puntaje_componente",
    "tiempo_usado",
  ];
  const update: Record<string, unknown> = {
    ultima_actividad: new Date().toISOString(),
  };
  for (const k of permitidos) {
    if (k in fields) update[k] = fields[k];
  }
  const { error } = await supabase
    .from("simulacro_sesiones")
    .update(update)
    .eq("id", id);
  if (error) {
    return NextResponse.json({ error: "no se pudo actualizar" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}