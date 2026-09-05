"use client";

import { useCallback, useEffect, useState } from "react";
import { FileText, FolderDown } from "lucide-react";

import { getSupabase, supabaseConfigurado } from "@/lib/supabase";
import type { Examen } from "@/lib/tipos";

function NoConfigurado() {
  return (
    <div className="glass mx-auto max-w-xl p-8 text-center">
      <h2 className="font-display text-xl font-semibold">
        Recopilatorio en configuración
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/60">
        El administrador aún no ha publicado exámenes. Mientras tanto, usa los
        recursos oficiales de la UNAL que aparecen arriba.
      </p>
    </div>
  );
}

export function ExamenesExplorer() {
  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">(
    "cargando",
  );

  const cargar = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data, error } = await supabase
      .from("examenes")
      .select("*")
      .order("anio", { ascending: false })
      .order("creado_en", { ascending: false });
    if (error) {
      setEstado("error");
      return;
    }
    setExamenes(data ?? []);
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
          No se pudo cargar el recopilatorio
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
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  if (examenes.length === 0) {
    return (
      <div className="glass mx-auto max-w-xl p-8 text-center">
        <h2 className="font-display text-xl font-semibold">
          Aún no hay exámenes publicados
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          El administrador cargará material de práctica próximamente.
        </p>
      </div>
    );
  }

  const anos = [...new Set(examenes.map((e) => e.anio))].sort((a, b) => b - a);

  return (
    <div className="space-y-8">
      {anos.map((anio) => {
        const items = examenes.filter((e) => e.anio === anio);
        return (
          <section key={anio}>
            <h2 className="font-display text-xl font-bold">
              {anio}
              <span className="ml-2 font-mono text-sm font-normal text-foreground/40">
                {items.length} {items.length === 1 ? "examen" : "exámenes"}
              </span>
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((examen) => (
                <article
                  key={examen.id}
                  className="glass group flex h-full flex-col gap-3 p-5 transition-colors hover:border-emerald/40"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ocre to-terracotta">
                    <FileText className="h-5 w-5 text-forest-deep" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {examen.titulo}
                    </h3>
                    {examen.descripcion ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                        {examen.descripcion}
                      </p>
                    ) : null}
                  </div>
                  {examen.archivo_url ? (
                    <a
                      href={examen.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald"
                    >
                      <FolderDown className="h-4 w-4" />
                      Descargar / abrir
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}