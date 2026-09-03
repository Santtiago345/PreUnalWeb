export type EventoFechas = {
  id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  url: string;
};

export const convocatoria = {
  nombre: "Convocatoria pregrado 2027-1",
  periodo: "Primer periodo académico de 2027",
  url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
};

/**
 * Fechas oficiales de la convocatoria de admisión a pregrado 2027-1.
 * Fuente: Guía Paso a Paso — Dirección Nacional de Admisiones (UNAL).
 * Verificado el 02/09/2026. Incluye la ampliación de fechas de pago e
 * inscripción hasta el 24 de agosto de 2026.
 */
export const eventosFechas: EventoFechas[] = [
  {
    id: "pago-pin",
    nombre: "Pago de los derechos de inscripción (PIN)",
    descripcion:
      "$175.000 COP (USD 87,5 en el exterior). Pago virtual en pagovirtual.unal.edu.co o presencial en Efecty (convenio 113833) o Banco Popular (cuenta 110-01203107-6).",
    fechaInicio: "2026-07-06",
    fechaFin: "2026-08-24",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "formalizar-inscripcion",
    nombre: "Formalizar la inscripción",
    descripcion:
      "Completa el formulario vía web en admisiones.unal.edu.co con tu PIN. Recibirás tu clave de acceso y código de seguridad por correo.",
    fechaInicio: "2026-07-06",
    fechaFin: "2026-08-24",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "consultar-citacion",
    nombre: "Consultar la citación",
    descripcion:
      "Desde esta fecha puedes consultar tu citación con el documento de identidad y la clave de acceso. La citación NO se envía al correo.",
    fechaInicio: "2026-08-31",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "prueba-admision",
    nombre: "Prueba de admisión",
    descripcion:
      "Domingo 20 de septiembre. 120 preguntas de opción múltiple en 3 h 30 min. Lleva documento original, lápiz de mina negra N.º 2, borrador y tajalápiz.",
    fechaInicio: "2026-09-20",
    url: "https://admisiones.unal.edu.co/pregrado/prueba-de-admision/",
  },
  {
    id: "publicacion-puntajes",
    nombre: "Publicación de puntajes",
    descripcion:
      "Consulta tu puntaje en la prueba de admisión, número de puesto y citación a pruebas específicas si aplica.",
    fechaInicio: "2026-10-01",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "inscripcion-programa",
    nombre: "Inscripción de programa curricular",
    descripcion:
      "Inscribe el programa curricular que deseas estudiar, según tu Sede. Los cupos se asignan en orden descendente de puntaje.",
    fechaInicio: "2026-10-01",
    fechaFin: "2026-10-06",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "publicacion-admitidos",
    nombre: "Publicación de admitidos",
    descripcion:
      "Resultados de la primera asignación de cupos (programas regulares y Música). Artes Plásticas y Cine y Televisión: 16 de octubre.",
    fechaInicio: "2026-10-09",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "postulacion-cupos-2",
    nombre: "Postulación a programa con cupos (2)",
    descripcion:
      "Inscripción a programas con cupos disponibles, para aspirantes no admitidos en la primera asignación.",
    fechaInicio: "2026-10-15",
    fechaFin: "2026-10-19",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "resultados-cupos-2",
    nombre: "Resultados a programa con cupos (2)",
    descripcion:
      "Resultados de la asignación de cupos disponibles. Entrega de documentos y pago de sistematización del 26 al 30 de octubre.",
    fechaInicio: "2026-10-22",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "postulacion-cupos-3",
    nombre: "Postulación a programa con cupos (3)",
    descripcion:
      "Última asignación: inscripción a programas con cupos liberados por admitidos que no hicieron uso del derecho de matrícula.",
    fechaInicio: "2026-11-09",
    fechaFin: "2026-11-11",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
  {
    id: "resultados-cupos-3",
    nombre: "Resultados a programa con cupos (3)",
    descripcion:
      "Resultados de la asignación de cupos liberados. Entrega de documentos y pago de sistematización del 17 al 23 de noviembre.",
    fechaInicio: "2026-11-13",
    url: "https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/",
  },
];