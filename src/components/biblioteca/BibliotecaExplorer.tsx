"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Link2,
  Video,
} from "lucide-react";

import { getSupabase, supabaseConfigurado } from "@/lib/supabase";
import type { Categoria, Contenido } from "@/lib/tipos";
import { cn } from "@/lib/utils";

const TONOS: Record<string, string> = {
  emerald: "bg-emerald/15 text-emerald border-emerald/30",
  ocre: "bg-ocre/15 text-ocre border-ocre/30",
  lagoon: "bg-lagoon/15 text-lagoon border-lagoon/30",
  terracotta: "bg-terracotta/15 text-terracotta border-terracotta/30",
  sage: "bg-sage/15 text-sage border-sage/30",
  coral: "bg-coral/15 text-coral border-coral/30",
};

function TipoIcono({ tipo }: { tipo: string }) {
  if (tipo === "video") return <Video className="h-4 w-4" />;
  if (tipo === "enlace") return <Link2 className="h-4 w-4" />;
  if (tipo === "libro") return <BookOpen className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function NoConfigurado() {
  return (
    <div className="glass mx-auto max-w-2xl p-6 text-center">
      <h2 className="font-display text-xl font-semibold">
        Biblioteca en configuración
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
        Aún no se han cargado las credenciales de Supabase. Para activar la
        biblioteca de contenido:
      </p>
      <ol className="mx-auto mt-4 max-w-md space-y-2 text-left text-sm text-foreground/70">
        <li>1. Crea un proyecto en supabase.com (plan gratuito).</li>
        <li>2. Ejecuta el SQL de <code className="font-mono text-emerald">supabase/migrations/0001_biblioteca.sql</code> en el editor SQL.</li>
        <li>3. Crea el bucket público «biblioteca» en Storage.</li>
        <li>4. Copia <code className="font-mono text-emerald">.env.local.example</code> a <code className="font-mono text-emerald">.env.local</code> y completa la URL y la anon key.</li>
        <li>5. En Vercel, añade las mismas variables de entorno.</li>
      </ol>
      <Link
        href="/admin"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald underline-offset-4 hover:underline"
      >
        Ir al panel de administración
        <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function BibliotecaExplorer() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [contenidos, setContenidos] = useState<Contenido[]>([]);
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">(
    "cargando",
  );

  const cargar = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const [{ data: cats, error: errCats }, { data: cons, error: errCons }] =
      await Promise.all([
        supabase.from("categorias").select("*").order("orden"),
        supabase.from("contenidos").select("*").order("creado_en"),
      ]);
    if (errCats || errCons) {
      setEstado("error");
      return;
    }
    setCategorias(cats ?? []);
    setContenidos(cons ?? []);
    setEstado("listo");
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
  }, [cargar]);

  if (!supabaseConfigurado) {
    return <NoConfigurado />;
  }

  if (estado === "error") {
    return (
      <div className="glass mx-auto max-w-xl p-8 text-center">
        <h2 className="font-display text-xl font-semibold">
          No se pudo cargar la biblioteca
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Revisa la configuración de Supabase o inténtalo de nuevo.
        </p>
      </div>
    );
  }

  if (estado === "cargando") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  if (categorias.length === 0 || contenidos.length === 0) {
    return (
      <div className="glass mx-auto max-w-xl p-8 text-center">
        <h2 className="font-display text-xl font-semibold">
          Aún no hay contenido
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          El administrador publicará material de estudio próximamente. Las
          categorías ya están preparadas para organizar el contenido.
        </p>
      </div>
    );
  }

  const categoriasOrdenadas = [...categorias].sort((a, b) => a.orden - b.orden);
  const sinCategoria = contenidos.filter((c) => !c.categoria_id);

  return (
    <div className="space-y-10">
      {categoriasOrdenadas.map((categoria) => {
        const items = contenidos.filter((c) => c.categoria_id === categoria.id);
        if (items.length === 0) return null;
        const tono = TONOS[categoria.color] ?? TONOS.emerald;
        return (
          <section key={categoria.id}>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3.5 py-1 text-sm font-semibold",
                  tono,
                )}
              >
                {categoria.nombre}
              </span>
              <span className="font-mono text-sm text-foreground/40">
                {items.length}
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((contenido) => (
                <article
                  key={contenido.id}
                  className="glass group flex h-full flex-col gap-3 p-5 transition-colors hover:border-emerald/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-sage">
                      <TipoIcono tipo={contenido.tipo} />
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground/50">
                      {contenido.tipo}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {contenido.titulo}
                    </h3>
                    {contenido.descripcion ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                        {contenido.descripcion}
                      </p>
                    ) : null}
                  </div>
                  {contenido.archivo_url ? (
                    <a
                      href={contenido.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald"
                    >
                      Abrir contenido
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {sinCategoria.length > 0 ? (
        <section>
          <div className="inline-flex items-center rounded-full border border-white/10 px-3.5 py-1 text-sm font-semibold text-foreground/60">
            Otros
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sinCategoria.map((contenido) => (
              <article
                key={contenido.id}
                className="glass group flex h-full flex-col gap-3 p-5 transition-colors hover:border-emerald/40"
              >
                <h3 className="font-display text-base font-semibold">
                  {contenido.titulo}
                </h3>
                {contenido.descripcion ? (
                  <p className="text-sm text-foreground/60">
                    {contenido.descripcion}
                  </p>
                ) : null}
                {contenido.archivo_url ? (
                  <a
                    href={contenido.archivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald"
                  >
                    Abrir contenido
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}