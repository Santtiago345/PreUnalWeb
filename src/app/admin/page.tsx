import type { Metadata } from "next";

import { AdminApp } from "@/components/admin/AdminApp";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
          Zona restringida
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Administración
        </h1>
        <p className="mt-3 text-foreground/60">
          Gestiona la biblioteca de contenido de preparación.
        </p>
      </Reveal>

      <section className="mt-10">
        <AdminApp />
      </section>
    </div>
  );
}