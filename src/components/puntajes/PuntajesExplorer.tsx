"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

import type { ProgramaPuntajes } from "@/data/puntajes";
import { cn } from "@/lib/utils";

const AREAS = [
  "Todas",
  "Salud",
  "Ingeniería",
  "Ciencias básicas",
  "Sociales y humanidades",
  "Artes y diseño",
];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: { anio: number; corte: number; admitidos: number | null };
  }>;
  label?: string | number;
};

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-strong px-3.5 py-2.5 text-sm">
      <p className="font-semibold">{label}</p>
      <p className="mt-1">
        Corte:{" "}
        <span className="font-mono font-semibold text-emerald">
          {d.corte.toLocaleString("es-CO", { minimumFractionDigits: 1 })}
        </span>
      </p>
      <p className="text-foreground/60">Admitidos: {d.admitidos}</p>
    </div>
  );
}

function formatearPuntaje(v: number) {
  return v.toLocaleString("es-CO", { maximumFractionDigits: 1 });
}

export function PuntajesExplorer({
  programas,
}: {
  programas: ProgramaPuntajes[];
}) {
  const [area, setArea] = useState("Todas");
  const [programaId, setProgramaId] = useState("medicina");

  const filtrados =
    area === "Todas"
      ? programas
      : programas.filter((p) => p.area === area);

  const programa = filtrados.find((p) => p.id === programaId) ?? filtrados[0];

  const data = programa.series.map((s) => ({
    anio: s.anio,
    corte: Number(s.corte.toFixed(1)),
    admitidos: s.admitidos,
  }));

  const cortes = programa.series.map((s) => s.corte);
  const promedio = cortes.length
    ? cortes.reduce((a, b) => a + b, 0) / cortes.length
    : 0;
  const minimo = cortes.length ? Math.min(...cortes) : 0;
  const maximo = cortes.length ? Math.max(...cortes) : 0;
  const ultimo = cortes.length ? cortes[cortes.length - 1] : 0;

  return (
    <div className="space-y-6">
      <div className="glass p-4 sm:p-6">
        <label
          htmlFor="area-puntajes"
          className="text-xs font-semibold uppercase tracking-wider text-foreground/50"
        >
          Área
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setArea(a)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                a === area
                  ? "border-emerald bg-emerald/15 text-emerald"
                  : "border-forest/10 text-foreground/70 hover:border-emerald/40 hover:text-foreground dark:border-white/10",
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="glass p-4 sm:p-6">
        <label
          htmlFor="programa-puntajes"
          className="text-xs font-semibold uppercase tracking-wider text-foreground/50"
        >
          Programa curricular
        </label>
        <select
          id="programa-puntajes"
          value={programa.id}
          onChange={(e) => setProgramaId(e.target.value)}
          className="mt-2 w-full rounded-xl border border-forest/10 bg-background px-4 py-3 text-base font-medium focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30 dark:border-white/10"
        >
          {AREAS.filter((a) => a !== "Todas").map((a) => (
            <optgroup key={a} label={a}>
              {programas
                .filter((p) => p.area === a)
                .sort((x, y) => x.nombre.localeCompare(y.nombre))
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="glass p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">
            {programa.nombre}
          </h3>
          <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
            {programa.area}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Promedio" value={formatearPuntaje(promedio)} />
          <Stat label="Mínimo" value={formatearPuntaje(minimo)} />
          <Stat label="Máximo" value={formatearPuntaje(maximo)} />
          <Stat
            label="2022 (último)"
            value={formatearPuntaje(ultimo)}
            destacado={ultimo >= promedio}
          />
        </div>

        <div className="mt-6 h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-forest/10 dark:text-white/10" />
              <XAxis
                dataKey="anio"
                tick={{ fill: "currentColor", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-foreground/50"
              />
              <YAxis
                domain={["dataMin - 20", "dataMax + 20"]}
                tick={{ fill: "currentColor", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={42}
                tickFormatter={(v: number) => v.toLocaleString("es-CO")}
                className="text-foreground/50"
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#2ec27e", strokeDasharray: "4 4" }} />
              <ReferenceLine
                y={Number(promedio.toFixed(1))}
                stroke="#e8b04b"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey="corte"
                stroke="#2ec27e"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#2ec27e", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#e8b04b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs text-foreground/50">
          <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          El valor corresponde al puntaje del último admitido (corte) en el
          semestre I. La línea ocre marca el promedio del periodo.
        </p>
      </div>

      <div className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forest/10 text-left text-xs uppercase tracking-wider text-foreground/50 dark:border-white/10">
              <th className="px-4 py-3 font-semibold">Año</th>
              <th className="px-4 py-3 font-semibold">Semestre</th>
              <th className="px-4 py-3 text-right font-semibold">Corte</th>
              <th className="px-4 py-3 text-right font-semibold">Admitidos</th>
            </tr>
          </thead>
          <tbody>
            {programa.series
              .slice()
              .reverse()
              .map((s) => (
                <tr
                  key={s.anio}
                  className="border-b border-forest/5 last:border-0 dark:border-white/5"
                >
                  <td className="px-4 py-2.5 font-medium">{s.anio}</td>
                  <td className="px-4 py-2.5 text-foreground/60">{s.semestre}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold tabular-nums">
                    {formatearPuntaje(s.corte)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-foreground/60">
                    {s.admitidos}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  destacado,
}: {
  label: string;
  value: string;
  destacado?: boolean;
}) {
  return (
    <div className="rounded-xl border border-forest/10 p-3 dark:border-white/10">
      <p className="font-mono text-xl font-bold tabular-nums text-emerald">
        {value}
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-foreground/50">
        {label}
        {destacado ? <TrendingUp className="h-3 w-3" /> : null}
      </p>
    </div>
  );
}