import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  configSimulacroGeneral,
  lecturaCarta,
  preguntasGeneral,
  TIEMPO_GENERAL_SEGUNDOS,
} from "@/data/simulacroGeneral";
import { SIMULACROS, simulacroPorId } from "@/data/simulacros";
import { calcularResultado } from "@/lib/calificacion";
import type { Respuesta } from "@/lib/calificacion";

// Claves entregadas por el docente (cuadernillo oficial UNAL).
// Imagen: preguntas 8–18 → A,A,C,C,C,A,C,D,B,B,A.
// Lectura: preguntas 17–31 → B,D,C,B,C,A,D,B,A,D,A,D,B,C,A.
const CLAVES_ESPERADAS = [
  0, 0, 2, 2, 2, 0, 2, 3, 1, 1, 0,
  1, 3, 2, 1, 2, 0, 3, 1, 0, 3, 0, 3, 1, 2, 0,
];

describe("Banco del Simulacro General", () => {
  it("tiene 26 preguntas consistentes con su configuración", () => {
    expect(preguntasGeneral.length).toBe(26);
    expect(preguntasGeneral.length).toBe(
      configSimulacroGeneral.totalPreguntas,
    );
  });

  it("ids únicos y consecutivos 1..26", () => {
    const ids = preguntasGeneral.map((p) => p.id);
    expect(new Set(ids).size).toBe(26);
    expect(Math.min(...ids)).toBe(1);
    expect(Math.max(...ids)).toBe(26);
  });

  it("las claves coinciden con las entregadas (imagen 8–18 + lectura 17–31)", () => {
    expect(preguntasGeneral.map((p) => p.correcta)).toEqual(
      CLAVES_ESPERADAS,
    );
  });

  it("11 de imagen con PNG existente y 15 de lectura con referencia válida", () => {
    const imagen = preguntasGeneral.filter((p) => p.imagen);
    const lectura = preguntasGeneral.filter((p) => p.lecturaId);
    expect(imagen.length).toBe(11);
    expect(lectura.length).toBe(15);
    for (const p of imagen) {
      expect(p.opciones).toEqual(["A", "B", "C", "D"]);
      const ruta = join(
        process.cwd(),
        "public",
        p.imagen!.replace(/^\//, ""),
      );
      expect(existsSync(ruta), `falta imagen ${p.imagen}`).toBe(true);
      expect(p.imagenAlt!.length).toBeGreaterThan(0);
    }
    for (const p of lectura) {
      expect(p.lecturaId).toBe(lecturaCarta.id);
      expect(p.opciones.length).toBe(4);
    }
  });

  it("la lectura compartida tiene título, párrafos y fuente", () => {
    expect(lecturaCarta.titulo.length).toBeGreaterThan(0);
    expect(lecturaCarta.parrafos.length).toBeGreaterThanOrEqual(2);
    expect(lecturaCarta.parrafos.join(" ").length).toBeGreaterThan(1000);
  });

  it("cada pregunta tiene tema, nivel y explicación no vacíos", () => {
    for (const p of preguntasGeneral) {
      expect(p.tema.trim().length).toBeGreaterThan(0);
      expect(["fácil", "media", "difícil"]).toContain(p.nivel);
      expect(p.explicacion.trim().length).toBeGreaterThan(0);
      expect(p.detalle.trim().length).toBeGreaterThan(0);
      expect(p.enunciado.trim().length).toBeGreaterThan(0);
    }
  });

  it("sin $ sueltos que rompan el render de ecuaciones", () => {
    for (const p of preguntasGeneral) {
      const textos = [
        p.enunciado,
        ...p.opciones,
        p.explicacion,
        p.detalle,
      ];
      for (const t of textos) {
        const dolares = (t.match(/\$/g) ?? []).length;
        expect(dolares % 2).toBe(0);
      }
    }
  });

  it("tiempo total = 26 × 105 s + 5 min extra", () => {
    expect(TIEMPO_GENERAL_SEGUNDOS).toBe(26 * 105 + 5 * 60);
    expect(TIEMPO_GENERAL_SEGUNDOS).toBe(3030);
  });
});

describe("Registro de simulacros", () => {
  it("expone matemáticas + general y resuelve por id", () => {
    expect(SIMULACROS.map((s) => s.id)).toEqual([
      "matematicas",
      "general",
    ]);
    expect(simulacroPorId("general").preguntas.length).toBe(26);
    expect(simulacroPorId("matematicas").preguntas.length).toBe(25);
    expect(simulacroPorId("inexistente").id).toBe("matematicas");
  });
});

describe("Calificación con banco general", () => {
  function respuestas(todasBien: boolean): Respuesta[] {
    return preguntasGeneral.map((p) => ({
      pregunta: p.id,
      seleccion: todasBien ? p.correcta : (p.correcta + 1) % 4,
      correcta: todasBien,
    }));
  }

  it("todas correctas → theta 3 y total 26", () => {
    const r = calcularResultado(respuestas(true), 0, preguntasGeneral);
    expect(r.correctas).toBe(26);
    expect(r.total).toBe(26);
    expect(r.theta).toBe(3);
    expect(r.puntajeComponente).toBe(13);
  });

  it("ninguna correcta → theta -3 y total 26", () => {
    const r = calcularResultado(respuestas(false), 0, preguntasGeneral);
    expect(r.correctas).toBe(0);
    expect(r.total).toBe(26);
    expect(r.theta).toBe(-3);
  });

  it("el banco de matemáticas sigue calificando igual (compatibilidad)", () => {
    const r = calcularResultado(
      preguntasGeneral.map(() => ({
        pregunta: 999,
        seleccion: -1,
        correcta: true,
      })),
      0,
    );
    // ids desconocidos → dificultad 0, pero no rompe
    expect(Number.isFinite(r.puntajeComponente)).toBe(true);
  });
});
