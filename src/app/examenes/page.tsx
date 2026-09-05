import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MonitorPlay, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { ExamenesExplorer } from "@/components/examenes/ExamenesExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { notaBancoReservado, recursosOficiales } from "@/data/examenes";

export const metadata: Metadata = {
  title: "Exámenes Anteriores",
};

export default function ExamenesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <Badge>Recopilatorio de exámenes</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Exámenes Anteriores
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/70">
          Material de práctica organizado por año y los recursos oficiales de la
          UNAL para familiarizarte con la prueba de admisión.
        </p>
      </Reveal>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Recursos oficiales"
          title="Demostraciones interactivas de la UNAL"
          description="La Universidad publica demostraciones oficiales con preguntas de ejemplo. Son la mejor forma de conocer la prueba."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {recursosOficiales.map((recurso, index) => (
            <Reveal key={recurso.url} delay={index * 0.05}>
              <Link
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass flex h-full flex-col gap-3 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-lagoon">
                  <MonitorPlay className="h-5 w-5 text-forest-deep" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {recurso.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                    {recurso.descripcion}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald">
                  Abrir demostración
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 flex max-w-3xl items-start gap-2 text-sm text-foreground/50">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {notaBancoReservado}
          </p>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Recopilatorio"
          title="Exámenes y material de práctica"
          description="Documentos cargados por el equipo de la plataforma, organizados por año."
        />
        <div className="mt-8">
          <ExamenesExplorer />
        </div>
      </section>
    </div>
  );
}