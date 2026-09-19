"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  Award,
  LogOut,
  Pause,
  Play,
  RefreshCw,
  Square,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { Button } from "@/components/ui/Button";
import { getSupabase, supabaseConfigurado } from "@/lib/supabase";
import { habilitarSimulacro } from "@/lib/simulacroSesion";
import { SIMULACROS, simulacroPorId } from "@/data/simulacros";
import { cn } from "@/lib/utils";

type Sesion = {
  id: string;
  nombre: string;
  tipo?: string | null;
  iniciado_en: string;
  ultima_actividad: string;
  respondidas: number;
  faltas: number;
  terminado_en: string | null;
  respuestas: { pregunta: number; seleccion: number; correcta: boolean }[] | null;
  correctas: number | null;
  puntaje: number | null;
  puntaje_componente: number | null;
  tiempo_usado: number | null;
};

/**
 * Qué simulacro originó la sesión. Usa la columna `tipo`
 * (migración 0005) y, si aún no existe, la infiere: el simulacro de
 * matemáticas tiene 25 preguntas y el general 58.
 */
function tipoDe(s: Sesion): string {
  if (s.tipo === "general" || s.tipo === "matematicas") return s.tipo;
  const resps = s.respuestas ?? [];
  if (
    s.respondidas > 25 ||
    resps.length > 25 ||
    resps.some((r) => r.pregunta > 25)
  ) {
    return "general";
  }
  return "matematicas";
}

// Columnas livianas para el seguimiento en vivo: excluye `respuestas`
// (el JSON más pesado), que solo se trae en la consulta de estadísticas.
const COLUMNAS_LIVE =
  "id,nombre,tipo,iniciado_en,ultima_actividad,respondidas,faltas,terminado_en,correctas,puntaje,puntaje_componente,tiempo_usado";
const INTERVALO_LIVE_MS = 5000;
const INTERVALO_STATS_MS = 30000;

