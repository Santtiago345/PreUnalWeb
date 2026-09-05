"use client";

import { useMemo } from "react";

export type GraficoPolinomio = {
  coefs: number[];
  dominio: [number, number];
};

const W = 360;
const H = 280;
const pad = 34;

export function Grafico({ coefs, dominio }: GraficoPolinomio) {
  const [xmin, xmax] = dominio;

  const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (W - 2 * pad);
  const sy = (y: number) => H - pad - ((y - ymin) / (ymax - ymin)) * (H - 2 * pad);

  const { path, ymin, ymax } = useMemo(() => {
    const n = 240;
    const pts: [number, number][] = [];
    for (let i = 0; i <= n; i++) {
      const x = xmin + ((xmax - xmin) * i) / n;
      let y = 0;
      coefs.forEach((c, idx) => {
        y += c * Math.pow(x, coefs.length - 1 - idx);
      });
      pts.push([x, y]);
    }
    const ys = pts.map((p) => p[1]);
    const lo = Math.min(...ys);
    const hi = Math.max(...ys);

    const sxx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (W - 2 * pad);
    const syy = (y: number) => H - pad - ((y - lo) / (hi - lo)) * (H - 2 * pad);
    const p = pts
      .map((pt, i) => `${i === 0 ? "M" : "L"} ${sxx(pt[0]).toFixed(1)} ${syy(pt[1]).toFixed(1)}`)
      .join(" ");
    return { path: p, ymin: lo, ymax: hi };
  }, [coefs, xmin, xmax]);

  const tieneY0 = ymin <= 0 && ymax >= 0;
  const tieneX0 = xmin <= 0 && xmax >= 0;
  const ejeX = tieneY0 ? sy(0) : H - pad;
  const ejeY = tieneX0 ? sx(0) : pad;

  const xTicks: number[] = [];
  for (let x = Math.ceil(xmin); x <= Math.floor(xmax); x++) xTicks.push(x);

  const pasoY = (ymax - ymin) / 5;
  const yTicks: number[] = [];
  for (let i = 0; i <= 5; i++) {
    yTicks.push(Math.round((ymin + i * pasoY) * 10) / 10);
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Gráfica de la función"
      className="my-3 w-full max-w-md rounded-xl border border-forest/10 bg-white/5 dark:border-white/10"
    >
      <line x1={pad} y1={ejeX} x2={W - pad} y2={ejeX} stroke="currentColor" strokeWidth="1.2" className="text-forest/40 dark:text-white/40" />
      <line x1={ejeY} y1={pad} x2={ejeY} y2={H - pad} stroke="currentColor" strokeWidth="1.2" className="text-forest/40 dark:text-white/40" />

      {ejeX < H - pad && ejeX > pad ? (
        <text x={W - pad} y={ejeX - 5} textAnchor="end" fontSize="11" className="fill-foreground/50">x</text>
      ) : null}
      {ejeY < W - pad && ejeY > pad ? (
        <text x={ejeY + 5} y={pad + 12} fontSize="11" className="fill-foreground/50">y</text>
      ) : null}

      {xTicks.map((t) => (
        <g key={`x${t}`}>
          <line x1={sx(t)} y1={ejeX - 3} x2={sx(t)} y2={ejeX + 3} stroke="currentColor" className="text-forest/40 dark:text-white/40" />
          <text x={sx(t)} y={ejeX + 16} textAnchor="middle" fontSize="10" className="fill-foreground/50">
            {t}
          </text>
        </g>
      ))}

      {yTicks.map((t) => (
        <g key={`y${t}`}>
          <line x1={ejeY - 3} y1={sy(t)} x2={ejeY + 3} y2={sy(t)} stroke="currentColor" className="text-forest/40 dark:text-white/40" />
          <text x={ejeY - 6} y={sy(t) + 3} textAnchor="end" fontSize="10" className="fill-foreground/50">
            {t}
          </text>
        </g>
      ))}

      <path d={path} fill="none" stroke="#2ec27e" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}