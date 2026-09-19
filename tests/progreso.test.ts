import { beforeEach, describe, expect, it } from "vitest";

import {
  borrarProgreso,
  cargarProgreso,
  estadoInicialDesdeGuardado,
  estadoInicialFresco,
  guardarProgreso,
  restantesDe,
  type ProgresoGuardado,
} from "@/lib/progresoSimulacro";

// localStorage en memoria para el entorno node de vitest
function instalarStorage() {
  const datos = new Map<string, string>();
  (globalThis as Record<string, unknown>).window = {
    localStorage: {
      getItem: (k: string) => (datos.has(k) ? datos.get(k)! : null),
      setItem: (k: string, v: string) => {
        datos.set(k, v);
      },
      removeItem: (k: string) => {
        datos.delete(k);
      },
    },
  };
  return datos;
}

describe("Persistencia del progreso (recuperación ante errores)", () => {
  beforeEach(() => {
    instalarStorage();
  });

  it("guarda y recupera respuestas, faltas y sesión", () => {
    guardarProgreso({
      simulacroId: "matematicas",
      nombre: "Ana",
      sesionId: "abc-123",
      respuestas: { 1: 2, 5: 0, 12: 3 },
      faltas: 1,
      finTimestamp: Date.now() + 100000,
      guardadoEn: 0,
    });
    const g = cargarProgreso("matematicas");
    expect(g).not.toBeNull();
    expect(g!.nombre).toBe("Ana");
    expect(g!.sesionId).toBe("abc-123");
    expect(g!.respuestas).toEqual({ 1: 2, 5: 0, 12: 3 });
    expect(g!.faltas).toBe(1);
  });

  it("no mezcla progresos de distintos simulacros", () => {
    guardarProgreso({
      simulacroId: "matematicas",
      nombre: "Ana",
      sesionId: null,
      respuestas: { 1: 0 },
      faltas: 0,
      finTimestamp: Date.now() + 100000,
      guardadoEn: 0,
    });
    expect(cargarProgreso("general")).toBeNull();
    expect(cargarProgreso("matematicas")).not.toBeNull();
  });

  it("devuelve null si no hay nada, está corrupto o es de otro simulacro", () => {
    expect(cargarProgreso("matematicas")).toBeNull();
    const w = (globalThis as Record<string, unknown>).window as {
      localStorage: { setItem: (k: string, v: string) => void };
    };
    w.localStorage.setItem("simulacro-matematicas-progreso", "no-json{{{");
    expect(cargarProgreso("matematicas")).toBeNull();
  });

  it("borrar elimina el progreso", () => {
    guardarProgreso({
      simulacroId: "general",
      nombre: "Luis",
      sesionId: null,
      respuestas: {},
      faltas: 0,
      finTimestamp: Date.now() + 100000,
      guardadoEn: 0,
    });
    expect(cargarProgreso("general")).not.toBeNull();
    borrarProgreso("general");
    expect(cargarProgreso("general")).toBeNull();
  });

  it("restantesDe: futuro positivo, pasado 0 (reloj no se pausa)", () => {
    expect(restantesDe(Date.now() + 60000)).toBeGreaterThan(50);
    expect(restantesDe(Date.now() - 1000)).toBe(0);
  });

  it("estadoInicialFresco crea deadline futuro con el total", () => {
    const e = estadoInicialFresco(2925);
    expect(e.segundosIniciales).toBe(2925);
    expect(e.finTimestamp).toBeGreaterThan(Date.now());
    expect(e.respuestas).toEqual({});
    expect(e.faltas).toBe(0);
  });

  it("estadoInicialDesdeGuardado conserva respuestas y recalcula restante", () => {
    const g: ProgresoGuardado = {
      simulacroId: "general",
      nombre: "Luis",
      sesionId: "s-1",
      respuestas: { 2: 1, 9: 3 },
      faltas: 2,
      finTimestamp: Date.now() + 120000,
      guardadoEn: 0,
    };
    const e = estadoInicialDesdeGuardado(g);
    expect(e.respuestas).toEqual({ 2: 1, 9: 3 });
    expect(e.faltas).toBe(2);
    expect(e.finTimestamp).toBe(g.finTimestamp);
    expect(e.segundosIniciales).toBeGreaterThan(100);
  });
});