"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  ClipboardList,
  Clock,
  Play,
  Shapes,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExamenVista } from "@/components/simulacro/ExamenVista";
import { Revision } from "@/components/simulacro/Revision";
import { SIMULACROS, simulacroPorId } from "@/data/simulacros";
import type { SimulacroDef } from "@/data/simulacro";
import { calcularResultado, type Respuesta, type ResultadoSimulacro } from "@/lib/calificacion";
import {
  estaHabilitado,
  finalizarSesion,
  iniciarSesion,
} from "@/lib/simulacroSesion";
import { cn } from "@/lib/utils";

function formatoTiempoTotal(seg: number) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${m} min${s ? ` ${s} s` : ""}`;
}

function tiempoDe(s: SimulacroDef) {
  return (
    s.totalPreguntas * s.segundosPorPregunta + s.minutosExtra * 60
  );
}

const ICONOS: Record<string, ReactNode> = {
  matematicas: <Calculator className="h-5 w-5" />,
  general: <Shapes className="h-5 w-5" />,
};

export function SimulacroApp() {
  const [fase, setFase] = useState<"intro" | "examen" | "revision">("intro");
  const [simId, setSimId] = useState(SIMULACROS[0].id);
  const simulacro = simulacroPorId(simId);
  const [nombre, setNombre] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [cargandoConfig, setCargandoConfig] = useState(true);
  const [sesionId, setSesionId] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoSimulacro | null>(null);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void estaHabilitado().then((h) => {
      setHabilitado(h);
      setCargandoConfig(false);
    });
  }, []);

  const empezar = async () => {
    if (!nombre.trim()) {
      setError("Escribe tu nombre para empezar.");
      return;
    }
    setError(null);
    const id = await iniciarSesion(nombre.trim());
    setSesionId(id);
    setFase("examen");
  };

  const onFinalizar = async (
    respuestasFinales: Respuesta[],
    tiempoUsado: number,
    faltas: number,
  ) => {
    const res = calcularResultado(
      respuestasFinales,
      faltas,
      simulacro.preguntas,
    );
    if (sesionId) {
      await finalizarSesion(sesionId, respuestasFinales, res, tiempoUsado, faltas);
    }
    setRespuestas(respuestasFinales);
    setResultado(res);
    setFase("revision");
  };

  const reiniciar = () => {
    setFase("intro");
    setNombre("");
    setResultado(null);
    setRespuestas([]);
    setSesionId(null);
  };

  if (fase === "examen") {
    return (
      <ExamenVista
        nombre={nombre}
        sesionId={sesionId}
        simulacro={simulacro}
        onFinalizar={onFinalizar}
      />
    );
  }

  if (fase === "revision" && resultado) {
    return (
      <Revision
        nombre={nombre}
        respuestas={respuestas}
        resultado={resultado}
        simulacro={simulacro}
        onReiniciar={reiniciar}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass-strong p-6 sm:p-8">
        <Badge>Simulacros disponibles</Badge>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
          Elige tu simulacro
        </h2>

        <div
          className="mt-5 grid gap-3 sm:grid-cols-2"
          role="radiogroup"
          aria-label="Simulacro"
        >
          {SIMULACROS.map((s) => {
            const activo = s.id === simId;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={activo}
                onClick={() => setSimId(s.id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  activo
                    ? "border-emerald bg-emerald/10"
                    : "border-forest/10 hover:border-emerald/40 dark:border-white/10",
                )}
              >
                <span className="flex items-center gap-2 text-emerald">
                  {ICONOS[s.id] ?? <ClipboardList className="h-5 w-5" />}
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {s.componente}
                  </span>
                </span>
                <span className="mt-2 block font-display text-lg font-bold">
                  {s.titulo}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-foreground/60">
                  {s.totalPreguntas} preguntas ·{" "}
                  {formatoTiempoTotal(tiempoDe(s))}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 leading-relaxed text-foreground/70">
          {simulacro.descripcion}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoItem
            icon={<ClipboardList className="h-5 w-5" />}
            titulo={`${simulacro.totalPreguntas} preguntas`}
            texto="Opción múltiple con única respuesta, como la prueba oficial."
          />
          <InfoItem
            icon={<Clock className="h-5 w-5" />}
            titulo={formatoTiempoTotal(tiempoDe(simulacro))}
            texto="1 min 45 s por pregunta + 5 minutos extra."
          />
          <InfoItem
            icon={<BookOpen className="h-5 w-5" />}
            titulo="Puntaje del componente"
            texto="Modelo de Rasch (TRI), escala 10±1, igual que la UNAL."
          />
          <InfoItem
            icon={<AlertTriangle className="h-5 w-5" />}
            titulo="Sin trampa"
            texto="Cada salida de la pestaña resta 0,5 puntos (tope −2,0). Con 3 o más, tu resultado se marca para revisión."
          />
        </div>

        <div className="mt-8">
          <label
            htmlFor="nombre-simulacro"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/50"
          >
            <User className="h-4 w-4" />
            Escribe tu nombre para empezar
          </label>
          <input
            id="nombre-simulacro"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="mt-2 w-full rounded-xl border border-forest/10 bg-background px-4 py-3 text-base focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30 dark:border-white/10"
          />

          {error ? (
            <p className="mt-2 text-sm text-coral">{error}</p>
          ) : null}

          <Button
            className="mt-4 w-full"
            size="lg"
            icon={<Play className="h-4 w-4" />}
            onClick={empezar}
            disabled={!habilitado || cargandoConfig}
          >
            {cargandoConfig
              ? "Cargando…"
              : habilitado
                ? "Empezar simulacro"
                : "Simulacro deshabilitado"}
          </Button>

          {!habilitado && !cargandoConfig ? (
            <p className="mt-3 text-center text-sm text-foreground/50">
              El administrador deshabilitó el simulacro temporalmente. Intenta
              más tarde.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  titulo,
  texto,
}: {
  icon: React.ReactNode;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-forest/10 p-4 dark:border-white/10">
      <span className="mt-0.5 text-emerald">{icon}</span>
      <div>
        <p className="text-sm font-semibold">{titulo}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-foreground/60">
          {texto}
        </p>
      </div>
    </div>
  );
}