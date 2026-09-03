import {
  BookOpenText,
  Calculator,
  FlaskConical,
  Landmark,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Componente, TonoComponente } from "@/data/examen";

const iconos: Record<string, LucideIcon> = {
  "analisis-textual": BookOpenText,
  matematicas: Calculator,
  "ciencias-naturales": FlaskConical,
  "ciencias-sociales": Landmark,
  "analisis-de-la-imagen": ImageIcon,
};

const tones: Record<
  TonoComponente,
  { tile: string; chip: string; text: string; border: string }
> = {
  ocre: {
    tile: "from-ocre to-terracotta",
    chip: "border-ocre/30 bg-ocre/10 text-ocre",
    text: "text-ocre",
    border: "hover:border-ocre/40",
  },
  emerald: {
    tile: "from-emerald to-sage",
    chip: "border-emerald/30 bg-emerald/10 text-emerald",
    text: "text-emerald",
    border: "hover:border-emerald/40",
  },
  lagoon: {
    tile: "from-lagoon to-sage",
    chip: "border-lagoon/30 bg-lagoon/10 text-lagoon",
    text: "text-lagoon",
    border: "hover:border-lagoon/40",
  },
  terracotta: {
    tile: "from-terracotta to-coral",
    chip: "border-terracotta/30 bg-terracotta/10 text-terracotta",
    text: "text-terracotta",
    border: "hover:border-terracotta/40",
  },
  sage: {
    tile: "from-sage to-emerald",
    chip: "border-sage/30 bg-sage/10 text-sage",
    text: "text-sage",
    border: "hover:border-sage/40",
  },
};

export function ComponenteCard({
  componente,
  index,
}: {
  componente: Componente;
  index: number;
}) {
  const Icono = iconos[componente.id];
  const tono = tones[componente.tono];

  return (
    <Reveal delay={index * 0.05} className="h-full">
      <article
        className={cn(
          "glass flex h-full flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1",
          tono.border,
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
              tono.tile,
            )}
          >
            <Icono className="h-5 w-5 text-forest-deep" />
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1 font-mono text-sm font-semibold tabular-nums",
              tono.chip,
            )}
          >
            {componente.preguntas} preguntas
          </span>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">
            {componente.nombre}
          </h3>
          {componente.areas ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {componente.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-forest/10 px-2.5 py-0.5 text-xs font-medium text-foreground/60 dark:border-white/10"
                >
                  {area}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {componente.descripcion ? (
          <p className="text-sm leading-relaxed text-foreground/60">
            {componente.descripcion}
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-foreground/40">
            Evalúa la comprensión de los conceptos básicos de sus áreas en
            situaciones y contextos de la prueba.
          </p>
        )}
      </article>
    </Reveal>
  );
}