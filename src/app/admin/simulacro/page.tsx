import type { Metadata } from "next";

import { SimulacroAdmin } from "@/components/admin/SimulacroAdmin";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Panel del Simulacro",
  robots: { index: false, follow: false },
};

export default function AdminSimulacroPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
          Zona restringida
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Panel del Simulacro
        </h1>
        <p className="mt-3 text-foreground/60">
          Habilita el simulacro, sigue a los estudiantes en vivo y revisa las
          estadísticas de rendimiento.
        </p>
      </Reveal>

      <section className="mt-10">
        <SimulacroAdmin />
      </section>
    </div>
  );
}