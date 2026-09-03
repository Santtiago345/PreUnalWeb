import type { EventoFechas } from "@/data/fechas";

function toGoogleDate(iso: string) {
  return iso.replaceAll("-", "");
}

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

function escapeIcs(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** URL de Google Calendar con un evento pre-cargado (día completo). */
export function googleCalendarUrl(evento: EventoFechas): string {
  const start = toGoogleDate(evento.fechaInicio);
  const end = toGoogleDate(addDays(evento.fechaFin ?? evento.fechaInicio, 1));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `UNAL · ${evento.nombre}`,
    dates: `${start}/${end}`,
    details: evento.descripcion,
    location: "Universidad Nacional de Colombia",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Archivo .ics con todos los eventos, importable en Google Calendar. */
export function generarIcs(eventos: EventoFechas[]): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PreUnalWeb//Calendario UNAL//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const evento of eventos) {
    const start = toGoogleDate(evento.fechaInicio);
    const end = toGoogleDate(addDays(evento.fechaFin ?? evento.fechaInicio, 1));
    lines.push(
      "BEGIN:VEVENT",
      `UID:${evento.id}@preunalweb`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${escapeIcs(`UNAL · ${evento.nombre}`)}`,
      `DESCRIPTION:${escapeIcs(evento.descripcion)}`,
      `URL:${evento.url}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

const meses = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const dias = [
  "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado",
];

/** "20 de septiembre de 2026" o "6 de julio – 24 de agosto de 2026". */
export function formatoRango(inicio: string, fin?: string) {
  const parse = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return { y, m, d };
  };
  const s = parse(inicio);
  const fechaInicio = new Date(Date.UTC(s.y, s.m - 1, s.d));
  const diaSemana = dias[fechaInicio.getUTCDay()];
  const base =
    s.d === 1 ? `1 de ${meses[s.m - 1]} de ${s.y}` : `${s.d} de ${meses[s.m - 1]} de ${s.y}`;

  if (!fin || fin === inicio) {
    return `${diaSemana}, ${base}`;
  }
  const f = parse(fin);
  const finTexto =
    f.m === s.m ? `${f.d} de ${meses[f.m - 1]} de ${f.y}` : `${f.d} de ${meses[f.m - 1]} de ${f.y}`;
  return `${base} – ${finTexto}`;
}

export function fechaIso(fecha: string) {
  return fecha.replaceAll("-", "");
}

export function fechaActualInicio(): string {
  const d = new Date();
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return iso;
}

export function compararIso(a: string, b: string) {
  return a.localeCompare(b);
}