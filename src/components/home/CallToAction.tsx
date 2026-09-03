import Link from "next/link";
import { Play } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-emerald/20 bg-gradient-to-br from-forest-800 via-forest to-forest-deep px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-muisca opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(46_194_126/0.2),transparent_70%)]"
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl">
              ¿Listo para poner a prueba tus conocimientos?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ivory/70">
              Empieza con el simulacro de matemáticas, mide tu tiempo y revisa
              tus resultados con explicaciones detalladas.
            </p>
            <Link
              href="/simulacros"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "mt-8",
              })}
            >
              <Play className="h-4 w-4" />
              Empezar simulacro
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}