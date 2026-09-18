"use client";

import { useCallback, useEffect, useState } from "react";
import { Expand, X } from "lucide-react";

/**
 * Imagen de un ejercicio (p. ej. Análisis de la imagen). Carga diferida y
 * toque para ampliar: en móvil los recortes del cuadernillo se aprecian
 * mejor a pantalla completa.
 */
export function ImagenPregunta({ src, alt }: { src: string; alt: string }) {
  const [ampliada, setAmpliada] = useState(false);

  const cerrar = useCallback(() => setAmpliada(false), []);

  useEffect(() => {
    if (!ampliada) return;
    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    document.addEventListener("keydown", alTeclado);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alTeclado);
      document.body.style.overflow = "";
    };
  }, [ampliada, cerrar]);

  return (
    <>
      <figure className="mt-3">
        <button
          type="button"
          onClick={() => setAmpliada(true)}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-forest/10 dark:border-white/10"
          aria-label="Ampliar imagen del ejercicio"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-auto w-full bg-white"
          />
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-forest-deep/80 px-2.5 py-1 text-[11px] font-medium text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="h-3.5 w-3.5" />
            Ampliar
          </span>
        </button>
        <figcaption className="mt-1.5 text-center text-xs text-foreground/50">
          Toca la imagen para ampliarla
        </figcaption>
      </figure>

      {ampliada ? (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black/85 p-4 backdrop-blur-sm"
          onClick={cerrar}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada del ejercicio"
        >
          <button
            type="button"
            onClick={cerrar}
            className="fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="Cerrar imagen ampliada"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mx-auto max-w-4xl py-10" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-auto w-full rounded-xl bg-white"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