function formatearTiempo(seg: number) {
  const m = Math.floor(seg / 60);
  const s = Math.round(seg % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function NoConfigurado() {
  return (
    <div className="glass mx-auto max-w-2xl p-6 text-center">
      <h2 className="font-display text-xl font-semibold">
        Panel de simulacro en configuración
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
        Ejecuta las migraciones <code className="font-mono text-emerald">0003_simulacro.sql</code> y{" "}
        <code className="font-mono text-emerald">0005_simulacro_tipo.sql</code> en Supabase y
        configura las variables de entorno para activar el seguimiento en vivo.
      </p>
    </div>
  );
}

export function SimulacroAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [habilitado, setHabilitado] = useState(true);
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [cargandoSesiones, setCargandoSesiones] = useState(true);
  const [ahora, setAhora] = useState(() => Date.now());
  const [filtro, setFiltro] = useState("matematicas");
  const [enVivo, setEnVivo] = useState(true);
  // Si la migración 0005 aún no se aplicó (sin columna `tipo`), se usan
  // consultas compatibles y se infiere el tipo por heurística.
  const [conTipo, setConTipo] = useState(true);
  const firmaRef = useRef("");
  const liveEnCursoRef = useRef(false);
  const statsEnCursoRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const columnas = useCallback(
    (conRespuestas: boolean) => {
      if (!conTipo) return "*";
      return conRespuestas ? `${COLUMNAS_LIVE},respuestas` : COLUMNAS_LIVE;
    },
    [conTipo],
  );

  // Seguimiento ligero (sin el JSON de respuestas): cada 5 s.
  // Omite el re-render si nada cambió y nunca solapa peticiones.
  const cargarLive = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase || liveEnCursoRef.current) return;
    liveEnCursoRef.current = true;
    try {
      const { data, error } = await supabase
        .from("simulacro_sesiones")
        .select(columnas(false))
        .order("iniciado_en", { ascending: false })
        .limit(500)
        .abortSignal(abortRef.current?.signal ?? new AbortController().signal);
      if (error) {
        if (conTipo && /tipo/i.test(error.message ?? "")) setConTipo(false);
        return;
      }
      // Las columnas se eligen en tiempo de ejecución; el tipado del
      // cliente no puede inferirlas, así que se normaliza aquí.
      const filas = ((data ?? []) as unknown) as Sesion[];
      const firma = JSON.stringify(
        filas.map((s) => [
          s.id,
          s.respondidas,
          s.faltas,
          s.terminado_en,
          s.ultima_actividad,
        ]),
      );
      setAhora(Date.now());
      if (firma === firmaRef.current) return;
      firmaRef.current = firma;
      setSesiones((prev) => {
        const prevPorId = new Map(prev.map((s) => [s.id, s]));
        return filas.map((s) => {
          const p = prevPorId.get(s.id);
          // Conserva respuestas/tipo ya cargados por la consulta pesada.
          if (p && (!s.respuestas || !s.tipo)) {
            return {
              ...s,
              respuestas: s.respuestas ?? p.respuestas ?? null,
              tipo: s.tipo ?? p.tipo ?? null,
            };
          }
          return s;
        });
      });
      setCargandoSesiones(false);
    } catch {
      // Petición abortada al desmontar: nada que hacer.
    } finally {
      liveEnCursoRef.current = false;
    }
  }, [columnas, conTipo]);

  // Detalle pesado (con respuestas, solo terminados): cada 30 s.
  // Alimenta las estadísticas sin castigar el seguimiento en vivo.
  const cargarStats = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase || statsEnCursoRef.current) return;
    statsEnCursoRef.current = true;
    try {
      const { data, error } = await supabase
        .from("simulacro_sesiones")
        .select(columnas(true))
        .not("terminado_en", "is", null)
        .order("iniciado_en", { ascending: false })
        .limit(500)
        .abortSignal(abortRef.current?.signal ?? new AbortController().signal);
      if (error) {
        if (conTipo && /tipo/i.test(error.message ?? "")) setConTipo(false);
        return;
      }
      const porId = new Map(
        (((data ?? []) as unknown) as Sesion[]).map((s) => [s.id, s]),
      );
      if (porId.size === 0) return;
      setSesiones((prev) =>
        prev.map((s) => {
          const d = porId.get(s.id);
          return d ? { ...s, respuestas: d.respuestas ?? s.respuestas } : s;
        }),
      );
    } catch {
      // Petición abortada al desmontar: nada que hacer.
    } finally {
      statsEnCursoRef.current = false;
    }
  }, [columnas, conTipo]);

  const cargarHabilitado = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data: cfg } = await supabase
      .from("simulacro_config")
      .select("habilitado")
      .eq("id", 1)
      .single();
    setHabilitado(cfg?.habilitado ?? true);
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setVerificando(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const supabase = getSupabase();
    if (!supabase) return;
    void supabase
      .from("admins")
      .select("email")
      .eq("email", user.email ?? "")
      .then(({ data }) => setEsAdmin((data?.length ?? 0) > 0));
  }, [user]);

  useEffect(() => {
    if (!esAdmin) return;
    const controlador = new AbortController();
    abortRef.current = controlador;
    // Carga inicial al suscribirse al seguimiento en vivo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargarLive();
    void cargarStats();
    void cargarHabilitado();
    // Al volver a la pestaña se retoma de inmediato (antes el sondeo
    // quedaba detenido para siempre).
    const alVisibilidad = () => {
      if (!document.hidden && enVivo) void cargarLive();
    };
    const timerLive = setInterval(() => {
      // No sondea con la pestaña oculta ni en pausa (ahorra recursos).
      if (!document.hidden && enVivo) void cargarLive();
    }, INTERVALO_LIVE_MS);
    const timerStats = setInterval(() => {
      if (!document.hidden && enVivo) void cargarStats();
    }, INTERVALO_STATS_MS);
    document.addEventListener("visibilitychange", alVisibilidad);
    return () => {
      controlador.abort();
      abortRef.current = null;
      clearInterval(timerLive);
      clearInterval(timerStats);
      document.removeEventListener("visibilitychange", alVisibilidad);
    };
  }, [esAdmin, enVivo, cargarLive, cargarStats, cargarHabilitado]);

  const toggleHabilitado = async () => {
    const ok = await habilitarSimulacro(!habilitado);
    if (ok) setHabilitado(!habilitado);
  };

