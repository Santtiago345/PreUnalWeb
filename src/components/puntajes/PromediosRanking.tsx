import { Reveal } from "@/components/ui/Reveal";
import { puntajesPorPrograma } from "@/data/puntajes";
import { cn } from "@/lib/utils";

type Fila = {
  nombre: string;
  area: string;
  promedio: number;
  anios: number;
};

function areaTone(area: string) {
  const map: Record<string, string> = {
    Salud: "bg-emerald/15 text-emerald border-emerald/30",
    Ingeniería: "bg-lagoon/15 text-lagoon border-lagoon/30",
    "Ciencias básicas": "bg-ocre/15 text-ocre border-ocre/30",
    "Sociales y humanidades": "bg-terracotta/15 text-terracotta border-terracotta/30",
    "Artes y diseño": "bg-sage/15 text-sage border-sage/30",
  };
  return map[area] ?? "bg-white/10 text-foreground/70 border-white/15";
}

export function PromediosRanking() {
  const filas: Fila[] = puntajesPorPrograma
    .map((p) => {
      const peso = p.series.reduce((acc, s) => acc + (s.admitidos ?? 1), 0);
      const total = p.series.reduce(
        (acc, s) => acc + s.corte * (s.admitidos ?? 1),
        0,
      );
      return {
        nombre: p.nombre,
        area: p.area,
        promedio: peso ? total / peso : 0,
        anios: p.series.length,
      };
    })
    .sort((a, b) => b.promedio - a.promedio);

  const maximo = filas[0]?.promedio ?? 1;

  return (
    <div className="grid gap-3">
      {filas.map((fila, index) => (
        <Reveal key={fila.nombre} delay={Math.min(index * 0.02, 0.3)}>
          <div className="glass flex items-center gap-3 p-4">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold",
                index < 3 ? "bg-gradient-to-br from-emerald to-ocre text-forest-deep" : "bg-white/5 text-foreground/60",
              )}
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold">{fila.nombre}</p>
                <p className="font-mono text-sm font-bold tabular-nums text-emerald">
                  {fila.promedio.toLocaleString("es-CO", { maximumFractionDigits: 1 })}
                </p>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald to-ocre transition-all"
                  style={{ width: `${Math.max(4, (fila.promedio / maximo) * 100)}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-foreground/50">
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-medium",
                    areaTone(fila.area),
                  )}
                >
                  {fila.area}
                </span>
                <span>{fila.anios} semestres</span>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}