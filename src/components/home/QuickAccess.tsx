import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quickAccess } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function QuickAccess() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Explora la plataforma"
        title="Todo lo que necesitas para prepararte"
        description="Ocho módulos pensados para acompañarte desde la inscripción hasta la prueba de admisión."
        align="center"
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickAccess.map((item, index) => (
          <Reveal key={item.href} delay={index * 0.05}>
            <Link
              href={item.href}
              className="group glass flex h-full flex-col gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40"
            >
              <span
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
                  item.tile,
                )}
              >
                <item.icon className="h-5 w-5 text-forest-deep" />
              </span>
              <span>
                <span className="block font-display text-base font-semibold">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-foreground/60">
                  {item.desc}
                </span>
              </span>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-emerald">
                Explorar
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}