const salir = async () => {
    await getSupabase()?.auth.signOut();
    setUser(null);
  };

  const simulacroSel = simulacroPorId(filtro);
  const totalPreguntas = simulacroSel.totalPreguntas;
  const sesionesFiltradas = useMemo(
    () => sesiones.filter((s) => tipoDe(s) === filtro),
    [sesiones, filtro],
  );
  const conteoPorTipo = useMemo(() => {
    const c: Record<string, number> = {};
    for (const s of sesiones) {
      const t = tipoDe(s);
      c[t] = (c[t] ?? 0) + 1;
    }
    return c;
  }, [sesiones]);
  const enCurso = useMemo(
    () => sesionesFiltradas.filter((s) => !s.terminado_en),
    [sesionesFiltradas],
  );
  const terminados = useMemo(
    () => sesionesFiltradas.filter((s) => s.terminado_en),
    [sesionesFiltradas],
  );
  const promedioComponente = useMemo(
    () =>
      terminados.length
        ? terminados.reduce((a, s) => a + (s.puntaje_componente ?? 0), 0) /
          terminados.length
        : 0,
    [terminados],
  );
  const mejor = useMemo(
    () =>
      [...terminados].sort(
        (a, b) => (b.puntaje_componente ?? 0) - (a.puntaje_componente ?? 0),
      )[0],
    [terminados],
  );
  const primero = useMemo(
    () =>
      [...terminados].sort(
        (a, b) => (a.tiempo_usado ?? 0) - (b.tiempo_usado ?? 0),
      )[0],
    [terminados],
  );

  // Agregación de aciertos/fallos por pregunta (memoizada)
  const { masFallada, masAcertada, datosPreguntas } = useMemo(() => {
    const conteo: Record<number, { ok: number; mal: number }> = {};
    for (const s of terminados) {
      for (const r of s.respuestas ?? []) {
        conteo[r.pregunta] ??= { ok: 0, mal: 0 };
        if (r.correcta) conteo[r.pregunta].ok += 1;
        else conteo[r.pregunta].mal += 1;
      }
    }
    const preguntasConFallos = Object.entries(conteo)
      .filter(([, v]) => v.mal > 0)
      .sort((a, b) => b[1].mal - a[1].mal);
    const fallada = preguntasConFallos[0];
    const acertada = Object.entries(conteo)
      .filter(([, v]) => v.ok > 0)
      .sort((a, b) => b[1].ok - a[1].ok)[0];

    const datos = simulacroSel.preguntas.map((p) => {
      const c = conteo[p.id] ?? { ok: 0, mal: 0 };
      return {
        nombre: `P${p.id}`,
        aciertos: c.ok,
        fallos: c.mal,
        total: c.ok + c.mal,
        enunciado: p.enunciado.replace(/[$\\]/g, "").slice(0, 90),
      };
    });
    return { masFallada: fallada, masAcertada: acertada, datosPreguntas: datos };
  }, [terminados, simulacroSel]);

  const enunciadoDe = (id: number) =>
    simulacroSel.preguntas.find((p) => p.id === id)?.enunciado ?? "";

  if (!supabaseConfigurado) return <NoConfigurado />;

  if (verificando) {
    return <div className="glass mx-auto max-w-md animate-pulse p-8" />;
  }

  if (!user) {
    return (
      <AdminLogin
        onLogin={() => {
          void getSupabase()
            ?.auth.getSession()
            .then(({ data }) => setUser(data.session?.user ?? null));
        }}
      />
    );
  }

