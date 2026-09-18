"use client";

import { BookOpen } from "lucide-react";

import { M } from "@/components/simulacro/Math";
import type { LecturaSimulacro } from "@/data/simulacro";

/**
 * Texto compartido de comprensión lectora. Colapsable nativo (<details>)
 * para no ocupar toda la pantalla en móvil; abierto por defecto solo en la
 * primera pregunta que lo usa.
 */
export function LecturaBox({
  lectura,
  abierta = false,
}: {
  lectura: LecturaSimulacro;
  abierta?: boolean;
}) {
  return (
    <details
      open={abierta}
      className="group mt-3 overflow-hidden rounded-xl border border-lagoon/25 bg-lagoon/5"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-lagoon [&::-webkit-details-marker]:hidden">
        <BookOpen className="h-4 w-4 shrink-0" />
        <span className="flex-1">
          Texto: {lectura.titulo}
          <span className="ml-2 font-normal text-foreground/50">
            (toca para {abierta ? "ocultar" : "leer"})
          </span>
        </span>
      </summary>
      <div className="space-y-3 border-t border-lagoon/15 px-4 py-4">
        {lectura.parrafos.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-foreground/85">
            <M>{p}</M>
          </p>
        ))}
        {lectura.fuente ? (
          <p className="text-xs italic text-foreground/50">{lectura.fuente}</p>
        ) : null}
      </div>
    </details>
  );
}
