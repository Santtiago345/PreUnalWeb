import type { Metadata } from "next";

import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SimulacroApp } from "@/components/simulacro/SimulacroApp";

export const metadata: Metadata = {
  title: "Simulacros",
};

export default function SimulacrosPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <Badge>Simulacros</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Simulacros
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/70">
          Pruebas cronometradas tipo examen de admisión con calificación por el
          mismo modelo de la UNAL. Empezamos con el componente de Matemáticas.
        </p>
      </Reveal>

      <section className="mt-12">
        <SimulacroApp />
      </section>
    </div>
  );
}