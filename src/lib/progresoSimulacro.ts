/**
 * Persistencia local del progreso del simulacro (localStorage).
 * Permite recuperar respuestas, faltas y tiempo si el estudiante sale,
 * recarga o el navegador falla. La clave incluye el id del simulacro para
 * no mezclar progresos de Matemáticas y General.
 */

export type ProgresoGuardado = {
  simulacroId: string;
  nombre: string;
  sesionId: string | null;
  respuestas: Record<number, number>;
  faltas: number;
  /** Instante absoluto (ms) en que se agota el tiempo. El reloj no se pausa. */
  finTimestamp: number;
  guardadoEn: number;
};

export function claveProgreso(simulacroId: string) {
  return `simulacro-${simulacroId}-progreso`;
}

function almacenamientoDisponible() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function guardarProgreso(p: ProgresoGuardado) {
  if (!almacenamientoDisponible()) return;
  try {
    window.localStorage.setItem(
      claveProgreso(p.simulacroId),
      JSON.stringify({ ...p, guardadoEn: Date.now() }),
    );
  } catch {
    // almacenamiento lleno o bloqueado: no interrumpe el examen
  }
}

export function cargarProgreso(simulacroId: string): ProgresoGuardado | null {
  if (!almacenamientoDisponible()) return null;
  try {
    const crudo = window.localStorage.getItem(claveProgreso(simulacroId));
    if (!crudo) return null;
    const p = JSON.parse(crudo) as Partial<ProgresoGuardado>;
    if (
      typeof p !== "object" ||
      p === null ||
      p.simulacroId !== simulacroId ||
      typeof p.nombre !== "string" ||
      typeof p.finTimestamp !== "number" ||
      typeof p.respuestas !== "object" ||
      p.respuestas === null
    ) {
      return null;
    }
    return {
      simulacroId: p.simulacroId,
      nombre: p.nombre,
      sesionId: typeof p.sesionId === "string" ? p.sesionId : null,
      respuestas: p.respuestas as Record<number, number>,
      faltas: typeof p.faltas === "number" ? p.faltas : 0,
      finTimestamp: p.finTimestamp,
      guardadoEn: typeof p.guardadoEn === "number" ? p.guardadoEn : 0,
    };
  } catch {
    return null;
  }
}

export function borrarProgreso(simulacroId: string) {
  if (!almacenamientoDisponible()) return;
  try {
    window.localStorage.removeItem(claveProgreso(simulacroId));
  } catch {
    // ignorar
  }
}

/** Segundos restantes según el instante absoluto de fin (0 si venció). */
export function restantesDe(finTimestamp: number, ahora = Date.now()) {
  return Math.max(0, Math.round((finTimestamp - ahora) / 1000));
}

export type EstadoInicialExamen = {
  respuestas: Record<number, number>;
  faltas: number;
  finTimestamp: number;
  segundosIniciales: number;
};

/** Estado inicial para un examen nuevo (llamar desde manejadores, no en render). */
export function estadoInicialFresco(totalSegundos: number): EstadoInicialExamen {
  const fin = Date.now() + totalSegundos * 1000;
  return {
    respuestas: {},
    faltas: 0,
    finTimestamp: fin,
    segundosIniciales: totalSegundos,
  };
}

/** Estado inicial para continuar un progreso guardado. */
export function estadoInicialDesdeGuardado(g: ProgresoGuardado): EstadoInicialExamen {
  return {
    respuestas: g.respuestas,
    faltas: g.faltas,
    finTimestamp: g.finTimestamp,
    segundosIniciales: restantesDe(g.finTimestamp),
  };
}