import { dificultadDe, preguntasMatematicas } from "@/data/simulacro";

export type Respuesta = {
  pregunta: number;
  seleccion: number;
  correcta: boolean;
};

/**
 * Estimación de habilidad (θ) con el modelo de Rasch (Teoría de Respuesta
 * al Ítem), el mismo enfoque que usa la UNAL para calificar la prueba.
 * P(correcta) = 1 / (1 + e^-(θ − b)), donde b es la dificultad del ítem.
 */
export function estimarTheta(
  respuestas: { correcta: boolean; b: number }[],
): number {
  if (respuestas.length === 0) return 0;
  if (respuestas.every((r) => r.correcta)) return 3;
  if (respuestas.every((r) => !r.correcta)) return -3;

  let theta = 0;
  for (let iter = 0; iter < 60; iter++) {
    let score = 0;
    let info = 0;
    for (const r of respuestas) {
      const p = 1 / (1 + Math.exp(-(theta - r.b)));
      score += (r.correcta ? 1 : 0) - p;
      info += p * (1 - p);
    }
    if (info === 0) break;
    const paso = score / info;
    theta += paso;
    if (Math.abs(paso) < 1e-6) break;
  }
  return Math.max(-3, Math.min(3, theta));
}

export type ResultadoSimulacro = {
  correctas: number;
  total: number;
  porcentaje: number;
  theta: number;
  puntajeComponente: number;
};

/**
 * Puntaje del componente de Matemáticas en la escala de la UNAL
 * (media 10, desviación 1). El valor reportado es 10 + θ, como hace la
 * Universidad al estandarizar la habilidad del componente.
 */
export function calcularResultado(respuestas: Respuesta[]): ResultadoSimulacro {
  const correctas = respuestas.filter((r) => r.correcta).length;
  const total = preguntasMatematicas.length;

  const items = respuestas.map((r) => {
    const pregunta = preguntasMatematicas.find((p) => p.id === r.pregunta);
    return {
      correcta: r.correcta,
      b: pregunta ? dificultadDe(pregunta.nivel) : 0,
    };
  });

  const theta = estimarTheta(items);
  const puntajeComponente = Math.max(
    0,
    Math.min(20, Math.round((10 + theta) * 10) / 10),
  );

  return {
    correctas,
    total,
    porcentaje: Math.round((correctas / total) * 100),
    theta: Math.round(theta * 100) / 100,
    puntajeComponente,
  };
}