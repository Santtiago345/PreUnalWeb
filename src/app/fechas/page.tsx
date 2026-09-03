import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, ExternalLink, Scale } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Countdown } from "@/components/ui/Countdown";
import { ExportarCalendario } from "@/components/fechas/ExportarCalendario";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineFechas } from "@/components/fechas/TimelineFechas";
import { convocatoria, eventosFechas } from "@/data/fechas";

export const metadata: Metadata = {
  title: "Fechas Importantes",
};

const PRUEBA = eventosFechas.find((e) => e.id === "prueba-admision");

export default function FechasPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <Badge>{convocatoria.nombre}</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Fechas Importantes
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/70">
          Calendario oficial de la {convocatoria.periodo} con cuenta regresiva
          en vivo. Agrégalo a tu calendario para no perderte ningún paso.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-10">
          <ExportarCalendario eventos={eventosFechas} />
        </div>
      </Reveal>

      {PRUEBA ? (
        <Reveal>
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-emerald/20 bg-gradient-to-br from-forest-800 via-forest to-forest-deep p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-muisca opacity-60"
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ocre">
                  <CalendarClock className="h-4 w-4" />
                  Próximo hito clave
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-ivory sm:text-3xl">
                  {PRUEBA.nombre}
                </h2>
                <p className="mt-1 text-sm text-ivory/70">
                  Domingo, 20 de septiembre de 2026
                </p>
              </div>
              <Countdown
                target={new Date(`${PRUEBA.fechaInicio}T00:00:00`).getTime()}
                className="w-full max-w-md"
              />
            </div>
          </div>
        </Reveal>
      ) : null}

      <section className="mt-16">
        <SectionHeading
          eyebrow="Calendario del semestre"
          title="Los 11 pasos del proceso"
          description="Cada hito incluye su fecha oficial, descripción y acceso a la fuente. El siguiente paso muestra su cuenta regresiva."
        />
        <div className="mt-8">
          <TimelineFechas eventos={eventosFechas} />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Fuente" title="Información oficial" />
        <Reveal>
          <div className="mt-6 max-w-2xl">
            <Link
              href={convocatoria.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex items-center justify-between gap-4 p-5 transition-colors hover:border-emerald/40"
            >
              <span className="flex items-start gap-3">
                <Scale className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                <span className="text-sm leading-relaxed">
                  Guía paso a paso — {convocatoria.nombre} · Dirección Nacional
                  de Admisiones
                </span>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-emerald" />
            </Link>
            <p className="mt-4 text-xs text-foreground/40">
              Dirección Nacional de Admisiones · Universidad Nacional de
              Colombia · Verificado el 02/09/2026. Incluye la ampliación de
              fechas de pago e inscripción hasta el 24 de agosto de 2026.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}