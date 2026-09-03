"use client";

import { useMemo, useState } from "react";
import { Calculator, Info } from "lucide-react";

import { cn } from "@/lib/utils";

export function CalculadoraCupos() {
  const [cupos, setCupos] = useState<number>(100);

  const adicionales = useMemo(() => Math.ceil(cupos * 0.02), [cupos]);
  const total = cupos + adicionales;

  return (
    <div className="glass flex flex-col gap-5 p-5 sm:p-6">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ocre">
        <Calculator className="h-4 w-4" />
        Calculadora ilustrativa del 2%
      </div>

      <div>
        <label
          htmlFor="cupos-regulares"
          className="text-xs font-semibold uppercase tracking-wider text-foreground/50"
        >
          Cupos regulares del programa
        </label>
        <input
          id="cupos-regulares"
          type="number"
          min={1}
          max={1000}
          value={cupos}
          onChange={(e) =>
            setCupos(Math.max(1, Number(e.target.value) || 1))
          }
          className="mt-2 w-full rounded-xl border border-forest/10 bg-background px-4 py-3 font-mono text-lg font-semibold tabular-nums focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30 dark:border-white/10"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-forest/10 p-3 text-center dark:border-white/10">
          <p className="font-mono text-2xl font-bold tabular-nums">{cupos}</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-foreground/50">
            Regulares
          </p>
        </div>
        <div className="rounded-xl border border-emerald/40 bg-emerald/10 p-3 text-center">
          <p className="font-mono text-2xl font-bold tabular-nums text-emerald">
            +{adicionales}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-emerald">
            Indígenas (2%)
          </p>
        </div>
        <div
          className={cn(
            "rounded-xl p-3 text-center",
            "bg-gradient-to-br from-emerald to-ocre",
          )}
        >
          <p className="font-mono text-2xl font-bold tabular-nums text-forest-deep">
            {total}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-forest-deep">
            Total
          </p>
        </div>
      </div>

      <p className="flex items-start gap-2 text-xs text-foreground/50">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Ejemplo ilustrativo del mecanismo oficial. El número exacto de cupos
        adicionales lo define la Universidad en cada convocatoria.
      </p>
    </div>
  );
}