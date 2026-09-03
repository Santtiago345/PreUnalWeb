import type { Metadata } from "next";

import { Badge } from "@/components/ui/Badge";
import { BibliotecaExplorer } from "@/components/biblioteca/BibliotecaExplorer";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Biblioteca",
};

export default function BibliotecaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <Badge>Biblioteca de preparación</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Biblioteca de Preparación
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/70">
          Material de estudio organizado por categorías, publicado por el equipo
          de la plataforma. Encuentra guías, documentos y recursos para cada
          componente de la prueba.
        </p>
      </Reveal>

      <section className="mt-12">
        <BibliotecaExplorer />
      </section>
    </div>
  );
}