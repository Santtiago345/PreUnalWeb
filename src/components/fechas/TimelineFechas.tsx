"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarPlus, ExternalLink } from "lucide-react";

import { Countdown } from "@/components/ui/Countdown";
import {
  compararIso,
  fechaActualInicio,
  formatoRango,
  googleCalendarUrl,
} from "@/lib/calendar";
import type { EventoFechas } from "@/data/fechas";
import { cn } from "@/lib/utils";

type Estado = "completado" | "en-curso" | "proximo";

function obtenerEstado(evento: EventoFechas, hoy: string): Estado {
  const inicio = evento.fechaInicio;
  const fin = evento.fechaFin ?? inicio;
  if (compararIso(hoy, fin) > 0) return "completado";
  if (compararIso(hoy, inicio) >= 0) return "en-curso";
  return "proximo";
}

export function TimelineFechas({ eventos }: { eventos: EventoFechas[] }) {
  const [hoy] = useState(() => fechaActualInicio());

  const ordenados = useMemo(
    () => [...eventos].sort((a, b) => compararIso(a.fechaInicio, b.fechaInicio)),
    [eventos],
  );

  const proximo = ordenados.find(
    (e) => obtenerEstado(e, hoy) === "proximo",
  );
  const proximoId = proximo?.id;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-emerald via-forest/20 to-transparent"
      />
      <ul className="space-y-5">
        {ordenados.map((evento, index) => {
          const estado = obtenerEstado(evento, hoy);
          const esProximo = evento.id === proximoId;
          const target =
            estado === "en-curso"
              ? new Date(`${evento.fechaFin ?? evento.fechaInicio}T23:59:59`).getTime()
              : new Date(`${evento.fechaInicio}T00:00:00`).getTime();

          return (
            <li key={evento.id} className="relative pl-14">
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full border-2",
                  esProximo
                    ? "border-emerald bg-emerald/15"
                    : estado === "completado"
                      ? "border-forest/15 bg-forest/5 text-foreground/40 dark:border-white/10"
                      : "border-ocre/40 bg-ocre/10 text-ocre",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    esProximo
                      ? "bg-emerald"
                      : estado === "completado"
                        ? "bg-forest/30 dark:bg-white/30"
                        : "bg-ocre",
                  )}
                />
              </span>

              <article
                className={cn(
                  "glass p-5 transition-colors",
                  esProximo && "border-emerald/40",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                      esProximo
                        ? "border-emerald/30 bg-emerald/10 text-emerald"
                        : estado === "completado"
                          ? "border-forest/15 text-foreground/40 dark:border-white/10"
                          : "border-ocre/30 bg-ocre/10 text-ocre",
                    )}
                  >
                    {estado === "completado"
                      ? "Completado"
                      : esProximo
                        ? "Próximo"
                        : estado === "en-curso"
                          ? "En curso"
                          : "Pendiente"}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-foreground/50">
                    {formatoRango(evento.fechaInicio, evento.fechaFin)}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-lg font-semibold">
                  {index + 1}. {evento.nombre}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                  {evento.descripcion}
                </p>

                {esProximo ? (
                  <div className="mt-4">
                    <Countdown target={target} />
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <Link
                    href={googleCalendarUrl(evento)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-emerald underline-offset-4 hover:underline"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Agregar a Google Calendar
                  </Link>
                  <Link
                    href={evento.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Fuente oficial
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}