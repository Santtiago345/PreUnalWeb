import { describe, expect, it } from "vitest";

import { preguntasMatematicas, configSimulacro } from "@/data/simulacro";
import { eventosFechas, convocatoria } from "@/data/fechas";
import { examen } from "@/data/examen";
import { puntajesPorPrograma } from "@/data/puntajes";

describe("Banco de preguntas del simulacro", () => {
  it("tiene exactamente 25 preguntas (configuración consistente)", () => {
    expect(preguntasMatematicas.length).toBe(configSimulacro.totalPreguntas);
    expect(preguntasMatematicas.length).toBe(25);
  });

  it("ids únicos y consecutivos 1..25", () => {
    const ids = preguntasMatematicas.map((p) => p.id);
    expect(new Set(ids).size).toBe(25);
    expect(Math.min(...ids)).toBe(1);
    expect(Math.max(...ids)).toBe(25);
  });

  it("cada pregunta tiene 4 opciones y respuesta válida 0-3", () => {
    for (const p of preguntasMatematicas) {
      expect(p.opciones.length).toBe(4);
      expect(p.correcta).toBeGreaterThanOrEqual(0);
      expect(p.correcta).toBeLessThanOrEqual(3);
      expect(p.enunciado.trim().length).toBeGreaterThan(0);
    }
  });

  it("cada pregunta tiene tema, nivel y explicación no vacíos", () => {
    for (const p of preguntasMatematicas) {
      expect(p.tema.trim().length).toBeGreaterThan(0);
      expect(["fácil", "media", "difícil"]).toContain(p.nivel);
      expect(p.explicacion.trim().length).toBeGreaterThan(0);
      expect(p.detalle.trim().length).toBeGreaterThan(0);
    }
  });

  it("los enunciados/opciones no tienen pares $ sueltos que rompan el render (bug de moneda)", () => {
    for (const p of preguntasMatematicas) {
      // 'formula' se renderiza con KaTeX display y usa \$ legítimamente
      const textos = [p.enunciado, ...p.opciones, p.explicacion, p.detalle];
      for (const t of textos) {
        const dolares = (t.match(/\$/g) ?? []).length;
        // Un $ de moneda suelto (impar) rompería el renderizador de ecuaciones
        expect(dolares % 2).toBe(0);
      }
    }
  });

  it("tema = una de las 4 áreas oficiales del componente", () => {
    const areas = [
      "Pensamiento numérico",
      "Espacial y métrico",
      "Pensamiento aleatorio",
      "Pensamiento variacional",
    ];
    for (const p of preguntasMatematicas) {
      expect(areas).toContain(p.tema);
    }
  });

  it("distribución de niveles es mayormente fácil con algo de media/difícil", () => {
    const faciles = preguntasMatematicas.filter((p) => p.nivel === "fácil").length;
    const noFaciles = preguntasMatematicas.length - faciles;
    expect(faciles).toBeGreaterThan(10);
    expect(noFaciles).toBeGreaterThanOrEqual(1);
  });
});

describe("Fechas importantes", () => {
  it("tiene 11 hitos y convocatoria definida", () => {
    expect(eventosFechas.length).toBe(11);
    expect(convocatoria.nombre).toContain("2027");
  });

  it("fechas en orden cronológico y con formato YYYY-MM-DD", () => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    for (const e of eventosFechas) {
      expect(re.test(e.fechaInicio)).toBe(true);
      if (e.fechaFin) expect(re.test(e.fechaFin)).toBe(true);
    }
    for (let i = 1; i < eventosFechas.length; i++) {
      const previo = eventosFechas[i - 1].fechaInicio;
      const actual = eventosFechas[i].fechaInicio;
      expect(actual >= previo).toBe(true);
    }
  });
});

describe("Datos del examen", () => {
  it("120 preguntas, 3 h 30 min y 5 componentes", () => {
    expect(examen.resumen.preguntas).toBe(120);
    expect(examen.resumen.tiempoMin).toBe(210);
    expect(examen.componentes.length).toBe(5);
  });

  it("la suma de preguntas por componente = 120", () => {
    const suma = examen.componentes.reduce((a, c) => a + c.preguntas, 0);
    expect(suma).toBe(120);
  });
});

describe("Puntajes históricos", () => {
  it("los programas tienen series con años desde 2015", () => {
    expect(puntajesPorPrograma.length).toBeGreaterThan(40);
    for (const p of puntajesPorPrograma) {
      expect(p.series.length).toBeGreaterThan(0);
      expect(p.series[0].anio).toBeGreaterThanOrEqual(2015);
      for (const s of p.series) {
        expect(s.corte).toBeGreaterThan(0);
        expect(s.corte).toBeLessThan(1000);
      }
    }
  });
});