"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FileText,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase";
import type { Categoria, Contenido } from "@/lib/tipos";

const TIPOS = ["documento", "libro", "video", "enlace"];

type FormContenido = {
  id?: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  categoria_id: string;
  archivo_url: string;
};

const FORM_VACIO: FormContenido = {
  titulo: "",
  descripcion: "",
  tipo: "documento",
  categoria_id: "",
  archivo_url: "",
};

export function AdminGestor({ onLogout }: { onLogout: () => void }) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [contenidos, setContenidos] = useState<Contenido[]>([]);
  const [form, setForm] = useState<FormContenido | null>(null);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const [{ data: cats }, { data: cons }] = await Promise.all([
      supabase.from("categorias").select("*").order("orden"),
      supabase.from("contenidos").select("*").order("creado_en"),
    ]);
    setCategorias(cats ?? []);
    setContenidos(cons ?? []);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  const agregarCategoria = async () => {
    const nombre = nuevaCategoria.trim();
    if (!nombre) return;
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase
      .from("categorias")
      .insert({ nombre, orden: categorias.length + 1 });
    if (error) {
      setMensaje(`Error: ${error.message}`);
      return;
    }
    setNuevaCategoria("");
    setMensaje("Categoría creada.");
    void cargar();
  };

  const eliminarCategoria = async (id: string) => {
    if (!window.confirm("¿Eliminar esta categoría y sus contenidos?")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase.from("categorias").delete().eq("id", id);
    setMensaje(error ? `Error: ${error.message}` : "Categoría eliminada.");
    void cargar();
  };

  const guardarContenido = async () => {
    if (!form || !form.titulo.trim()) return;
    const supabase = getSupabase();
    if (!supabase) return;
    setSubiendo(true);
    setMensaje(null);

    let archivoUrl = form.archivo_url;
    if (archivo) {
      const ruta = `contenidos/${Date.now()}-${archivo.name}`;
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
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim() || null,
      tipo: form.tipo,
      categoria_id: form.categoria_id || null,
      archivo_url: archivoUrl || null,
    };

    const { error } = form.id
      ? await supabase.from("contenidos").update(payload).eq("id", form.id)
      : await supabase.from("contenidos").insert(payload);

    setMensaje(error ? `Error: ${error.message}` : "Contenido guardado.");
    setForm(null);
    setArchivo(null);
    setSubiendo(false);
    void cargar();
  };

  const eliminarContenido = async (id: string) => {
    if (!window.confirm("¿Eliminar este contenido?")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase.from("contenidos").delete().eq("id", id);
    setMensaje(error ? `Error: ${error.message}` : "Contenido eliminado.");
    void cargar();
  };

  const salir = async () => {
    const supabase = getSupabase();
    await supabase?.auth.signOut();
    onLogout();
  };

  const inputClase =
    "mt-1.5 w-full rounded-xl border border-forest/10 bg-background px-4 py-2.5 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30 dark:border-white/10";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Panel de administración
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            Gestiona la biblioteca de contenido de preparación.
          </p>
        </div>
        <Button variant="secondary" size="sm" icon={<LogOut className="h-4 w-4" />} onClick={salir}>
          Cerrar sesión
        </Button>
      </div>

      {mensaje ? (
        <p className="rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-2.5 text-sm text-emerald">
          {mensaje}
        </p>
      ) : null}

      <section className="glass p-5">
        <h3 className="font-display text-base font-semibold">Categorías</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <span
              key={categoria.id}
              className="inline-flex items-center gap-2 rounded-full border border-forest/10 px-3 py-1.5 text-sm dark:border-white/10"
            >
              {categoria.nombre}
              <button
                type="button"
                onClick={() => eliminarCategoria(categoria.id)}
                aria-label={`Eliminar ${categoria.nombre}`}
                className="text-foreground/40 hover:text-coral"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Nueva categoría"
            className="min-w-0 flex-1 rounded-xl border border-forest/10 bg-background px-4 py-2.5 text-sm focus:border-emerald focus:outline-none dark:border-white/10"
          />
          <Button
            variant="secondary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            onClick={agregarCategoria}
          >
            Agregar
          </Button>
        </div>
      </section>

      <section className="glass p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-base font-semibold">Contenidos</h3>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setForm({ ...FORM_VACIO, categoria_id: categorias[0]?.id ?? "" })}
          >
            Nuevo contenido
          </Button>
        </div>

        <ul className="mt-4 divide-y divide-forest/5 dark:divide-white/5">
          {contenidos.map((contenido) => (
            <li key={contenido.id} className="flex items-center gap-3 py-3">
              <FileText className="h-4 w-4 shrink-0 text-emerald" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{contenido.titulo}</p>
                <p className="text-xs text-foreground/50">
                  {contenido.tipo}
                  {contenido.archivo_url ? " · con archivo" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    id: contenido.id,
                    titulo: contenido.titulo,
                    descripcion: contenido.descripcion ?? "",
                    tipo: contenido.tipo,
                    categoria_id: contenido.categoria_id ?? "",
                    archivo_url: contenido.archivo_url ?? "",
                  })
                }
                aria-label="Editar contenido"
                className="rounded-full p-2 text-foreground/50 hover:bg-white/5 hover:text-emerald"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => eliminarContenido(contenido.id)}
                aria-label="Eliminar contenido"
                className="rounded-full p-2 text-foreground/50 hover:bg-white/5 hover:text-coral"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
          {contenidos.length === 0 ? (
            <li className="py-6 text-center text-sm text-foreground/50">
              Sin contenidos todavía.
            </li>
          ) : null}
        </ul>
      </section>

      {form ? (
        <section className="glass border border-emerald/30 p-5">
          <h3 className="font-display text-base font-semibold">
            {form.id ? "Editar contenido" : "Nuevo contenido"}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                Tipo
              </label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className={inputClase}
              >
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
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
                Categoría
              </label>
              <select
                value={form.categoria_id}
                onChange={(e) =>
                  setForm({ ...form, categoria_id: e.target.value })
                }
                className={inputClase}
              >
                <option value="">Sin categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                Archivo (se sube al bucket «biblioteca»)
              </label>
              <input
                type="file"
                onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
                className={inputClase}
              />
            </div>
            {form.archivo_url ? (
              <p className="text-xs text-foreground/50 sm:col-span-2">
                Archivo actual:{" "}
                <span className="break-all font-mono">{form.archivo_url}</span>
              </p>
            ) : null}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<Save className="h-4 w-4" />}
              onClick={guardarContenido}
              disabled={subiendo}
            >
              {subiendo ? "Guardando…" : "Guardar"}
            </Button>
            <Button variant="ghost" size="md" onClick={() => setForm(null)}>
              Cancelar
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  );
}