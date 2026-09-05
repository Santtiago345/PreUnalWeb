"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Calculator,
  ClipboardList,
  Clock,
  Play,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExamenVista } from "@/components/simulacro/ExamenVista";
import { Revision } from "@/components/simulacro/Revision";
import {
  configSimulacro,
  TIEMPO_TOTAL_SEGUNDOS,
} from "@/data/simulacro";
import { calcularResultado, type Respuesta, type ResultadoSimulacro } from "@/lib/calificacion";
import {
  estaHabilitado,
  finalizarSesion,
  iniciarSesion,
} from "@/lib/simulacroSesion";

function formatoTiempoTotal(seg: number) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${m} min${s ? ` ${s} s` : ""}`;
}

export function SimulacroApp() {
  const [fase, setFase] = useState<"intro" | "examen" | "revision">("intro");
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
    const res = calcularResultado(respuestasFinales, faltas);
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
        onReiniciar={reiniciar}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass-strong p-6 sm:p-8">
        <Badge>Componente · Matemáticas</Badge>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
          {configSimulacro.titulo}
        </h2>
        <p className="mt-3 leading-relaxed text-foreground/70">
          {configSimulacro.descripcion}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoItem
            icon={<ClipboardList className="h-5 w-5" />}
            titulo={`${configSimulacro.totalPreguntas} preguntas`}
            texto="Opción múltiple con única respuesta, como la prueba oficial."
          />
          <InfoItem
            icon={<Clock className="h-5 w-5" />}
            titulo={formatoTiempoTotal(TIEMPO_TOTAL_SEGUNDOS)}
            texto="1 min 45 s por pregunta + 5 minutos extra."
          />
          <InfoItem
            icon={<Calculator className="h-5 w-5" />}
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