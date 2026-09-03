export type TonoComponente =
  | "ocre"
  | "emerald"
  | "lagoon"
  | "terracotta"
  | "sage";

export type Componente = {
  id: string;
  nombre: string;
  areas: string[] | null;
  preguntas: number;
  descripcion: string | null;
  tono: TonoComponente;
};

export type Fuente = {
  titulo: string;
  url: string;
};

/**
 * Información oficial de la Prueba de Admisión de la Universidad Nacional
 * de Colombia. Fuente: Dirección Nacional de Admisiones — admisiones.unal.edu.co
 * Verificado el 02/09/2026.
 */
export const examen = {
  lema:
    "Cinco componentes, ciento veinte preguntas de opción múltiple y tres horas y media para resolverla.",
  resumen: {
    componentes: 5,
    preguntas: 120,
    tiempo: "3 h 30 min",
    tiempoMin: 210,
    promedioPorPregunta: "1 min 45 s",
  },
  descripcion: [
    "La Universidad Nacional de Colombia realiza anualmente dos procesos de admisión de aspirantes.",
    "Para elegir el grupo de nuevos estudiantes en cada proceso, se realiza una evaluación que rastrea el nivel de comprensión de los conceptos básicos que se requieren para adelantar estudios universitarios. Esta comprensión se evidencia en el reconocimiento y uso significativo de las estructuras y códigos propios de la matemática, las ciencias naturales, las ciencias sociales y las artes.",
    "El reconocimiento y uso significativo se demuestra en la interacción con textos y contextos, y en el planteamiento y en la solución de problemas para los que ese saber es pertinente. Por esto, para desarrollar la evaluación se utilizan textos, gráficas, problemas contextualizados e imágenes de diferente tipo.",
  ],
  componentes: [
    {
      id: "analisis-textual",
      nombre: "Análisis textual",
      areas: null,
      preguntas: 25,
      descripcion:
        "Mediante textos de tipo referencial (ciencias naturales, ciencias humanas, tecnología y artes) o de tipo poético-literario (poemas, cuentos, fragmentos de novelas, ensayos o crónicas), se indaga su comprensión e interpretación en los niveles literal, inferencial y crítico-intertextual, con énfasis en los dos últimos.",
      tono: "ocre",
    },
    {
      id: "matematicas",
      nombre: "Matemáticas",
      areas: [
        "Pensamiento numérico",
        "Pensamiento espacial y métrico",
        "Pensamiento aleatorio",
        "Pensamiento variacional",
      ],
      preguntas: 25,
      descripcion:
        "A través de problemas contextualizados se explora el nivel de apropiación y comprensión de los conceptos básicos de las áreas examinadas, estimulando la reflexión mediante reconocimiento, interpretación y aplicación de conceptos. Con gráficas, tablas u otro tipo de esquema que representan conceptos y procesos, se estimula su interpretación para reconocer habilidades cognitivas como el análisis, la síntesis y la deducción.",
      tono: "emerald",
    },
    {
      id: "ciencias-naturales",
      nombre: "Ciencias Naturales",
      areas: ["Física", "Química", "Biología"],
      preguntas: 25,
      descripcion: null,
      tono: "lagoon",
    },
    {
      id: "ciencias-sociales",
      nombre: "Ciencias Sociales",
      areas: ["Geografía", "Historia", "Filosofía"],
      preguntas: 25,
      descripcion: null,
      tono: "terracotta",
    },
    {
      id: "analisis-de-la-imagen",
      nombre: "Análisis de la imagen",
      areas: null,
      preguntas: 20,
      descripcion:
        "Apoyados en imágenes de diferente tipo, se formulan problemas orientados al reconocimiento de la constancia de las formas, de movimientos y transformaciones, de intencionalidades, de relaciones de causalidad lógica y de asociación semántica entre imagen y palabra.",
      tono: "sage",
    },
  ] satisfies Componente[],
  calificacion: [
    "Una vez se aplica la prueba y se organizan las hojas de respuestas de todos los aspirantes, tiene lugar el proceso de lectura y calificación.",
    "La calificación se realiza con base en la Teoría de Respuesta al Ítem y se utiliza el modelo de Rasch, que incorpora la dificultad del ítem. Para cada aspirante se obtiene un nivel de habilidad en cada componente evaluado.",
    "La habilidad corresponde a la probabilidad que tiene el aspirante de responder correctamente un ítem con un determinado nivel de dificultad. Esta metodología permite una mejor estimación de la habilidad y proporciona información estadística de la prueba.",
    "Para cada componente, la habilidad se estandariza con una media en 10 y una desviación de 1.",
    "La habilidad total se consolida con base en las habilidades obtenidas en los componentes y se estandariza con media en 500 y desviación en 100. Este puntaje total estandarizado es el que se tiene en cuenta en el proceso de admisión.",
  ],
  clasificacion: [
    {
      titulo: "Clasificación en matemáticas",
      texto:
        "Tiene en cuenta el programa curricular al que fue admitido y el puntaje obtenido en el componente de matemáticas. El curso de Matemáticas Básicas permite mejorar las habilidades matemáticas del nuevo estudiante.",
    },
    {
      titulo: "Clasificación en lecto-escritura",
      texto:
        "Tiene en cuenta la Sede a la que fue admitido y el puntaje obtenido en los componentes de análisis textual y ciencias sociales. El curso de nivelación fortalece las competencias comunicativas.",
    },
  ],
  normativa: {
    titulo:
      "Resolución 11 de 2025 de la Vicerrectoría Académica — reglamenta la admisión a los programas curriculares de pregrado",
    url: "https://legal.unal.edu.co/rlunal/home/doc.jsp?d_i=113211",
  },
  fuentes: [
    {
      titulo: "Prueba de Admisión — Dirección Nacional de Admisiones",
      url: "https://admisiones.unal.edu.co/pregrado/prueba-de-admision/",
    },
    {
      titulo: "Preguntas frecuentes — Pregrado (duración: 3 h 30 min)",
      url: "https://admisiones.unal.edu.co/pregrado/preguntas-frecuentes-pregrado/",
    },
    {
      titulo: "Guía paso a paso para la convocatoria de pregrado",
      url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
    },
    {
      titulo: "Resolución 11 de 2025 de la Vicerrectoría Académica",
      url: "https://legal.unal.edu.co/rlunal/home/doc.jsp?d_i=113211",
    },
  ],
};

export const TIEMPO_TOTAL_NOTA =
  "La Universidad no publica tiempos por componente. El tiempo máximo total es de 3 h 30 min (210 minutos); el promedio por pregunta (1 min 45 s) es un valor derivado de las cifras oficiales.";