"use client";

export type GraficoPolinomio = {
  coefs: number[];
  dominio: [number, number];
};

export function Grafico({ coefs, dominio }: GraficoPolinomio) {
  const [xmin, xmax] = dominio;
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
  const ymin = Math.min(...ys);
  const ymax = Math.max(...ys);

  const W = 360;
  const H = 280;
  const pad = 34;
  const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (W - 2 * pad);
  const sy = (y: number) => H - pad - ((y - ymin) / (ymax - ymin)) * (H - 2 * pad);

  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p[0]).toFixed(1)} ${sy(p[1]).toFixed(1)}`)
    .join(" ");

  const tieneY0 = ymin <= 0 && ymax >= 0;
  const tieneX0 = xmin <= 0 && xmax >= 0;
  const ejeX = tieneY0 ? sy(0) : H - pad;
  const ejeY = tieneX0 ? sx(0) : pad;

  // Ticks para el eje x
  const xTicks: number[] = [];
  for (let x = Math.ceil(xmin); x <= Math.floor(xmax); x++) xTicks.push(x);

  // Ticks "bonitos" para el eje y (paso redondeado)
  const pasoY = (ymax - ymin) / 5;
  const yTicks: number[] = [];
  for (let i = 0; i <= 5; i++) {
    const v = ymin + i * pasoY;
    yTicks.push(Math.round(v * 10) / 10);
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Gráfica de la función y = x^5 - x^3 - 2x + 1"
      className="my-3 w-full max-w-md rounded-xl border border-forest/10 bg-white/5 dark:border-white/10"
    >
      {/* ejes */}
      <line x1={pad} y1={ejeX} x2={W - pad} y2={ejeX} stroke="currentColor" strokeWidth="1.2" className="text-forest/40 dark:text-white/40" />
      <line x1={ejeY} y1={pad} x2={ejeY} y2={H - pad} stroke="currentColor" strokeWidth="1.2" className="text-forest/40 dark:text-white/40" />

      {/* marca de ejes */}
      {ejeX < H - pad && ejeX > pad ? (
        <text x={W - pad} y={ejeX - 5} textAnchor="end" fontSize="11" className="fill-foreground/50">x</text>
      ) : null}
      {ejeY < W - pad && ejeY > pad ? (
        <text x={ejeY + 5} y={pad + 12} fontSize="11" className="fill-foreground/50">y</text>
      ) : null}

      {/* ticks x */}
      {xTicks.map((t) => (
        <g key={`x${t}`}>
          <line x1={sx(t)} y1={ejeX - 3} x2={sx(t)} y2={ejeX + 3} stroke="currentColor" className="text-forest/40 dark:text-white/40" />
          <text x={sx(t)} y={ejeX + 16} textAnchor="middle" fontSize="10" className="fill-foreground/50">
            {t}
          </text>
        </g>
      ))}

      {/* ticks y */}
      {yTicks.map((t) => (
        <g key={`y${t}`}>
          <line x1={ejeY - 3} y1={sy(t)} x2={ejeY + 3} y2={sy(t)} stroke="currentColor" className="text-forest/40 dark:text-white/40" />
          <text x={ejeY - 6} y={sy(t) + 3} textAnchor="end" fontSize="10" className="fill-foreground/50">
            {t}
          </text>
        </g>
      ))}

      {/* curva */}
      <path d={path} fill="none" stroke="#2ec27e" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}