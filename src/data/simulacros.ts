import {
  configSimulacro,
  preguntasMatematicas,
  tiempoTotalDe,
  type SimulacroDef,
} from "@/data/simulacro";
import {
  simulacroGeneralDef,
  TIEMPO_GENERAL_SEGUNDOS,
} from "@/data/simulacroGeneral";

export const simulacroMatematicasDef: SimulacroDef = {
  id: "matematicas",
  titulo: configSimulacro.titulo,
  descripcion: configSimulacro.descripcion,
  componente: "Matemáticas",
  totalPreguntas: configSimulacro.totalPreguntas,
  segundosPorPregunta: configSimulacro.segundosPorPregunta,
  minutosExtra: configSimulacro.minutosExtra,
  preguntas: preguntasMatematicas,
};

export const SIMULACROS: SimulacroDef[] = [
  simulacroMatematicasDef,
  simulacroGeneralDef,
];

export const simulacroPorId = (id: string): SimulacroDef =>
  SIMULACROS.find((s) => s.id === id) ?? simulacroMatematicasDef;

export { tiempoTotalDe, TIEMPO_GENERAL_SEGUNDOS };