if (!esAdmin) {
    return (
      <div className="glass mx-auto max-w-md p-6 text-center">
        <h2 className="font-display text-xl font-semibold">Sin autorización</h2>
        <p className="mt-2 text-sm text-foreground/60">
          Tu correo no está en la tabla de administradores.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Panel del simulacro
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            Seguimiento en vivo de los estudiantes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className="h-4 w-4" />}
            onClick={() => {
              void cargarLive();
              void cargarStats();
            }}
          >
            Actualizar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={
              enVivo ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />
            }
            onClick={() => setEnVivo((v) => !v)}
            title={enVivo ? "Pausar seguimiento en vivo" : "Reanudar seguimiento en vivo"}
          >
            {enVivo ? "En vivo" : "Pausado"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<LogOut className="h-4 w-4" />}
            onClick={salir}
          >
            Salir
          </Button>
        </div>
      </div>

      <div
        className="glass flex flex-wrap items-center gap-2 p-4"
        role="radiogroup"
        aria-label="Simulacro a visualizar"
      >
        <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-foreground/50">
          Viendo datos de:
        </span>
        {SIMULACROS.map((s) => {
          const activo = s.id === filtro;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={activo}
              onClick={() => setFiltro(s.id)}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                activo
                  ? "border-emerald bg-emerald/15 text-emerald"
                  : "border-forest/10 text-foreground/60 hover:border-emerald/40 dark:border-white/10",
              )}
            >
              {s.componente}
              <span className="ml-1.5 font-mono text-xs font-normal opacity-70">
                ({conteoPorTipo[s.id] ?? 0})
              </span>
            </button>
          );
        })}
        <span className="ml-auto text-xs text-foreground/50">
          {simulacroSel.titulo} · {totalPreguntas} preguntas · se actualiza en
          vivo
        </span>
      </div>

      <div className="glass flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              habilitado
                ? "bg-emerald/15 text-emerald"
                : "bg-coral/15 text-coral",
            )}
          >
            {habilitado ? <Play className="h-5 w-5" /> : <Square className="h-5 w-5" />}
          </span>
          <div>
            <p className="text-sm font-semibold">
              {habilitado ? "Simulacro habilitado" : "Simulacro deshabilitado"}
            </p>
            <p className="text-xs text-foreground/50">
              Controla el botón «Empezar simulacro» de los estudiantes.
            </p>
          </div>
        </div>
        <Button
          variant={habilitado ? "secondary" : "primary"}
          onClick={toggleHabilitado}
        >
          {habilitado ? "Deshabilitar" : "Habilitar"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatMiniMemo label="Estudiantes" valor={String(sesiones.length)} icon={<Users className="h-4 w-4" />} />
        <StatMiniMemo label="En curso" valor={String(enCurso.length)} />
        <StatMiniMemo label="Terminados" valor={String(terminados.length)} />
        <StatMiniMemo label="Prom. componente" valor={promedioComponente.toFixed(1)} />
      </div>

      <section className="glass p-5">
        <h3 className="font-display text-base font-semibold">
          En curso ({enCurso.length})
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-forest/10 text-left text-xs uppercase tracking-wider text-foreground/50 dark:border-white/10">
                <th className="py-2 pr-4 font-semibold">Nombre</th>
                <th className="py-2 pr-4 font-semibold">Respondidas</th>
                <th className="py-2 pr-4 font-semibold">Tiempo</th>
                <th className="py-2 font-semibold">Faltas</th>
              </tr>
            </thead>
            <tbody>
              {enCurso.map((s) => (
                <FilaEnCursoMemo
                  key={s.id}
                  sesion={s}
                  total={totalPreguntas}
                  ahora={ahora}
                />
              ))}
              {enCurso.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-foreground/50">
                    Nadie está resolviendo el simulacro ahora.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass p-5">
        <h3 className="font-display text-base font-semibold">
          Terminados ({terminados.length})
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-forest/10 text-left text-xs uppercase tracking-wider text-foreground/50 dark:border-white/10">
                <th className="py-2 pr-4 font-semibold">Nombre</th>
                <th className="py-2 pr-4 font-semibold">Componente</th>
                <th className="py-2 pr-4 font-semibold">Correctas</th>
                <th className="py-2 pr-4 font-semibold">Tiempo</th>
                <th className="py-2 font-semibold">Faltas</th>
              </tr>
            </thead>
            <tbody>
              {terminados.map((s) => (
                <FilaTerminadaMemo key={s.id} sesion={s} total={totalPreguntas} />
              ))}
              {terminados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-foreground/50">
                    Aún no hay resultados.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {terminados.length > 0 ? (
        <section className="glass p-5">
          <h3 className="font-display text-base font-semibold">Estadísticas</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mejor ? (
              <StatCardMemo
                icon={<Award className="h-4 w-4" />}
                titulo="Mejor puntaje"
                valor={`${mejor.nombre} · ${(mejor.puntaje_componente ?? 0).toLocaleString("es-CO")}`}
              />
            ) : null}
            {primero ? (
              <StatCardMemo
                titulo="Primero en terminar"
                valor={`${primero.nombre} · ${formatearTiempo(primero.tiempo_usado ?? 0)}`}
              />
            ) : null}
            {masFallada ? (
              <StatCardMemo
                titulo="Pregunta más fallada"
                valor={`#${masFallada[0]} · ${masFallada[1].mal} fallos`}
                texto={enunciadoDe(Number(masFallada[0]))}
              />
            ) : null}
            {masAcertada ? (
              <StatCardMemo
                titulo="Pregunta más acertada"
                valor={`#${masAcertada[0]} · ${masAcertada[1].ok} aciertos`}
                texto={enunciadoDe(Number(masAcertada[0]))}
              />
            ) : null}
          </div>

          <GraficasMemo datos={datosPreguntas} />
        </section>
      ) : null}

      {cargandoSesiones ? (
        <p className="text-center text-sm text-foreground/50">Cargando…</p>
      ) : null}
    </div>
  );
}

function StatMini({
  label,
  valor,
  icon,
}: {
  label: string;
  valor: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="glass flex items-center gap-3 p-4">
      {icon ? <span className="text-emerald">{icon}</span> : null}
      <div>
        <p className="font-mono text-2xl font-bold tabular-nums">{valor}</p>
        <p className="text-[11px] font-medium uppercase tracking-wider text-foreground/50">
          {label}
        </p>
      </div>
    </div>
  );
}

const StatMiniMemo = memo(StatMini);

