"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  Award,
  LogOut,
  Play,
  RefreshCw,
  Square,
  Users,
} from "lucide-react";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { Button } from "@/components/ui/Button";
import { getSupabase, supabaseConfigurado } from "@/lib/supabase";
import { habilitarSimulacro } from "@/lib/simulacroSesion";
import { preguntasMatematicas } from "@/data/simulacro";
import { cn } from "@/lib/utils";

type Sesion = {
  id: string;
  nombre: string;
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
        Ejecuta la migración <code className="font-mono text-emerald">0003_simulacro.sql</code> en Supabase y
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

  const cargar = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const [{ data: cfg }, { data: ses }] = await Promise.all([
      supabase.from("simulacro_config").select("habilitado").eq("id", 1).single(),
      supabase
        .from("simulacro_sesiones")
        .select("*")
        .order("iniciado_en", { ascending: false })
        .limit(500),
    ]);
    setHabilitado(cfg?.habilitado ?? true);
    setSesiones((ses ?? []) as Sesion[]);
    setCargandoSesiones(false);
    setAhora(Date.now());
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void cargar();
    const id = setInterval(() => void cargar(), 4000);
    return () => clearInterval(id);
  }, [esAdmin, cargar]);

  const toggleHabilitado = async () => {
    const ok = await habilitarSimulacro(!habilitado);
    if (ok) setHabilitado(!habilitado);
  };

  const salir = async () => {
    await getSupabase()?.auth.signOut();
    setUser(null);
  };

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

  const enCurso = sesiones.filter((s) => !s.terminado_en);
  const terminados = sesiones.filter((s) => s.terminado_en);
  const promedioComponente = terminados.length
    ? terminados.reduce((a, s) => a + (s.puntaje_componente ?? 0), 0) /
      terminados.length
    : 0;
  const mejor = [...terminados].sort(
    (a, b) => (b.puntaje_componente ?? 0) - (a.puntaje_componente ?? 0),
  )[0];
  const primero = [...terminados].sort(
    (a, b) => (a.tiempo_usado ?? 0) - (b.tiempo_usado ?? 0),
  )[0];

  // Agregación de aciertos/fallos por pregunta
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
  const masFallada = preguntasConFallos[0];
  const masAcertada = Object.entries(conteo)
    .filter(([, v]) => v.ok > 0)
    .sort((a, b) => b[1].ok - a[1].ok)[0];

  const enunciadoDe = (id: number) =>
    preguntasMatematicas.find((p) => p.id === id)?.enunciado ?? "";

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
            onClick={() => void cargar()}
          >
            Actualizar
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
        <StatMini label="Estudiantes" valor={String(sesiones.length)} icon={<Users className="h-4 w-4" />} />
        <StatMini label="En curso" valor={String(enCurso.length)} />
        <StatMini label="Terminados" valor={String(terminados.length)} />
        <StatMini label="Prom. componente" valor={promedioComponente.toFixed(1)} />
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
              {enCurso.map((s) => {
                const transcurrido = Math.floor(
                  (ahora - new Date(s.iniciado_en).getTime()) / 1000,
                );
                return (
                  <tr key={s.id} className="border-b border-forest/5 last:border-0 dark:border-white/5">
                    <td className="py-2 pr-4 font-medium">{s.nombre}</td>
                    <td className="py-2 pr-4 font-mono">{s.respondidas}/25</td>
                    <td className="py-2 pr-4 font-mono tabular-nums">
                      {formatearTiempo(transcurrido)}
                    </td>
                    <td className={cn("py-2 font-mono", s.faltas > 0 && "text-coral")}>
                      {s.faltas}
                    </td>
                  </tr>
                );
              })}
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
                <tr key={s.id} className="border-b border-forest/5 last:border-0 dark:border-white/5">
                  <td className="py-2 pr-4 font-medium">{s.nombre}</td>
                  <td className="py-2 pr-4 font-mono font-semibold text-emerald">
                    {(s.puntaje_componente ?? 0).toLocaleString("es-CO")}
                  </td>
                  <td className="py-2 pr-4 font-mono">{s.correctas}/25</td>
                  <td className="py-2 pr-4 font-mono tabular-nums">
                    {formatearTiempo(s.tiempo_usado ?? 0)}
                  </td>
                  <td className={cn("py-2 font-mono", s.faltas > 0 && "text-coral")}>
                    {s.faltas}
                  </td>
                </tr>
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
              <StatCard
                icon={<Award className="h-4 w-4" />}
                titulo="Mejor puntaje"
                valor={`${mejor.nombre} · ${(mejor.puntaje_componente ?? 0).toLocaleString("es-CO")}`}
              />
            ) : null}
            {primero ? (
              <StatCard
                titulo="Primero en terminar"
                valor={`${primero.nombre} · ${formatearTiempo(primero.tiempo_usado ?? 0)}`}
              />
            ) : null}
            {masFallada ? (
              <StatCard
                titulo="Pregunta más fallada"
                valor={`#${masFallada[0]} · ${masFallada[1].mal} fallos`}
                texto={enunciadoDe(Number(masFallada[0]))}
              />
            ) : null}
            {masAcertada ? (
              <StatCard
                titulo="Pregunta más acertada"
                valor={`#${masAcertada[0]} · ${masAcertada[1].ok} aciertos`}
                texto={enunciadoDe(Number(masAcertada[0]))}
              />
            ) : null}
          </div>
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