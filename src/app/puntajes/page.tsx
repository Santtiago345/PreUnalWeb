import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, Scale, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { PromediosRanking } from "@/components/puntajes/PromediosRanking";
import { PuntajesExplorer } from "@/components/puntajes/PuntajesExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { puntajesPorPrograma } from "@/data/puntajes";
import { fuentesAnualesBogota, fuentePrincipal } from "@/data/fuentesPuntajes";

export const metadata: Metadata = {
  title: "Historial de Puntajes",
};

export default function PuntajesPage() {
  const pendientes = fuentesAnualesBogota.filter(
    (f) => f.estado === "pendiente",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <Badge>Puntajes de admisión</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Historial de Puntajes
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/70">
          Puntajes mínimos de admisión (último admitido) por programa curricular
          en la Sede Bogotá, semestre I, desde 2015. Información extraída de los
          documentos oficiales de la Universidad Nacional de Colombia.
        </p>
      </Reveal>

      <section className="mt-12">
        <PuntajesExplorer programas={puntajesPorPrograma} />
      </section>

      <section id="promedios" className="mt-16 scroll-mt-24">
        <SectionHeading
          eyebrow="Promedio ponderado"
          title="Promedio ponderado por carrera"
          description="Ponderado por el número de admitidos en cada semestre, sobre los datos disponibles (2015–2022, semestre I, Sede Bogotá)."
        />
        <div className="mt-8">
          <PromediosRanking />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="En verificación"
          title="Semestres pendientes de verificación"
          description="Los semestres más recientes (2023–2026) y el semestre II de cada año aún no están cargados en la plataforma porque el PDF oficial es una imagen escaneada. Puedes consultar directamente el documento oficial desde aquí."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pendientes.map((f) => (
            <Reveal key={f.anio} delay={0.02}>
              <Link
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass flex items-center justify-between gap-3 p-4 transition-colors hover:border-emerald/40"
              >
                <span className="flex items-center gap-3">
                  <FileText className="h-5 w-5 shrink-0 text-ocre" />
                  <span>
                    <span className="block text-sm font-semibold">
                      {f.anio} · Semestre {f.semestre}
                    </span>
                    <span className="block text-xs text-foreground/50">
                      Bogotá · PDF oficial
                    </span>
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-emerald" />
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 flex max-w-3xl items-start gap-2 text-sm text-foreground/50">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            Se cargarán en la plataforma una vez se verifique el valor contra el
            documento oficial. Si encuentras una diferencia, repórtala para
            corregirla.
          </p>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Fuentes y metodología"
          title="De dónde sale esta información"
        />
        <div className="mt-6 max-w-3xl space-y-4">
          <Reveal>
            <div className="glass p-5">
              <h3 className="font-display text-base font-semibold">
                Metodología
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/60">
                <li>
                  • El valor publicado es el <strong>puntaje del último
                  admitido</strong> (corte) de cada programa en el semestre I.
                </li>
                <li>
                  • Se toma el valor mínimo entre las columnas de puntaje del
                  PDF oficial de cada año.
                </li>
                <li>
                  • Sede Bogotá. El semestre II y las demás sedes se añadirán
                  en próximas actualizaciones.
                </li>
                <li>
                  • Promedio ponderado = Σ(corte × admitidos) ÷ Σ(admitidos).
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass p-5">
              <h3 className="font-display text-base font-semibold">
                Documentos oficiales (Sede Bogotá · Semestre I)
              </h3>
              <ul className="mt-3 space-y-1.5">
                {fuentesAnualesBogota.map((f) => (
                  <li key={`${f.anio}-${f.semestre}`}>
                    <Link
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-emerald"
                    >
                      <Scale className="h-3.5 w-3.5 text-emerald" />
                      {f.anio} · Semestre {f.semestre}{" "}
                      <span
                        className={
                          f.estado === "verificado"
                            ? "text-xs text-emerald"
                            : "text-xs text-ocre"
                        }
                      >
                        ({f.estado === "verificado" ? "verificado" : "pendiente"})
                      </span>
                      <ExternalLink className="h-3 w-3 text-foreground/30" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <Link
              href={fuentePrincipal}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex items-center justify-between gap-4 p-5 transition-colors hover:border-emerald/40"
            >
              <span className="text-sm">
                Estadísticas del proceso de admisión — Dirección Nacional de
                Admisiones
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-emerald" />
            </Link>
          </Reveal>

          <Reveal>
            <p className="text-xs text-foreground/40">
              Dirección Nacional de Admisiones · Universidad Nacional de
              Colombia · Verificado el 02/09/2026 · admisiones.unal.edu.co
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}