function StatCard({
  icon,
  titulo,
  valor,
  texto,
}: {
  icon?: React.ReactNode;
  titulo: string;
  valor: string;
  texto?: string;
}) {
  return (
    <div className="rounded-xl border border-forest/10 p-4 dark:border-white/10">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/50">
        {icon ? <span className="text-ocre">{icon}</span> : null}
        {titulo}
      </p>
      <p className="mt-1.5 text-sm font-semibold">{valor}</p>
      {texto ? (
        <p className="mt-1 line-clamp-2 text-xs text-foreground/50">{texto}</p>
      ) : null}
    </div>
  );
}

const StatCardMemo = memo(StatCard);

function FilaEnCurso({
  sesion,
  total,
  ahora,
}: {
  sesion: Sesion;
  total: number;
  ahora: number;
}) {
  const transcurrido = Math.max(
    0,
    Math.floor((ahora - new Date(sesion.iniciado_en).getTime()) / 1000),
  );
  return (
    <tr className="border-b border-forest/5 last:border-0 dark:border-white/5">
      <td className="py-2 pr-4 font-medium">{sesion.nombre}</td>
      <td className="py-2 pr-4 font-mono">
        {sesion.respondidas}/{total}
      </td>
      <td className="py-2 pr-4 font-mono tabular-nums">
        {formatearTiempo(transcurrido)}
      </td>
      <td className={cn("py-2 font-mono", sesion.faltas > 0 && "text-coral")}>
        {sesion.faltas}
      </td>
    </tr>
  );
}

const FilaEnCursoMemo = memo(FilaEnCurso);

function FilaTerminada({
  sesion,
  total,
}: {
  sesion: Sesion;
  total: number;
}) {
  return (
    <tr className="border-b border-forest/5 last:border-0 dark:border-white/5">
      <td className="py-2 pr-4 font-medium">
        <span className="flex items-center gap-1.5">
          {sesion.nombre}
          {sesion.faltas >= 3 ? (
            <span className="rounded-full border border-coral/30 bg-coral/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-coral">
              Revisar
            </span>
          ) : null}
        </span>
      </td>
      <td className="py-2 pr-4 font-mono font-semibold text-emerald">
        {(sesion.puntaje_componente ?? 0).toLocaleString("es-CO")}
      </td>
      <td className="py-2 pr-4 font-mono">
        {sesion.correctas}/{total}
      </td>
      <td className="py-2 pr-4 font-mono tabular-nums">
        {formatearTiempo(sesion.tiempo_usado ?? 0)}
      </td>
      <td className={cn("py-2 font-mono", sesion.faltas > 0 && "text-coral")}>
        {sesion.faltas}
      </td>
    </tr>
  );
}

const FilaTerminadaMemo = memo(FilaTerminada);

type DatoPregunta = {
  nombre: string;
  aciertos: number;
  fallos: number;
  total: number;
  enunciado: string;
};

function GraficaBarras({
  datos,
  titulo,
  descripcion,
  dataKey,
  color,
  borde,
  etiqueta,
}: {
  datos: DatoPregunta[];
  titulo: string;
  descripcion: string;
  dataKey: "aciertos" | "fallos";
  color: string;
  borde: string;
  etiqueta: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{titulo}</h4>
      <p className="text-xs text-foreground/50">{descripcion}</p>
      <div className="mt-3 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={datos}
            margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-forest/10 dark:text-white/10"
            />
            <XAxis
              dataKey="nombre"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              className="text-foreground/50"
              interval="preserveStartEnd"
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              className="text-foreground/50"
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "#143a2a",
                border: `1px solid ${borde}`,
                borderRadius: 12,
                color: "#fff9ef",
                fontSize: 12,
              }}
              formatter={(v) => [Number(v ?? 0), etiqueta]}
              labelFormatter={(l, p) => {
                const d = p?.[0]?.payload as DatoPregunta | undefined;
                return d?.enunciado ? `${l} · ${d.enunciado}` : String(l);
              }}
            />
            {/* Sin animación: evita acumular frames en cada actualización
                en vivo, que era la principal fuga de memoria/CPU. */}
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Graficas({ datos }: { datos: DatoPregunta[] }) {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <GraficaBarras
        datos={datos}
        titulo="Aciertos por pregunta"
        descripcion="La barra en esmeralda es la más acertada."
        dataKey="aciertos"
        color="#2ec27e"
        borde="#2ec27e55"
        etiqueta="Aciertos"
      />
      <GraficaBarras
        datos={datos}
        titulo="Fallos por pregunta"
        descripcion="La barra en coral es la más fallada."
        dataKey="fallos"
        color="#ff6b5b"
        borde="#ff6b5b55"
        etiqueta="Fallos"
      />
    </div>
  );
}

const GraficasMemo = memo(Graficas);

