import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:py-32">
      <Reveal>
        <Badge>Próximamente</Badge>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60">
          {description}
        </p>
        <Link
          href="/"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
            className: "mt-10",
          })}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </Reveal>
    </section>
  );
}