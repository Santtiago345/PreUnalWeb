export type RecursoOficial = {
  titulo: string;
  descripcion: string;
  url: string;
};

/**
 * Recursos oficiales de la UNAL para familiarizarse con la prueba.
 * Fuente: Demostraciones interactivas — Dirección Nacional de Admisiones.
 * Verificado el 02/09/2026.
 */
export const recursosOficiales: RecursoOficial[] = [
  {
    titulo: "Demostración interactiva de la prueba (formato convencional)",
    descripcion:
      "Responde preguntas de ejemplo y conoce la estructura de la prueba de admisión.",
    url: "https://uninscripciones.unal.edu.co/dipa/",
  },
  {
    titulo: "Demostración en formato audiolibro y ampliación de letra",
    descripcion:
      "Versión de la demostración con herramientas de accesibilidad (requiere Firefox y teclado con bloque numérico).",
    url: "https://admisiones.unal.edu.co/tiresias-demo/inicio-de-sesión",
  },
  {
    titulo: "Demostración traducida a lengua de señas colombiana",
    descripcion:
      "Incluye el cuadernillo de la prueba para aspirantes con discapacidad auditiva.",
    url: "http://admisiones.unal.edu.co/demopsdda/",
  },
];

/**
 * La UNAL no publica los exámenes aplicados: el banco de preguntas es
 * reservado (Acuerdo 039 de 1998 del Consejo Superior Universitario).
 */
export const notaBancoReservado =
  "La Universidad Nacional no publica los exámenes de admisión aplicados: el banco de preguntas tiene carácter reservado (Acuerdo 039 de 1998 del Consejo Superior Universitario). Por eso, el recopilatorio de la plataforma contiene material de práctica recopilado y gestionado por el administrador.";