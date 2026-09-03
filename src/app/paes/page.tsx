import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Handshake,
  Scale,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { CalculadoraCupos } from "@/components/paes/CalculadoraCupos";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { paes } from "@/data/paes";

export const metadata: Metadata = {
  title: "PAES y Admisión Especial",
};

function PasosInscripcion() {
  return (
    <ol className="space-y-3">
      {paes.comunidadesIndigenas.inscripcion.map((paso, index) => (
        <li key={paso} className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-ocre font-mono text-sm font-bold text-forest-deep">
            {index + 1}
          </span>
          <p className="text-sm leading-relaxed text-foreground/70">{paso}</p>
        </li>
      ))}
    </ol>
  );
}

function EjemplosCupos() {
  const ejemplos = [
    { cupos: 100, adicionales: 2, nota: "2% de 100 = 2 cupos adicionales" },
    { cupos: 50, adicionales: 1, nota: "2% de 50 = 1 cupo adicional" },
    { cupos: 25, adicionales: 1, nota: "2% de 25 = 0,5 → 1 cupo (redondeo ilustrativo)" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {ejemplos.map((e) => (
        <Reveal key={e.cupos} delay={0.05}>
          <div className="glass flex h-full flex-col gap-3 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
              Ejemplo {e.cupos === 100 ? "1" : e.cupos === 50 ? "2" : "3"}
            </p>
            <div className="flex items-end gap-2">
              <span className="font-mono text-4xl font-bold tabular-nums">
                {e.cupos}
              </span>
              <span className="pb-1 text-sm text-foreground/50">
                cupos regulares
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-mono text-4xl font-bold tabular-nums text-emerald">
                +{e.adicionales}
              </span>
              <span className="pb-1 text-sm text-foreground/50">
                para comunidades indígenas
              </span>
            </div>
            <p className="mt-auto text-xs text-foreground/50">{e.nota}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function PaesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <Badge>Admisión especial · PAES</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          PAES y Admisión Especial
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/70">
          El Programa de Admisión Especial (PAES) favorece el ingreso de grupos
          poblacionales históricamente excluidos. Aquí encontrarás cómo
          participar, con foco en las comunidades indígenas y los cupos por
          cabildos.
        </p>
      </Reveal>

      <section className="mt-14">
        <SectionHeading eyebrow="Introducción" title="¿Qué es el PAES?" />
        <div className="mt-6 max-w-3xl space-y-4">
          {paes.definicion.map((parrafo) => (
            <Reveal key={parrafo.slice(0, 40)}>
              <p className="leading-relaxed text-foreground/70">{parrafo}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Grupos priorizados"
          title="Los seis grupos del PAES"
          description="Cada grupo fue creado por una norma del Consejo Superior Universitario."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paes.grupos.map((grupo, index) => (
            <Reveal key={grupo.nombre} delay={index * 0.04}>
              <div className="glass flex h-full flex-col gap-2 p-5">
                <Users className="h-5 w-5 text-emerald" />
                <h3 className="font-display text-base font-semibold">
                  {grupo.nombre}
                </h3>
                <p className="text-xs leading-relaxed text-foreground/50">
                  {grupo.norma}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Comunidades indígenas"
          title={paes.comunidadesIndigenas.titulo}
          description={paes.comunidadesIndigenas.definicion}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Reveal>
              <div className="glass p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <Sparkles className="h-5 w-5 text-ocre" />
                  Beneficios
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {paes.comunidadesIndigenas.beneficios.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass border-l-4 border-l-ocre p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <Handshake className="h-5 w-5 text-ocre" />
                  Compromiso
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {paes.comunidadesIndigenas.compromiso}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass p-6">
                <h3 className="font-display text-lg font-semibold">
                  Requisitos
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {paes.comunidadesIndigenas.requisitos.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal>
              <div className="glass p-6">
                <h3 className="font-display text-lg font-semibold">
                  ¿Cómo inscribirte mediante el Programa?
                </h3>
                <div className="mt-5">
                  <PasosInscripcion />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass border border-emerald/30 bg-gradient-to-br from-emerald/10 to-transparent p-6">
                <h3 className="font-display text-lg font-semibold">
                  Si perteneces al Cabildo Muisca de Bosa
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  Este es el programa por el que los y las jóvenes miembros de
                  tu comunidad pueden participar en la admisión a la Universidad
                  Nacional. Verifica tu registro en las bases censales del
                  Ministerio del Interior o solicita tu certificado de
                  pertenencia a la autoridad tradicional antes de inscribirte.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Cupos por cabildos indígenas"
          title="¿Cómo funcionan los cupos del 2%?"
          description="La regla oficial y ejemplos del mecanismo para las comunidades indígenas."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Reveal>
              <div className="glass p-6">
                <h3 className="font-display text-lg font-semibold">
                  La regla oficial
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {paes.reglaCupos}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass p-6">
                <h3 className="font-display text-lg font-semibold">
                  Ejemplos del mecanismo
                </h3>
                <div className="mt-5">
                  <EjemplosCupos />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal>
              <div className="glass p-6">
                <h3 className="font-display text-lg font-semibold">
                  ¿Cómo se asignan en la práctica?
                </h3>
                <ol className="mt-5 space-y-4">
                  {[
                    "Todas las personas presentan la misma prueba de admisión y obtienen un Puntaje Total Estandarizado.",
                    "Los mejores puntajes llenan primero los cupos regulares de cada programa.",
                    "Los aspirantes indígenas que no alcanzaron el corte regular compiten entre sí por los cupos adicionales (2%) del programa que seleccionaron.",
                    "El mayor puntaje entre los aspirantes indígenas obtiene el primer cupo adicional, y así sucesivamente hasta agotarlos.",
                    "Si no eres admitido(a), puedes volver a participar por el Programa en la próxima convocatoria.",
                  ].map((paso, index) => (
                    <li key={paso} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald/15 font-mono text-sm font-bold text-emerald">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        {paso}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal>
              <CalculadoraCupos />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Normativa y fuentes" title="De dónde sale esta información" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass p-6">
              <h3 className="font-display text-lg font-semibold">Normativa</h3>
              <ul className="mt-4 space-y-2">
                {paes.comunidadesIndigenas.normativa.map((n) => (
                  <li key={n.url}>
                    <Link
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-sm text-foreground/70 transition-colors hover:text-emerald"
                    >
                      <Scale className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      <span className="underline-offset-4 group-hover:underline">
                        {n.nombre}
                      </span>
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/30" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass p-6">
              <h3 className="font-display text-lg font-semibold">
                Páginas oficiales
              </h3>
              <ul className="mt-4 space-y-2">
                {paes.fuentes.map((f) => (
                  <li key={f.url}>
                    <Link
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-sm text-foreground/70 transition-colors hover:text-emerald"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      <span className="underline-offset-4 group-hover:underline">
                        {f.titulo}
                      </span>
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/30" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-foreground/40">
                Dirección Nacional de Admisiones y Dirección Nacional de
                Programas de Pregrado · Universidad Nacional de Colombia ·
                Verificado el 02/09/2026
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}