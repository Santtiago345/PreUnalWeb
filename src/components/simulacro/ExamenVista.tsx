"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Clock, Flag } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Grafico } from "@/components/simulacro/Grafico";
import { M } from "@/components/simulacro/Math";
import {
  preguntasMatematicas,
  TIEMPO_TOTAL_SEGUNDOS,
} from "@/data/simulacro";
import type { Respuesta } from "@/lib/calificacion";
import { actualizarProgreso } from "@/lib/simulacroSesion";
import { cn } from "@/lib/utils";

function formatearTiempo(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ExamenVista({
  nombre,
  sesionId,
  onFinalizar,
}: {
  nombre: string;
  sesionId: string | null;
  onFinalizar: (
    respuestas: Respuesta[],
    tiempoUsado: number,
    faltas: number,
  ) => void;
}) {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [tiempo, setTiempo] = useState(TIEMPO_TOTAL_SEGUNDOS);
  const [faltas, setFaltas] = useState(0);
  const [advertencia, setAdvertencia] = useState(false);
  const finalizado = useRef(false);

  const respondidas = Object.keys(respuestas).length;
  const total = preguntasMatematicas.length;
  const faltan = total - respondidas;

  const finalizar = useCallback(
    (tiempoUsado: number, faltasFinales: number) => {
      if (finalizado.current) return;
      finalizado.current = true;
      const r: Respuesta[] = preguntasMatematicas.map((p) => {
        const sel = respuestas[p.id];
        return {
          pregunta: p.id,
          seleccion: sel ?? -1,
          correcta: sel === p.correcta,
        };
      });
      onFinalizar(r, tiempoUsado, faltasFinales);
    },
    [onFinalizar, respuestas],
  );

  // Cronómetro
  useEffect(() => {
    const id = setInterval(() => {
      setTiempo((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (tiempo === 0 && !finalizado.current) {
      finalizar(TIEMPO_TOTAL_SEGUNDOS, faltas);
    }
  }, [tiempo, faltas, finalizar]);

  // Anti-trampa: detecta cuando el estudiante sale de la pestaña
  useEffect(() => {
    const manejarVisibilidad = () => {
      if (document.hidden && !finalizado.current) {
        setFaltas((prev) => prev + 1);
        setAdvertencia(true);
      }
    };
    document.addEventListener("visibilitychange", manejarVisibilidad);
    return () =>
      document.removeEventListener("visibilitychange", manejarVisibilidad);
  }, []);

  const elegir = (pregunta: number, opcion: number) => {
    if (finalizado.current) return;
    setRespuestas((prev) => {
      const next = { ...prev, [pregunta]: opcion };
      if (sesionId) {
        void actualizarProgreso(sesionId, Object.keys(next).length, faltas);
      }
      return next;
    });
  };

  const terminar = () => {
    finalizar(TIEMPO_TOTAL_SEGUNDOS - tiempo, faltas);
  };

  return (
    <div className="pb-8">
      {/* Barra fija del cronómetro */}
      <div className="sticky top-16 z-30 -mx-4 mb-6 border-b border-forest/10 bg-background/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 dark:border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div>
            <p className="truncate text-sm font-semibold">{nombre}</p>
            <p className="text-xs text-foreground/50">
              {respondidas}/{total} respondidas · faltan {faltan}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm font-bold tabular-nums",
                tiempo < 300
                  ? "bg-coral/15 text-coral"
                  : "bg-emerald/15 text-emerald",
              )}
            >
              <Clock className="h-4 w-4" />
              {formatearTiempo(tiempo)}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={terminar}
              disabled={faltan > 0}
            >
              Terminar
            </Button>
          </div>
        </div>
        {faltan > 0 ? (
          <p className="mx-auto mt-2 max-w-3xl text-xs text-foreground/50">
            Debes responder las {faltan} preguntas restantes (o esperar a que se
            acabe el tiempo) para terminar.
          </p>
        ) : null}
        {faltas > 0 ? (
          <p className="mx-auto mt-2 flex max-w-3xl items-center gap-1.5 text-xs font-medium text-coral">
            <Flag className="h-3.5 w-3.5" />
            {faltas} salida{faltas === 1 ? "" : "s"} de la pestaña detectada
            {faltas === 1 ? "" : "s"}. Evita salir para no ser penalizado.
          </p>
        ) : null}
      </div>

      {/* Aviso anti-trampa */}
      {advertencia ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass-strong max-w-md p-6 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-coral" />
            <h2 className="mt-4 font-display text-xl font-bold">
              ¡No salgas de la prueba!
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Cambiar de pestaña o aplicación durante el simulacro se registra
              como una falta. La calificación del simulacro busca medir tu nivel
              real, como en el examen oficial.
            </p>
            <Button
              className="mt-5"
              onClick={() => setAdvertencia(false)}
            >
              Regresar a la prueba
            </Button>
          </div>
        </div>
      ) : null}

      {/* Preguntas */}
      <div className="mx-auto max-w-3xl space-y-6">
        {preguntasMatematicas.map((pregunta) => {
          const seleccionada = respuestas[pregunta.id];
          return (
            <article
              key={pregunta.id}
              id={`pregunta-${pregunta.id}`}
              className="glass p-5 sm:p-6"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald/15 font-mono text-sm font-bold text-emerald">
                  {pregunta.id}
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground/50">
                  {pregunta.tema}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                    pregunta.nivel === "fácil"
                      ? "border-emerald/30 text-emerald"
                      : pregunta.nivel === "media"
                        ? "border-ocre/30 text-ocre"
                        : "border-coral/30 text-coral",
                  )}
                >
                  {pregunta.nivel}
                </span>
              </div>

              <p className="mt-3 text-base font-medium leading-relaxed">
                <M>{pregunta.enunciado}</M>
              </p>

              {pregunta.afirmaciones ? (
                <div className="mt-3 space-y-1.5">
                  {pregunta.afirmaciones.map((a, i) => (
                    <p key={i} className="text-base leading-relaxed">
                      <span className="mr-1.5 font-semibold text-emerald">
                        ({i + 1})
                      </span>
                      <M>{a}</M>
                    </p>
                  ))}
                </div>
              ) : null}

              {pregunta.grafico ? <Grafico {...pregunta.grafico} /> : null}

              <div className="mt-4 grid gap-2">
                {pregunta.opciones.map((opcion, i) => {
                  const activa = seleccionada === i;
                  const letra = String.fromCharCode(65 + i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => elegir(pregunta.id, i)}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                        activa
                          ? "border-emerald bg-emerald/10 font-medium"
                          : "border-forest/10 hover:border-emerald/40 dark:border-white/10",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold",
                          activa
                            ? "bg-emerald text-forest-deep"
                            : "bg-white/5 text-foreground/60",
                        )}
                      >
                        {letra}
                      </span>
                      <span className="leading-relaxed">
                        <M>{opcion}</M>
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}

        <div className="glass p-6 text-center">
          <p className="text-sm text-foreground/60">
            {faltan > 0
              ? `Te faltan ${faltan} preguntas por responder.`
              : "¡Listo! Puedes terminar el simulacro."}
          </p>
          <Button
            className="mt-4"
            size="lg"
            onClick={terminar}
            disabled={faltan > 0}
          >
            Terminar simulacro
          </Button>
        </div>
      </div>
    </div>
  );
}