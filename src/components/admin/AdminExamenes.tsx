"use client";

import { useCallback, useEffect, useState } from "react";
import { FileText, Pencil, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase";
import type { Examen } from "@/lib/tipos";

type FormExamen = {
  id?: string;
  anio: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  archivo_url: string;
};

const FORM_VACIO: FormExamen = {
  anio: new Date().getFullYear(),
  titulo: "",
  descripcion: "",
  tipo: "documento",
  archivo_url: "",
};

export function AdminExamenes() {
  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [form, setForm] = useState<FormExamen | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = await supabase
      .from("examenes")
      .select("*")
      .order("anio", { ascending: false });
    setExamenes(data ?? []);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  const guardar = async () => {
    if (!form || !form.titulo.trim()) return;
    const supabase = getSupabase();
    if (!supabase) return;
    setSubiendo(true);
    setMensaje(null);

    let archivoUrl = form.archivo_url;
    if (archivo) {
      const ruta = `examenes/${Date.now()}-${archivo.name}`;
      const { error: upErr } = await supabase.storage
        .from("biblioteca")
        .upload(ruta, archivo, { upsert: true });
      if (upErr) {
        setMensaje(`Error al subir archivo: ${upErr.message}`);
        setSubiendo(false);
        return;
      }
      archivoUrl = supabase.storage.from("biblioteca").getPublicUrl(ruta).data
        .publicUrl;
    }

    const payload = {
      anio: form.anio,
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim() || null,
      tipo: form.tipo,
      archivo_url: archivoUrl || null,
    };

    const { error } = form.id
      ? await supabase.from("examenes").update(payload).eq("id", form.id)
      : await supabase.from("examenes").insert(payload);

    setMensaje(error ? `Error: ${error.message}` : "Examen guardado.");
    setForm(null);
    setArchivo(null);
    setSubiendo(false);
    void cargar();
  };

  const eliminar = async (id: string) => {
    if (!window.confirm("¿Eliminar este examen?")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase.from("examenes").delete().eq("id", id);
    setMensaje(error ? `Error: ${error.message}` : "Examen eliminado.");
    void cargar();
  };

  const inputClase =
    "mt-1.5 w-full rounded-xl border border-forest/10 bg-background px-4 py-2.5 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30 dark:border-white/10";

  return (
    <section className="glass p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold">
            Exámenes anteriores
          </h3>
          <p className="mt-0.5 text-xs text-foreground/50">
            Aparecen en la sección pública /examenes.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => setForm({ ...FORM_VACIO })}
        >
          Nuevo examen
        </Button>
      </div>

      {mensaje ? (
        <p className="mt-4 rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-2.5 text-sm text-emerald">
          {mensaje}
        </p>
      ) : null}

      <ul className="mt-4 divide-y divide-forest/5 dark:divide-white/5">
        {examenes.map((examen) => (
          <li key={examen.id} className="flex items-center gap-3 py-3">
            <FileText className="h-4 w-4 shrink-0 text-ocre" />
            <span className="w-12 shrink-0 font-mono text-sm text-foreground/50">
              {examen.anio}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{examen.titulo}</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setForm({
                  id: examen.id,
                  anio: examen.anio,
                  titulo: examen.titulo,
                  descripcion: examen.descripcion ?? "",
                  tipo: examen.tipo,
                  archivo_url: examen.archivo_url ?? "",
                })
              }
              aria-label="Editar examen"
              className="rounded-full p-2 text-foreground/50 hover:bg-white/5 hover:text-emerald"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => eliminar(examen.id)}
              aria-label="Eliminar examen"
              className="rounded-full p-2 text-foreground/50 hover:bg-white/5 hover:text-coral"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
        {examenes.length === 0 ? (
          <li className="py-6 text-center text-sm text-foreground/50">
            Sin exámenes publicados todavía.
          </li>
        ) : null}
      </ul>

      {form ? (
        <div className="mt-4 border-t border-forest/10 pt-5 dark:border-white/10">
          <h4 className="font-display text-base font-semibold">
            {form.id ? "Editar examen" : "Nuevo examen"}
          </h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                Año
              </label>
              <input
                type="number"
                value={form.anio}
                onChange={(e) =>
                  setForm({ ...form, anio: Number(e.target.value) || 2026 })
                }
                className={inputClase}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                Título
              </label>
              <input
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className={inputClase}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                Descripción
              </label>
              <textarea
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
                rows={2}
                className={inputClase}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                Archivo (bucket «biblioteca», ruta examenes/)
              </label>
              <input
                type="file"
                onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
                className={inputClase}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<Save className="h-4 w-4" />}
              onClick={guardar}
              disabled={subiendo}
            >
              {subiendo ? "Guardando…" : "Guardar"}
            </Button>
            <Button variant="ghost" size="md" onClick={() => setForm(null)}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}