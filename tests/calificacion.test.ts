import { describe, expect, it } from "vitest";

import {
  calcularResultado,
  estimarTheta,
  penalizacionPorFaltas,
  MAX_PENALIZACION,
  PENALIZACION_POR_FALTA,
} from "@/lib/calificacion";
import { preguntasMatematicas, TIEMPO_TOTAL_SEGUNDOS } from "@/data/simulacro";
import type { Respuesta } from "@/lib/calificacion";

function todas(respuesta: boolean[]): Respuesta[] {
  return preguntasMatematicas.map((p, i) => ({
    pregunta: p.id,
    seleccion: respuesta[i] ? p.correcta : -1,
    correcta: respuesta[i],
  }));
}

describe("Calificación (modelo Rasch + escala 10±1)", () => {
  it("todas correctas → puntaje alto (13) y theta 3", () => {
    const r = calcularResultado(todas(Array(25).fill(true)));
    expect(r.correctas).toBe(25);
    expect(r.theta).toBe(3);
    expect(r.puntajeComponente).toBe(13);
  });

  it("ninguna correcta → puntaje mínimo 7 y theta -3", () => {
    const r = calcularResultado(todas(Array(25).fill(false)));
    expect(r.correctas).toBe(0);
    expect(r.theta).toBe(-3);
    expect(r.puntajeComponente).toBe(7);
  });

  it("media de correctas (13) → puntaje cerca de 10", () => {
    const correctas = Array(25).fill(false).map((_, i) => i < 13);
    const r = calcularResultado(todas(correctas));
    expect(r.correctas).toBe(13);
    expect(r.puntajeComponente).toBeGreaterThanOrEqual(9);
    expect(r.puntajeComponente).toBeLessThanOrEqual(11);
  });

  it("el puntaje siempre está en [0,20] y es finito", () => {
    for (let n = 0; n <= 25; n++) {
      const correctas = Array(25).fill(false).map((_, i) => i < n);
      const r = calcularResultado(todas(correctas));
      expect(Number.isFinite(r.puntajeComponente)).toBe(true);
      expect(r.puntajeComponente).toBeGreaterThanOrEqual(0);
      expect(r.puntajeComponente).toBeLessThanOrEqual(20);
    }
  });
});

describe("Penalización por salida de pestaña", () => {
  it("0 faltas → sin penalización ni posible fraude", () => {
    const r = calcularResultado(todas(Array(25).fill(true)), 0);
    expect(r.penalizacion).toBe(0);
    expect(r.posibleFraude).toBe(false);
    expect(r.puntajeComponente).toBe(r.puntajeBruto);
  });

  it("1 falta → -0,5 puntos", () => {
    expect(penalizacionPorFaltas(1)).toBe(PENALIZACION_POR_FALTA);
  });

  it("3 faltas → -1,5 y se marca posible fraude", () => {
    expect(penalizacionPorFaltas(3)).toBeCloseTo(1.5);
    const r = calcularResultado(todas(Array(25).fill(true)), 3);
    expect(r.posibleFraude).toBe(true);
    expect(r.puntajeComponente).toBeCloseTo(13 - 1.5);
  });

  it("4+ faltas → tope -2,0", () => {
    expect(penalizacionPorFaltas(4)).toBe(MAX_PENALIZACION);
    expect(penalizacionPorFaltas(20)).toBe(MAX_PENALIZACION);
  });
});

describe("Configuración del simulacro", () => {
  it("el tiempo total = 25 preguntas × 105 s + 5 min extra", () => {
    expect(TIEMPO_TOTAL_SEGUNDOS).toBe(25 * 105 + 5 * 60);
    expect(TIEMPO_TOTAL_SEGUNDOS).toBe(2925);
  });
});

describe("Rendimiento en sesión larga (simulación)", () => {
  it("3000 tics + 25 respuestas se procesan en menos de 2 s (regresión de rendimiento)", () => {
    const inicio = Date.now();
    // Simula una sesión completa: 3000 tics de cronómetro (~50 min) con
    // procesamiento de respuestas y cálculo de resultado repetido.
    let respuestas: Respuesta[] = [];
    for (let tick = 0; tick < 3000; tick++) {
      if (tick < 25) {
        respuestas = todas(Array(25).fill(true));
      }
      if (tick % 200 === 0) {
        // El estado se "actualiza" con frecuencia como en el render
        void calcularResultado(respuestas, tick % 10);
      }
    }
    const duracion = Date.now() - inicio;
    expect(duracion).toBeLessThan(2000);
  });

  it("estimarTheta converge (no NaN) para patrones aleatorios", () => {
    for (let i = 0; i < 200; i++) {
      const items = Array.from({ length: 25 }, () => ({
        correcta: Math.random() > 0.5,
        b: Math.round((Math.random() * 4 - 2) * 100) / 100,
      }));
      const theta = estimarTheta(items);
      expect(Number.isFinite(theta)).toBe(true);
      expect(theta).toBeGreaterThanOrEqual(-3);
      expect(theta).toBeLessThanOrEqual(3);
    }
  });
});