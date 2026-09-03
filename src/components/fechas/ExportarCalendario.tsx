"use client";

import { useState } from "react";
import { CalendarPlus, Check, Download } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { generarIcs } from "@/lib/calendar";
import type { EventoFechas } from "@/data/fechas";

export function ExportarCalendario({ eventos }: { eventos: EventoFechas[] }) {
  const [descargado, setDescargado] = useState(false);

  const descargarIcs = () => {
    const ics = generarIcs(eventos);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "calendario-unal-2027-1.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDescargado(true);
  };

  return (
    <div className="glass flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-ocre">
          <CalendarPlus className="h-5 w-5 text-forest-deep" />
        </span>
        <div>
          <h3 className="font-display text-base font-semibold">
            Agrégalo a tu calendario
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-foreground/60">
            Descarga el archivo .ics e impórtalo en Google Calendar:
            Configuración → Importar y exportar → Importar.
          </p>
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        icon={descargado ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
        onClick={descargarIcs}
      >
        {descargado ? "Descargado" : "Exportar a Google Calendar (.ics)"}
      </Button>
    </div>
  );
}