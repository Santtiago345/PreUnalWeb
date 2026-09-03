import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenCheck,
  ExternalLink,
  Info,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { ComponenteCard } from "@/components/examen/ComponenteCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { examen, TIEMPO_TOTAL_NOTA } from "@/data/examen";

export const metadata: Metadata = {
  title: "Información del Examen",
};

function StatBig({
  valor,
  etiqueta,
  destacado = false,
}: {
  valor: string;
  etiqueta: string;
  destacado?: boolean;
}) {
  return (
    <div
      className={
        destacado
          ? "glass-strong flex flex-col items-center gap-1 p-6 text-center"
          : "glass flex flex-col items-center gap-1 p-6 text-center"
      }
    >
      <span className="font-mono text-3xl font-bold tabular-nums sm:text-4xl">
        {valor}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">
        {etiqueta}
      </span>
    </div>
  );
}

export default function ExamenPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <Badge>Pregrado · Proceso de admisión</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Prueba de Admisión
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/70">
          {examen.lema}
        </p>
      </Reveal>

      <section
        aria-label="Resumen del examen"
        className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        <StatBig valor="5" etiqueta="Componentes" />
        <StatBig valor="120" etiqueta="Preguntas" />
        <StatBig valor="3:30" etiqueta="Tiempo máximo (h)" destacado />
        <StatBig valor="1:45" etiqueta="Promedio por pregunta" />
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Descripción"
          title="¿Qué evalúa la prueba?"
        />
        <Reveal delay={0.05}>
          <div className="mt-6 max-w-3xl space-y-4">
            {examen.descripcion.map((parrafo) => (
              <p
                key={parrafo.slice(0, 40)}
                className="leading-relaxed text-foreground/70"
              >
                {parrafo}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Componentes de la prueba"
          title="Componentes, áreas y cómo se evalúan"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examen.componentes.map((componente, index) => (
            <ComponenteCard
              key={componente.id}
              componente={componente}
              index={index}
            />
          ))}
        </div>
        <Reveal>
          <p className="mt-6 flex max-w-3xl items-start gap-2 text-sm text-foreground/50">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {TIEMPO_TOTAL_NOTA}
          </p>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Lectura y calificación"
          title="¿Cómo se califica la prueba?"
        />
        <Reveal delay={0.05}>
          <div className="mt-6 max-w-3xl space-y-4">
            {examen.calificacion.map((parrafo) => (
              <p
                key={parrafo.slice(0, 40)}
                className="leading-relaxed text-foreground/70"
              >
                {parrafo}
              </p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="glass p-6">
              <p className="font-mono text-2xl font-bold tabular-nums">
                10 ± 1
              </p>
              <p className="mt-1 text-sm text-foreground/60">
                Escala por componente: habilidad estandarizada con media en 10
                y desviación en 1.
              </p>
            </div>
            <div className="glass p-6">
              <p className="font-mono text-2xl font-bold tabular-nums">
                500 ± 100
              </p>
              <p className="mt-1 text-sm text-foreground/60">
                Puntaje total de admisión: habilidad total estandarizada con
                media en 500 y desviación en 100.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Clasificación al ingresar"
          title="Clasificación en matemáticas y lecto-escritura"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {examen.clasificacion.map((item, index) => (
            <Reveal key={item.titulo} delay={index * 0.05}>
              <div className="glass flex h-full flex-col gap-3 p-6">
                <BookOpenCheck className="h-5 w-5 text-emerald" />
                <h3 className="font-display text-base font-semibold">
                  {item.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/60">
                  {item.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Normativa" title="Marco legal del proceso" />
        <Reveal delay={0.05}>
          <div className="mt-6 max-w-3xl">
            <Link
              href={examen.normativa.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex items-center justify-between gap-4 p-5 transition-colors hover:border-emerald/40"
            >
              <span className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                <span className="text-sm leading-relaxed">
                  {examen.normativa.titulo}
                </span>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-emerald" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Fuentes"
          title="Información tomada de las páginas oficiales"
        />
        <ul className="mt-6 max-w-3xl space-y-3">
          {examen.fuentes.map((fuente, index) => (
            <Reveal key={fuente.url} delay={index * 0.04}>
              <li>
                <Link
                  href={fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-emerald"
                >
                  <Scale className="h-4 w-4 shrink-0 text-emerald" />
                  <span className="underline-offset-4 group-hover:underline">
                    {fuente.titulo}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-foreground/30 transition-colors group-hover:text-emerald" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mt-6 max-w-3xl text-xs text-foreground/40">
            Dirección Nacional de Admisiones · Universidad Nacional de Colombia
            · Verificado el 02/09/2026 · admisiones.unal.edu.co
          </p>
        </Reveal>
      </section>
    </div>
  );
}