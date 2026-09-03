export type GrupoPaes = {
  nombre: string;
  norma: string;
};

/**
 * Información oficial sobre el Programa de Admisión Especial (PAES) de la
 * Universidad Nacional de Colombia, con foco en Comunidades Indígenas.
 * Fuentes: admisiones.unal.edu.co y pregrado.unal.edu.co. Verificado 02/09/2026.
 */
export const paes = {
  definicion: [
    "El Programa de Admisión Especial (PAES) nació en la década de los ochenta a partir del reconocimiento por parte de la Universidad de la existencia de numerosos municipios en situación de extrema pobreza, donde los estudiantes enfrentaban múltiples dificultades y carencias durante su educación secundaria, pues contaban con escasas posibilidades de continuar sus estudios superiores.",
    "Así mismo, el programa reconoce la existencia de grupos poblacionales que han sido históricamente excluidos y la necesidad de promover una mayor igualdad de oportunidades de acceso a la educación superior, en consonancia con el propósito social del Estado.",
    "Los programas de Admisión Especial comprenden los mismos fundamentos de la admisión regular, pero pretenden adicionalmente favorecer el ingreso a ciertas minorías poblacionales según criterios definidos por el Consejo Superior Universitario.",
  ],
  grupos: [
    {
      nombre: "Bachilleres miembros de comunidades indígenas",
      norma: "Acuerdos 022 de 1986 y 018 de 1999 del Consejo Superior Universitario",
    },
    {
      nombre: "Mejores bachilleres",
      norma: "Acuerdo 30 de 1990 del Consejo Superior Universitario",
    },
    {
      nombre: "Mejores bachilleres de municipios pobres",
      norma: "Acuerdo 93 de 1989 del Consejo Superior Universitario",
    },
    {
      nombre: "Bachilleres de población negra, afrocolombiana, palenquera y raizal",
      norma: "Acuerdo 013 de 2009 del Consejo Superior Universitario",
    },
    {
      nombre: "Bachilleres víctimas del conflicto armado interno en Colombia",
      norma: "Acuerdo 215 de 2015 del Consejo Superior Universitario",
    },
    {
      nombre: "Sede de la Paz",
      norma: "Acuerdo 301 de 2019 del Consejo Superior Universitario",
    },
  ],
  comunidadesIndigenas: {
    titulo:
      "Programa Especial para la Admisión de Bachilleres Miembros de Comunidades Indígenas",
    definicion:
      "Es uno de los Programas de Admisión Especial de la Universidad Nacional de Colombia que, como medida de acción afirmativa, tiene por objeto promover el acceso a la educación superior de los miembros de comunidades indígenas, contribuyendo a la generación de oportunidades de desarrollo económico, social y cultural.",
    beneficios: [
      "Inscripción sin costo (PIN gratuito «Indígenas»).",
      "En la primera asignación de cupos, un cupo equivalente al dos por ciento (2%), adicional a los cupos de admisión regular establecidos, para cada programa curricular ofertado.",
      "Si tu Puntaje Total Estandarizado es inferior al de la última persona admitida por cupos regulares, podrás participar por el 2% de cupos reservados para aspirantes del Programa.",
      "Si no eres admitido(a), puedes participar mediante el Programa en la próxima convocatoria.",
      "Pago de matrícula mínima al ingresar a la Universidad.",
    ],
    compromiso:
      "Los estudiantes admitidos mediante este Programa deben prestar obligatoriamente sus servicios profesionales en las comunidades de origen por un término no inferior a un año.",
    requisitos: [
      "Estar registrado(a), con datos actualizados, en las bases censales de las personas pertenecientes a resguardos y comunidades indígenas de la Dirección de Asuntos Indígenas, ROM y Minorías del Ministerio del Interior.",
      "O, en caso de no estarlo, contar con el certificado de pertenencia a tu comunidad, con fecha de expedición no superior a 3 meses, firmado por la autoridad tradicional posesionada para el año en curso.",
      "No haber sido estudiante de la Universidad Nacional de Colombia.",
    ],
    inscripcion: [
      "Ingresa al formulario de formalización de la inscripción en admisiones.unal.edu.co dentro de las fechas de la convocatoria.",
      "Digita tu documento de identidad vigente, correo electrónico y el token de verificación.",
      "En el tipo de admisión, haz clic en «Especial» y luego en «Programa Especial para la Admisión de Bachilleres Miembros de Comunidades Indígenas».",
      "Selecciona tu etnia y el nombre de la comunidad a la que perteneces (campos obligatorios).",
      "Selecciona el PIN gratuito «Indígenas» y confirma para obtener tu clave de acceso y comprobante.",
      "Si tu documento no aparece habilitado, registra la solicitud de participación (formato oficial) a más tardar 1 día calendario antes del cierre, adjuntando la documentación censal.",
    ],
    normativa: [
      { nombre: "Acuerdo 022 de 1986 del Consejo Superior Universitario", url: "http://www.legal.unal.edu.co/rlunal/home/doc.jsp?d_i=35252" },
      { nombre: "Acuerdo 018 de 1999 del Consejo Superior Universitario", url: "http://www.legal.unal.edu.co/rlunal/home/doc.jsp?d_i=35253" },
      { nombre: "Página oficial — Comunidades Indígenas (DNA)", url: "https://admisiones.unal.edu.co/pregrado/comunidades-indigenas/" },
    ],
  },
  reglaCupos:
    "En la primera asignación de cupos se reserva un cupo equivalente al dos por ciento (2%), adicional a los cupos de admisión regular, para cada programa curricular ofertado. Estos cupos se asignan entre los aspirantes inscritos mediante el Programa cuyos puntajes quedaron por debajo del corte regular.",
  fuentes: [
    { titulo: "Comunidades Indígenas — Dirección Nacional de Admisiones", url: "https://admisiones.unal.edu.co/pregrado/comunidades-indigenas/" },
    { titulo: "PAES — Dirección Nacional de Programas de Pregrado", url: "https://pregrado.unal.edu.co/paes" },
    { titulo: "Admisión a pregrado — Admisión Regular y Especial", url: "https://admisiones.unal.edu.co/pregrado/admision-a-pregrado/" },
    { titulo: "Solicitud de inscripción gratuita para Comunidades Indígenas", url: "https://admisiones.unal.edu.co/indigenas/" },
  ],
};