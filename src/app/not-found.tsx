import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-7xl font-bold text-emerald">404</p>
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="max-w-md text-foreground/60">
        El contenido que buscas no existe o aún está en construcción.
      </p>
      <Link
        href="/"
        className={buttonVariants({ variant: "primary", size: "lg" })}
      >
        Volver al inicio
      </Link>
    </div>
  );
}