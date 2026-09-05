"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Formula, M } from "@/components/simulacro/Math";
import { preguntasMatematicas as preguntas } from "@/data/simulacro";
import type { PreguntaSimulacro } from "@/data/simulacro";
import type { Respuesta, ResultadoSimulacro } from "@/lib/calificacion";
import { cn } from "@/lib/utils";

const letraDe = (i: number) => String.fromCharCode(65 + i);

function TarjetaRevisada({
  pregunta,
  respuesta,
}: {
  pregunta: PreguntaSimulacro;
  respuesta: Respuesta;
}) {
  const [verMas, setVerMas] = useState(false);
  const correcta = respuesta.correcta;
  const seleccion = respuesta.seleccion;

  return (
    <article className="glass overflow-hidden">
      <div
        className={cn(
          "flex items-start gap-3 p-5",
          correcta ? "border-l-4 border-l-emerald" : "border-l-4 border-l-coral",
        )}
      >
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold",
            correcta ? "bg-emerald/15 text-emerald" : "bg-coral/15 text-coral",
          )}
        >
          {pregunta.id}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-foreground/50">
              {pregunta.tema}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                correcta
                  ? "bg-emerald/10 text-emerald"
                  : "bg-coral/10 text-coral",
              )}
            >
              {correcta ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" /> Correcta
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5" /> Incorrecta
                </>
              )}
            </span>
          </div>

          <p className="mt-2 font-medium leading-relaxed">
            <M>{pregunta.enunciado}</M>
          </p>

          {!correcta ? (
            <div className="mt-3 space-y-1 text-sm">
              <p className="text-foreground/60">
                Tu respuesta:{" "}
                <span className="font-semibold text-coral">
                  {seleccion >= 0
                    ? `${letraDe(seleccion)}. ${pregunta.opciones[seleccion]}`
                    : "Sin responder"}
                </span>
              </p>
              <p className="text-foreground/60">
                Respuesta correcta:{" "}
                <span className="font-semibold text-emerald">
                  {letraDe(pregunta.correcta)}.{" "}
                  {pregunta.opciones[pregunta.correcta]}
                </span>
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-emerald">
              Respondiste correctamente:{" "}
              <span className="font-semibold">
                {letraDe(pregunta.correcta)}.{" "}
                {pregunta.opciones[pregunta.correcta]}
              </span>
            </p>
          )}

          <div className="mt-4 rounded-xl bg-white/5 p-4">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-ocre" />
              <span>
                <strong>Por qué:</strong> <M>{pregunta.explicacion}</M>
              </span>
            </p>
            {pregunta.formula ? <Formula f={pregunta.formula} /> : null}
          </div>

          <button
            type="button"
            onClick={() => setVerMas((v) => !v)}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald underline-offset-4 hover:underline"
          >
            {verMas ? "Ocultar explicación detallada" : "No entendí / saber más"}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", verMas && "rotate-180")}
            />
          </button>

          {verMas ? (
            <div className="mt-3 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
              <p className="text-sm leading-relaxed text-foreground/80">
                <M>{pregunta.detalle}</M>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Revision({
  respuestas,
  resultado,
  nombre,
  onReiniciar,
}: {
  respuestas: Respuesta[];
  resultado: ResultadoSimulacro;
  nombre: string;
  onReiniciar: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl pb-8">
      <div className="glass-strong p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
          Resultado de {nombre}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ResultadoStat
            label="Puntaje componente"
            value={resultado.puntajeComponente.toLocaleString("es-CO")}
            destacado
          />
          <ResultadoStat
            label="Correctas"
            value={`${resultado.correctas}/${resultado.total}`}
          />
          <ResultadoStat label="Porcentaje" value={`${resultado.porcentaje}%`} />
          <ResultadoStat label="Habilidad (θ)" value={resultado.theta.toFixed(2)} />
        </div>
        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-foreground/50">
          El puntaje del componente usa el modelo de Rasch (Teoría de Respuesta
          al Ítem) en una escala con media 10, igual que la prueba oficial.
        </p>
        <Button className="mt-5" variant="secondary" onClick={onReiniciar}>
          Volver a intentar
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {preguntas.map((p) => (
          <TarjetaRevisada key={p.id} pregunta={p} respuesta={respuestas[p.id - 1]} />
        ))}
      </div>
    </div>
  );
}

function ResultadoStat({
  label,
  value,
  destacado,
}: {
  label: string;
  value: string;
  destacado?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl p-3",
        destacado
          ? "bg-gradient-to-br from-emerald to-ocre text-forest-deep"
          : "border border-forest/10 dark:border-white/10",
      )}
    >
      <p
        className={cn(
          "font-mono text-2xl font-bold tabular-nums",
          destacado ? "text-forest-deep" : "text-emerald",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-0.5 text-[11px] font-medium uppercase tracking-wider",
          destacado ? "text-forest-deep/70" : "text-foreground/50",
        )}
      >
        {label}
      </p>
    </div>
  );
}