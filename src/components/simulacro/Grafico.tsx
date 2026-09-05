"use client";

export type GraficoPolinomio = {
  coefs: number[];
  dominio: [number, number];
};

export function Grafico({ coefs, dominio }: GraficoPolinomio) {
  const [xmin, xmax] = dominio;
  const n = 220;
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

  const W = 340;
  const H = 250;
  const pad = 26;
  const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (W - 2 * pad);
  const sy = (y: number) => H - pad - ((y - ymin) / (ymax - ymin)) * (H - 2 * pad);

  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p[0]).toFixed(1)} ${sy(p[1]).toFixed(1)}`)
    .join(" ");

  const tieneY0 = ymin <= 0 && ymax >= 0;
  const tieneX0 = xmin <= 0 && xmax >= 0;
  const ejeX = tieneY0 ? sy(0) : H - pad;
  const ejeY = tieneX0 ? sx(0) : pad;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Gráfica de la función"
      className="my-3 w-full max-w-sm rounded-xl border border-forest/10 bg-white/5 dark:border-white/10"
    >
      <rect x="0" y="0" width={W} height={H} fill="transparent" />
      {/* ejes */}
      <line x1={pad} y1={ejeX} x2={W - pad} y2={ejeX} stroke="currentColor" strokeWidth="1.2" className="text-forest/40 dark:text-white/40" />
      <line x1={ejeY} y1={pad} x2={ejeY} y2={H - pad} stroke="currentColor" strokeWidth="1.2" className="text-forest/40 dark:text-white/40" />
      {/* curva */}
      <path d={path} fill="none" stroke="#2ec27e" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}