"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarClock, Play } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Countdown } from "@/components/ui/Countdown";
import { SpindleSun } from "@/components/ui/SpindleSun";
import { nextKeyDate, site } from "@/lib/site";

function Stat({ to, label }: { to: number; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-bold text-foreground sm:text-3xl">
        <CountUp
          to={to}
          suffix={to === 2015 ? "" : "+"}
        />
      </dt>
      <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-foreground/50">
        {label}
      </dd>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-muisca" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_15%_0%,rgb(46_194_126/0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_20%,rgb(232_176_75/0.12),transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge>
            {site.community} · {site.city}
          </Badge>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
            Tu camino hacia la{" "}
            <span className="bg-gradient-to-r from-emerald to-ocre bg-clip-text text-transparent">
              Universidad Nacional
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">
            Información del examen, historial de puntajes, fechas clave,
            contenidos de estudio y simulacros cronometrados para preparar la
            prueba de admisión.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/examen"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Explorar el examen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/simulacros"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Play className="h-4 w-4" />
              Empezar simulacro
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            <Stat to={2015} label="Historial desde" />
            <Stat to={5} label="Componentes" />
            <Stat to={11} label="Hitos por semestre" />
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <SpindleSun className="absolute -right-16 -top-20 -z-10 hidden animate-float lg:block" />
          <div className="glass-strong p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ocre">
              <CalendarClock className="h-4 w-4" />
              Próximo hito
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold">
              {nextKeyDate.label}
            </h3>
            <Countdown
              target={new Date(nextKeyDate.date).getTime()}
              className="mt-6"
            />
            <p className="mt-5 text-sm text-foreground/60">
              Semestre en curso. Consulta todas las fechas del calendario en{" "}
              <Link
                href="/fechas"
                className="font-semibold text-emerald underline-offset-4 hover:underline"
              >
                Fechas Importantes
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}