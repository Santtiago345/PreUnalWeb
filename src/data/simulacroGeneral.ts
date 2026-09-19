import type {
  LecturaSimulacro,
  PreguntaSimulacro,
  SimulacroDef,
} from "@/data/simulacro";

/**
 * Simulacro General: combina Análisis de la Imagen (preguntas 8 a 18 del
 * cuadernillo, 100 % visuales) y comprensión lectora (texto "Un pan muy
 * sabroso y una carta mentirosa", preguntas 17 a 31 del cuadernillo).
 *
 * Las preguntas de imagen se sirven como recortes PNG del cuadernillo
 * oficial en `public/simulacros/general/pregunta-<n>.png`; las opciones
 * A/B/C/D van incluidas en la propia imagen.
 */

export const lecturaCarta: LecturaSimulacro = {
  id: "carta-mentirosa",
  titulo: "Un pan muy sabroso y una carta mentirosa",
  parrafos: [
    "Siguiendo con la historia de la Antigua o Baja California del padre Francisco Xavier Clavijero, éste relata una anécdota muy interesante que no sólo nos informa acerca de cómo el pan de trigo era muy estimado tanto por los jesuitas como por los indios de principios del siglo XVIII en aquellas lejanas tierras subcalifornianas, sino nos hace reflexionar sobre algunas cosas que seguramente en la actualidad nos resultan tan naturales como la redacción de una carta de saludo y cómo ésta se puede convertir en otra muy distinta cuando no se comparte el mismo código cultural, es decir el significado que se le da a un papel con signos puede variar dependiendo de cómo y quién lo mira. En el siguiente extracto de la obra de Clavijero se podrá apreciar mejor lo anterior.",
    "Poco después que los jesuitas empezaran a plantar sus misiones en la California envió un misionero a otro por medio de un indio neófito dos tortas de pan (regalo entonces muy preciado por la escasez de trigo) con una carta, en que le hablaba de esta remesa. El neófito probó el pan en el camino, y habiéndole gustado le comió todo. Llegado a presencia del misionero a quien era enviado, le entregó la carta, y habiéndole reclamado el pan, negó haberle recibido, y como no pudiese adivinar quién había dicho aquello al misionero, se le advirtió que la carta era la que se lo decía, sin embargo de lo cual insistió en su negativa y fue despedido. A poco tiempo volvió a ser enviado al mismo misionero con otro regalo, acompañado también de una carta y en el camino cayó en la misma tentación. Mas como la primera vez había sido descubierto por la carta, para evitar que esta le viese la metió debajo de una piedra mientras devoraba lo que traía. Habiendo entregado al misionero la carta y siendo con ella convencido nuevamente del hurto, respondió con esta extraña simplicidad: Yo os confieso, padre, que la primera carta os dijo la verdad porque realmente me vio comer el pan; pero esta otra es una embustera en afirmar lo que ciertamente no ha visto.",
  ],
  fuente:
    "Artículo de Martha Delfín Guillaumin en www.historiacocina.com/viajeros/articulos/clavijero/clavijero1.html",
};

const IMG = (n: number) => `/simulacros/general/pregunta-${n}.png`;

export const preguntasGeneral: PreguntaSimulacro[] = [
  // ── Análisis de la imagen (cuadernillo, preguntas 8 a 18) ──
  {
    id: 1,
    tema: "Análisis de la imagen",
    nivel: "media",
    enunciado:
      "Identifique la figura que se obtiene al aplicar la simetría según los ejes dados.",
    opciones: ["A", "B", "C", "D"],
    correcta: 0,
    explicacion:
      "La figura base está en el cuadrante superior izquierdo tocando ambos ejes. Al reflejarla en el eje vertical y luego en el horizontal se obtienen cuatro réplicas; la opción A es la única con los círculos interiores orientados correctamente en los cuatro cuadrantes.",
    detalle:
      "Método: refleja primero en un eje y luego el resultado en el otro, verificando hacia dónde queda el círculo más pequeño en cada cuadrante. Corresponde a la pregunta 8 del cuadernillo.",
    imagen: IMG(8),
    imagenAlt:
      "Ejercicio de simetría con círculos concéntricos y cuatro opciones A, B, C y D.",
  },
  {
    id: 2,
    tema: "Análisis de la imagen",
    nivel: "media",
    enunciado:
      "Identifique la figura que se obtiene al aplicar la simetría según los ejes dados.",
    opciones: ["A", "B", "C", "D"],
    correcta: 0,
    explicacion:
      "La figura en forma de L con círculos divididos en cuartos se refleja en ambos ejes. La opción A conserva la orientación de los cuartos sombreados en cada una de las cuatro réplicas.",
    detalle:
      "Método: sigue un solo elemento distintivo (por ejemplo, el cuarto sombreado de un círculo) a través de las dos reflexiones y descarta las opciones donde quede girado. Corresponde a la pregunta 9 del cuadernillo.",
    imagen: IMG(9),
    imagenAlt:
      "Ejercicio de simetría de una figura en L con círculos y cuatro opciones A, B, C y D.",
  },
  {
    id: 3,
    tema: "Análisis de la imagen",
    nivel: "media",
    enunciado:
      "Identifique cómo se vería el objeto de la izquierda si se observa en el sentido que indica la flecha.",
    opciones: ["A", "B", "C", "D"],
    correcta: 2,
    explicacion:
      "Desde la dirección de la flecha, el cubo superior se ve arriba a la derecha y la base piramidal abajo; la arista que queda oculta se dibuja punteada. Esa combinación solo aparece en la opción C.",
    detalle:
      "Método: ubica primero los volúmenes grandes (cubo arriba, base abajo) y luego busca la línea punteada de la arista oculta para decidir. Corresponde a la pregunta 10 del cuadernillo.",
    imagen: IMG(10),
    imagenAlt:
      "Sólido con cubo sobre base piramidal y cuatro vistas posibles A, B, C y D.",
  },
  {
    id: 4,
    tema: "Análisis de la imagen",
    nivel: "difícil",
    enunciado:
      "Identifique cómo se vería el objeto de la izquierda si se observa en el sentido que indica la flecha.",
    opciones: ["A", "B", "C", "D"],
    correcta: 2,
    explicacion:
      "La vista en la dirección de la flecha proyecta las aristas inclinadas del sólido sobre una cuadrícula; solo la opción C reproduce la diagonal continua y la oculta punteada en su posición correcta.",
    detalle:
      "Método: compara las diagonales una por una entre las opciones; las líneas continuas son aristas visibles y las punteadas son ocultas. Corresponde a la pregunta 11 del cuadernillo.",
    imagen: IMG(11),
    imagenAlt:
      "Sólido de aristas inclinadas dentro de una retícula con cuatro vistas posibles.",
  },
  {
    id: 5,
    tema: "Análisis de la imagen",
    nivel: "media",
    enunciado:
      "Identifique cómo se vería el objeto de la izquierda si se observa en el sentido que indica la flecha.",
    opciones: ["A", "B", "C", "D"],
    correcta: 2,
    explicacion:
      "La flecha indica una vista superior (cenital): se ven las dos superficies triangulares achuradas y simétricas formando una X. La opción C es la única con ese achurado completo en ambos lados.",
    detalle:
      "Método: en una vista cenital desaparece la altura; fíjate en qué regiones quedan sombreadas y en la simetría del dibujo. Corresponde a la pregunta 12 del cuadernillo.",
    imagen: IMG(12),
    imagenAlt:
      "Vista superior de un sólido con superficies achuradas y cuatro opciones.",
  },
  {
    id: 6,
    tema: "Análisis de la imagen",
    nivel: "difícil",
    enunciado:
      "Identifique el sólido al que corresponden la vista horizontal (H) y la vista vertical (V). La flecha indica la posición del observador en la vista vertical (V).",
    opciones: ["A", "B", "C", "D"],
    correcta: 0,
    explicacion:
      "La vista horizontal muestra la planta en forma de T con su diagonal, y la vista vertical el frente con el entrante. Solo el sólido A, en forma de T con el corte central en V, genera ambas proyecciones.",
    detalle:
      "Método: verifica primero la planta (H) para descartar sólidos y luego confirma con el frente (V) desde la flecha. Corresponde a la pregunta 13 del cuadernillo.",
    imagen: IMG(13),
    imagenAlt:
      "Vistas horizontal y vertical de un sólido con cuatro sólidos candidatos A, B, C y D.",
  },
  {
    id: 7,
    tema: "Análisis de la imagen",
    nivel: "difícil",
    enunciado:
      "Identifique el sólido al que corresponden la vista horizontal (H) y la vista vertical (V). La flecha indica la posición del observador en la vista vertical (V).",
    opciones: ["A", "B", "C", "D"],
    correcta: 2,
    explicacion:
      "La planta (H) y el frente (V) muestran un vaciado central con caras inclinadas que solo el sólido C produce visto desde la posición de la flecha.",
    detalle:
      "Método: los vaciados se reconocen por las líneas interiores en H y V; compara la forma del hueco entre opciones. Corresponde a la pregunta 14 del cuadernillo.",
    imagen: IMG(14),
    imagenAlt:
      "Vistas H y V de un sólido con vaciado y cuatro sólidos candidatos.",
  },
  {
    id: 8,
    tema: "Análisis de la imagen",
    nivel: "difícil",
    enunciado:
      "Identifique el sólido al que corresponden la vista horizontal (H) y la vista vertical (V). La flecha indica la posición del observador en la vista vertical (V).",
    opciones: ["A", "B", "C", "D"],
    correcta: 3,
    explicacion:
      "La retícula de la planta y el frente con sus achurados corresponden al sólido D, el único cuya combinación de caras externas e internas proyecta esas dos vistas.",
    detalle:
      "Método: cuenta las divisiones de la retícula en H y verifica que el frente V tenga el mismo número de bandas. Corresponde a la pregunta 15 del cuadernillo.",
    imagen: IMG(15),
    imagenAlt:
      "Vistas en retícula de un sólido poliédrico con cuatro candidatos A, B, C y D.",
  },
  {
    id: 9,
    tema: "Análisis de la imagen",
    nivel: "media",
    enunciado:
      "Identifique el sólido al que corresponden la vista vertical (V) y la vista de perfil (P). La flecha indica la posición del observador en la vista vertical (V).",
    opciones: ["A", "B", "C", "D"],
    correcta: 1,
    explicacion:
      "La vista vertical muestra el corte en L con su diagonal y el perfil la banda con la línea oculta; solo el sólido B reúne ambas condiciones.",
    detalle:
      "Método: la vista de perfil se toma a 90 grados de la vertical; la línea punteada delata la cara oculta del corte. Corresponde a la pregunta 16 del cuadernillo.",
    imagen: IMG(16),
    imagenAlt:
      "Vistas vertical y de perfil de un sólido con corte y cuatro candidatos.",
  },
  {
    id: 10,
    tema: "Análisis de la imagen",
    nivel: "media",
    enunciado:
      "Identifique el sólido al que corresponden la vista vertical (V) y la vista de perfil (P). La flecha indica la posición del observador en la vista vertical (V).",
    opciones: ["A", "B", "C", "D"],
    correcta: 1,
    explicacion:
      "La vista vertical presenta un triángulo achurado a la izquierda y el perfil aparece totalmente achurado; esa pareja de proyecciones solo la produce el sólido B.",
    detalle:
      "Método: el achurado indica superficies inclinadas vistas de frente; el perfil totalmente sombreado confirma un plano inclinado continuo. Corresponde a la pregunta 17 del cuadernillo.",
    imagen: IMG(17),
    imagenAlt:
      "Vistas V y P con achurados de un sólido piramidal y cuatro candidatos.",
  },
  {
    id: 11,
    tema: "Análisis de la imagen",
    nivel: "difícil",
    enunciado:
      "Identifique el sólido al que corresponden la vista vertical (V) y la vista de perfil (P). La flecha indica la posición del observador en la vista vertical (V).",
    opciones: ["A", "B", "C", "D"],
    correcta: 0,
    explicacion:
      "Las diagonales continuas y punteadas de V y P, con sus cruces en la retícula, coinciden únicamente con la geometría interna del sólido A.",
    detalle:
      "Método: sigue cada diagonal de V hasta P; la que cambia de continua a punteada marca una arista que se oculta al girar 90 grados. Corresponde a la pregunta 18 del cuadernillo.",
    imagen: IMG(18),
    imagenAlt:
      "Vistas en retícula con diagonales y cuatro sólidos candidatos A, B, C y D.",
  },
  // ── Comprensión lectora (cuadernillo, preguntas 17 a 31) ──
  {
    id: 12,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "En el texto, la noción de código cultural debe entenderse como",
    opciones: [
      "una lengua mediante la cual un miembro de una cultura entiende el mundo.",
      "un sistema de signos compartidos por los miembros de una misma cultura.",
      "una habilidad lingüística para interpretar signos que es relativa a una cultura.",
      "un conjunto de prácticas y ritos distintivos de una cultura.",
    ],
    correcta: 1,
    explicacion:
      "El propio texto lo define: el significado que se le da a un papel con signos varía según cómo y quién lo mira; es decir, un sistema de signos compartidos.",
    detalle:
      "La opción D tienta porque las prácticas y ritos son parte de una cultura, pero la pregunta pide lo que el texto entiende por código cultural: signos y significados. Corresponde a la pregunta 17 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 13,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "En el texto se hace referencia a una función de los códigos culturales que consiste en",
    opciones: [
      "determinar formas de comportamiento permitidas dentro del grupo social.",
      "fijar las formas por las cuales el individuo adquiere el sentido de pertenencia al grupo social.",
      "establecer pautas de acción que fundamenten la solidaridad entre el grupo social.",
      "fijar el sentido, el valor y la función de las cosas dentro del grupo social.",
    ],
    correcta: 3,
    explicacion:
      "El primer párrafo muestra que el código cultural fija qué significa y qué valor tiene un signo (la carta) dentro de una comunidad.",
    detalle:
      "Definición y función: el código no solo dice qué es algo, sino qué significa y qué valor tiene. Corresponde a la pregunta 18 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 14,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado: "El orden correcto de los hechos narrados en el texto es",
    opciones: [
      "el pan de trigo es estimado por los jesuitas, un misionero envía dos tortas de pan, el indio se come el pan, el indio esconde la carta, el indio es descubierto, el indio entrega la carta, el indio es despedido.",
      "un misionero envía dos tortas de pan, el pan de trigo es estimado por los jesuitas, el indio esconde la carta, el indio se come el pan, el indio es descubierto, el indio entrega la carta, el indio es despedido.",
      "el pan de trigo es estimado por los jesuitas, un misionero envía dos tortas de pan, el indio se come el pan, el indio entrega la carta, el indio es descubierto, el indio es despedido, el indio esconde la carta.",
      "un misionero envía dos tortas de pan, el pan de trigo es estimado por los jesuitas, el indio esconde la carta, el indio se come el pan, el indio es descubierto, el indio es despedido, el indio entrega la carta.",
    ],
    correcta: 2,
    explicacion:
      "La secuencia es: el pan es estimado, el misionero envía las tortas, el indio se come el pan, entrega la carta, es descubierto, es despedido y (en el segundo envío) esconde la carta.",
    detalle:
      "Fíjate en el inicio (el pan estimado abre el relato) y en el final (esconder la carta ocurre en el segundo viaje). Corresponde a la pregunta 19 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 15,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "Mediante la palabra misiones, el autor del texto se refiere a empresas de comunidades destinadas en su tiempo a",
    opciones: [
      "la administración de territorios conquistados para la corona española.",
      "la expansión de la fe cristiana entre los pueblos de América.",
      "la exploración de tierras para ampliar el dominio español.",
      "el recaudo de impuestos para engrosar los tesoros de la corona española.",
    ],
    correcta: 1,
    explicacion:
      "Jesuitas más California más indígenas: en ese contexto histórico, las misiones son establecimientos de evangelización.",
    detalle:
      "«Poco después que los jesuitas empezaron a plantar sus misiones en la California…». Corresponde a la pregunta 20 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 16,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "A fin de comprender adecuadamente el texto conviene precisar que un neófito es un individuo que",
    opciones: [
      "aparenta acatar las disposiciones ante sus superiores, pero luego hace de las suyas.",
      "llevado por la curiosidad comete errores, luego los corrige y deduce una enseñanza.",
      "ha sido recientemente integrado a un grupo social o a un sistema cultural.",
      "juzga y valora las cosas únicamente con base en el conocimiento sensorial.",
    ],
    correcta: 2,
    explicacion:
      "En este contexto el neófito es el indio recién incorporado a la comunidad religiosa de los jesuitas.",
    detalle:
      "La opción correcta generaliza la idea: alguien recién integrado a un sistema cultural. Corresponde a la pregunta 21 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 17,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "En el enunciado **«El neófito probó el pan en el camino, y habiéndole gustado le comió todo»** se encuentra el fenómeno del leísmo. Este fenómeno no es usual en nuestro español, pues somos loístas y decimos, por ejemplo, **(se) lo comió todo**. Con base en el citado enunciado es correcto afirmar que en el leísmo, el pronombre **le** designa",
    opciones: [
      "un objeto que padece el efecto de una acción.",
      "una persona que intencionalmente realiza una acción.",
      "un destinatario o beneficiario de una acción.",
      "una causa por la cual se realiza una acción.",
    ],
    correcta: 0,
    explicacion:
      "Lo normativo sería «se lo comió todo»: lo reemplaza al pan, que es el objeto directo afectado por la acción de comer.",
    detalle:
      "Comió el pan y lo comió (no le comió): el pan es el objeto que padece la acción. Corresponde a la pregunta 22 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 18,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "En el texto, el indio neófito es visto como un individuo que",
    opciones: [
      "intencionalmente contraviene el código de respeto con sus superiores.",
      "es subestimado como persona inteligente por su condición de aborigen americano.",
      "actúa maliciosamente según el concepto del europeo respecto al hombre americano.",
      "actúa ingenuamente en el seno de una cultura cuyos códigos no conoce cabalmente.",
    ],
    correcta: 3,
    explicacion:
      "El indio no engaña deliberadamente: interpreta la carta desde otro código cultural, como un testigo que ve.",
    detalle:
      "La escena clave: entrega la carta y niega el hurto porque no concibe que el papel comunique lo que hizo. Corresponde a la pregunta 23 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 19,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "El indio negó haberse comido el pan la primera vez pues",
    opciones: [
      "no tenía ni idea de que la carta informara sobre el pan.",
      "no tenía idea de lo que una carta podía comunicar.",
      "no sabía lo que era una carta.",
      "no le importaba si lo descubrían.",
    ],
    correcta: 1,
    explicacion:
      "No es solo ese contenido puntual: el neófito no comprende la capacidad comunicativa del escrito en general.",
    detalle:
      "Entre dos opciones cercanas, elige la causa general (no entiende qué puede comunicar una carta) sobre el caso particular. Corresponde a la pregunta 24 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 20,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado: "El indio escondió la carta",
    opciones: [
      "para que ésta no lo viera comerse el pan.",
      "para no entregarla al misionero.",
      "porque no sabía leer y desconfiaba del contenido.",
      "porque solo era necesario entregar el pan.",
    ],
    correcta: 0,
    explicacion:
      "La metió debajo de una piedra para evitar que esta le viese mientras devoraba lo que traía: personifica la carta como testigo.",
    detalle:
      "El texto lo dice literalmente y confirma que no comprende cómo funciona la carta. Corresponde a la pregunta 25 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 21,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "En español moderno para referirse al interlocutor se usa el pronombre Usted. En el enunciado **«Yo os confieso, padre, la primera carta os dijo la verdad»**, la forma pronominal en negrilla **os** puede ser sustituida por",
    opciones: ["me", "lo", "te", "le"],
    correcta: 3,
    explicacion:
      "Os (segunda persona plural, trato al padre) equivale al le de Usted: tú con te, usted con le, vosotros con os, ustedes con les.",
    detalle:
      "Prueba cada opción en la frase; solo le mantiene el tratamiento de usted. Corresponde a la pregunta 26 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 22,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "La anécdota relatada en el texto muestra que el indio llega a concebir la carta que él lleva como un objeto",
    opciones: [
      "antropomorfizado.",
      "con capacidades cognitivas.",
      "con un significado relativo a una cultura.",
      "simbólico con garabatos que él no entiende.",
    ],
    correcta: 0,
    explicacion:
      "La esconde para que no lo vea comer: le atribuye una cualidad humana (ver), es decir, la antropomorfiza.",
    detalle:
      "Antro remite al ser humano. Cree que la carta puede observarlo como un testigo. Corresponde a la pregunta 27 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 23,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "De acuerdo con la anécdota relatada en el texto, es falso afirmar que el indio",
    opciones: [
      "ignora que lo que lleva en el papel es un mensaje para su destinatario.",
      "personifica un objeto otorgándole cualidades humanas que no posee.",
      "cree que ocultar la carta es una manera efectiva de ocultar su hurto.",
      "es consciente de que no le es posible interpretar el mensaje que lleva.",
    ],
    correcta: 3,
    explicacion:
      "Las tres primeras son compatibles con el texto; la última lo contradice: el indio cree entender cómo funciona la carta (como testigo que ve), no es consciente de no poder interpretarla.",
    detalle:
      "En preguntas de «es falso», busca la opción que contradiga el texto, no la menos evidente. Corresponde a la pregunta 28 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 24,
    tema: "Comprensión lectora",
    nivel: "fácil",
    enunciado: "En este relato intervienen",
    opciones: [
      "dos indios y dos misioneros.",
      "un indio y dos misioneros.",
      "un misionero y dos indios.",
      "tres misioneros y dos indios.",
    ],
    correcta: 1,
    explicacion:
      "Un misionero envía el pan y la carta por medio de un indio neófito y otro misionero los recibe: un indio y dos misioneros.",
    detalle:
      "Cuenta los personajes por sus acciones en el relato. Corresponde a la pregunta 29 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 25,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado: "Del texto es correcto inferir que",
    opciones: [
      "los textos escritos son interpretados según la intención del autor.",
      "el autor debe escribir en el mismo idioma del lector.",
      "los textos escritos son interpretados según la condición del lector.",
      "para interpretar un texto es necesario conocer al autor.",
    ],
    correcta: 2,
    explicacion:
      "La idea general del primer párrafo: el significado de un papel con signos varía según cómo y quién lo mira; la anécdota del neófito es el ejemplo.",
    detalle:
      "Estructura idea general con ejemplo concreto. Corresponde a la pregunta 30 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 26,
    tema: "Comprensión lectora",
    nivel: "media",
    enunciado:
      "El narrador del texto pretende fundamentalmente mostrar",
    opciones: [
      "la existencia de códigos culturales dispares.",
      "la tendencia del ser humano a mentir.",
      "la pérdida de dos tortas de pan de trigo.",
      "la carta como medio de comunicación.",
    ],
    correcta: 0,
    explicacion:
      "La historia del pan es el vehículo narrativo; el primer párrafo declara la finalidad: reflexionar sobre códigos culturales distintos ante los mismos signos.",
    detalle:
      "La carta como medio aparece en el relato, pero es el ejemplo, no la finalidad fundamental. Corresponde a la pregunta 31 del cuadernillo.",
    lecturaId: lecturaCarta.id,
  },
  {
    id: 27,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "Las glándulas endocrinas vierten su contenido",
    opciones: [
      "a otra glándula.",
      "a la sangre.",
      "al medio externo.",
      "a una cavidad interna.",
    ],
    correcta: 1,
    explicacion:
      "Las endocrinas no tienen conductos: liberan hormonas directo a la sangre. Truco: endo = adentro (a la sangre); exo = afuera.",
    detalle:
      "Las glándulas endocrinas secretan hormonas directamente al torrente sanguíneo, a diferencia de las exocrinas que usan conductos hacia el exterior o cavidades.",
  },
  {
    id: 28,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "La única arteria que transporta sangre desoxigenada es la",
    opciones: ["aorta", "carótida", "pulmonar", "coronaria"],
    correcta: 2,
    explicacion:
      "La arteria pulmonar lleva sangre desoxigenada del ventrículo derecho a los pulmones para oxigenarse. Truco: pulmonar = pulmones = va a oxigenar (por eso va desoxigenada).",
    detalle:
      "Todas las demás arterias llevan sangre oxigenada; solo la pulmonar transporta sangre desoxigenada hacia los pulmones.",
  },
  {
    id: 29,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "La palabra taxonomía significa",
    opciones: [
      "ordenar y clasificar.",
      "observar y guardar.",
      "enumerar y clasificar.",
      "coleccionar y guardar.",
    ],
    correcta: 0,
    explicacion:
      "Taxonomía = ciencia de ordenar y clasificar (del griego taxis, orden). Truco: taxo = orden.",
    detalle:
      "La taxonomía es la disciplina que ordena y clasifica a los seres vivos.",
  },
  {
    id: 30,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "Los glóbulos rojos en los humanos se producen en",
    opciones: ["el corazón.", "el páncreas.", "los ganglios.", "la médula."],
    correcta: 3,
    explicacion:
      "Los eritrocitos se forman en la médula ósea roja. Truco: médula = fábrica de sangre.",
    detalle:
      "La hematopoyesis (producción de glóbulos rojos) ocurre en la médula ósea roja.",
  },
  {
    id: 31,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado:
      "¿En cuáles de las opciones dadas, todos los elementos mencionados hacen parte de un estambre?",
    opciones: [
      "Estigma, pistilo y óvulo.",
      "Corola, tegumento y filamento.",
      "Cáliz, sacos polínicos y placenta.",
      "Filamento, conectivo y sacos polínicos.",
    ],
    correcta: 3,
    explicacion:
      "El estambre (parte masculina) = filamento + antera (conectivo + sacos polínicos). Las demás mezclan partes femeninas (pistilo, óvulo) o de la flor (corola, cáliz). Truco: estambre = masculino = filamento + polen.",
    detalle:
      "El estambre consta de filamento y antera; la antera contiene los sacos polínicos unidos por el conectivo. Estigma, pistilo y óvulo son femeninos.",
  },
  {
    id: 32,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "El proceso de germinación de una semilla se inicia mediante la",
    opciones: [
      "digestión de alimentos almacenados en ella.",
      "absorción de agua.",
      "liberación de energía en la respiración.",
      "duplicación de células.",
    ],
    correcta: 1,
    explicacion:
      "Lo primero es la imbibición: la semilla absorbe agua, lo que activa el metabolismo. Truco: sin agua no arranca nada.",
    detalle:
      "La germinación inicia con la absorción de agua (imbibición), que hidrata los tejidos y activa las enzimas.",
  },
  {
    id: 33,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "¿Cuál de las siguientes plantas es dicotiledónea?",
    opciones: ["Maíz", "Trigo", "Haba", "Cebada"],
    correcta: 2,
    explicacion:
      "El haba es leguminosa (dicotiledónea). Maíz, trigo y cebada son gramíneas/cereales (monocotiledóneas). Truco: los cereales son monocots.",
    detalle:
      "Las leguminosas como el haba son dicotiledóneas; los cereales (maíz, trigo, cebada) son monocotiledóneas.",
  },
  {
    id: 34,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "El corazón de cuatro cavidades o cámaras es característico de los",
    opciones: [
      "mamíferos y aves.",
      "mamíferos y peces.",
      "peces y anfibios.",
      "peces y aves.",
    ],
    correcta: 0,
    explicacion:
      "Solo mamíferos y aves (endotermos) tienen 4 cámaras con separación total. Peces tienen 2, anfibios 3. Truco: 4 cámaras = sangre caliente.",
    detalle:
      "El corazón tetracameral con tabique completo es propio de mamíferos y aves; permite separar sangre oxigenada y desoxigenada.",
  },
  {
    id: 35,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "Los anfibios presentan fecundación",
    opciones: ["cruzada", "externa", "asexual", "interna"],
    correcta: 1,
    explicacion:
      "Las ranas y sapos liberan los huevos al agua y el macho los fertiliza afuera (externa). Truco: anfibio + agua = fertilización externa.",
    detalle:
      "La mayoría de los anfibios tienen fecundación externa en medio acuático.",
  },
  {
    id: 36,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado:
      "En los vertebrados, los órganos internos tales como el estómago, el intestino, la vejiga y el corazón, están bajo el control",
    opciones: [
      "de la médula.",
      "del cerebelo.",
      "del sistema nervioso central.",
      "del sistema nervioso autónomo.",
    ],
    correcta: 3,
    explicacion:
      "Los órganos viscerales funcionan sin control voluntario: los regula el sistema nervioso autónomo. Truco: autónomo = automático (no lo piensas).",
    detalle:
      "El sistema nervioso autónomo controla las funciones involuntarias de las vísceras.",
  },
  {
    id: 37,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado: "Si el nitrógeno tiene 3 electrones de valencia, puede formar",
    opciones: [
      "enlaces simples con 2 átomos de oxígeno.",
      "enlaces dobles con 2 átomos de oxígeno.",
      "enlaces simples con 3 átomos de hidrógeno.",
      "enlaces dobles con 3 átomos de hidrógeno.",
    ],
    correcta: 2,
    explicacion:
      "Con 3 electrones de valencia necesita 3 enlaces para completar el octeto. El hidrógeno forma 1 enlace, así que 3 H con enlaces simples (como el amoníaco NH₃). Truco: cuenta cuántos enlaces necesita.",
    detalle:
      "El nitrógeno completa su octeto formando 3 enlaces covalentes simples, como en el NH₃ con 3 hidrógenos.",
  },
  {
    id: 38,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado:
      "Son sustancias orgánicas fundamentales para regular las funciones del organismo, aunque entran en la dieta en cantidades muy pequeñas; se encuentran naturalmente en los alimentos frescos. La descripción corresponde a las",
    opciones: ["grasas", "hormonas", "proteínas", "vitaminas"],
    correcta: 3,
    explicacion:
      "Regulan en cantidades pequeñas y vienen en alimentos frescos = vitaminas. Las grasas/proteínas son macronutrientes (grandes cantidades); las hormonas las produce el cuerpo. Truco: pequeñas cantidades + frescos = vitaminas.",
    detalle:
      "Las vitaminas son micronutrientes reguladores presentes en alimentos frescos.",
  },
  {
    id: 39,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado: "El punto de fusión de un compuesto es la temperatura en la que",
    opciones: [
      "el sólido está en equilibrio con el líquido.",
      "el sólido está en equilibrio con el gas.",
      "el líquido está en equilibrio con el sólido.",
      "el líquido está en equilibrio con el gas.",
    ],
    correcta: 0,
    explicacion:
      "Fusión = sólido pasa a líquido; en ese punto ambas fases coexisten en equilibrio. Truco: fusión involucra sólido y líquido, no gas.",
    detalle:
      "El punto de fusión es la temperatura a la cual el sólido y el líquido están en equilibrio.",
  },
  {
    id: 40,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado: "Los átomos de carbono unidos por un doble enlace han sufrido una hibridación",
    opciones: ["sp", "sp2", "sp3", "spd"],
    correcta: 1,
    explicacion:
      "Doble enlace = hibridación sp² (simple = sp³, triple = sp). Truco: cuenta los enlaces: 2 = sp2.",
    detalle:
      "El carbono con doble enlace presenta hibridación sp².",
    formula: "C=C \\to sp^2",
  },
  {
    id: 41,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado: "Se dice que una molécula es polar cuando",
    opciones: [
      "presenta un exceso de cargas positivas.",
      "posee únicamente un centro de carga negativa.",
      "los centros de cargas positiva y negativa no coinciden.",
      "carece de centros de cargas positiva y negativa.",
    ],
    correcta: 2,
    explicacion:
      "Polar = separación de cargas (dipolo): los centros + y − no coinciden. Truco: polar = polos separados.",
    detalle:
      "Una molécula es polar cuando hay desplazamiento de carga y los centros de carga positiva y negativa no coinciden, generando un momento dipolar.",
  },
  {
    id: 42,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "Todos los átomos de un elemento dado tienen el mismo",
    opciones: [
      "número atómico.",
      "número de neutrones.",
      "peso atómico.",
      "tipo de isotopos.",
    ],
    correcta: 0,
    explicacion:
      "Lo que define al elemento es el número de protones (número atómico). Los neutrones varían (isótopos). Truco: elemento = protones.",
    detalle:
      "El número atómico (protones) es idéntico en todos los átomos de un elemento; los neutrones pueden variar formando isótopos.",
  },
  {
    id: 43,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado: "Se denomina isómeros a los compuestos que tienen",
    opciones: [
      "la misma masa atómica.",
      "la misma fórmula molecular.",
      "diferente masa molecular.",
      "igual fórmula estructural.",
    ],
    correcta: 1,
    explicacion:
      "Isómeros = misma fórmula molecular pero distinta estructura (distinto arreglo). Truco: iso = igual (fórmula), diferente orden.",
    detalle:
      "Los isómeros comparten la fórmula molecular pero difieren en la conectividad o disposición espacial.",
  },
  {
    id: 44,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado:
      "Si al agregar a una solución de cloruro de sodio (NaCl) una pequeña cantidad del soluto aparecen cristales, esto significa que la nueva solución está",
    opciones: ["diluida", "concentrada", "saturada", "sobresaturada"],
    correcta: 3,
    explicacion:
      "Si al añadir soluto se forman cristales, la solución tenía más disuelto de lo estable (sobresaturada) y el exceso cristaliza. Truco: cristales que aparecen = sobresaturación que se rompe.",
    detalle:
      "La aparición de cristales al añadir soluto indica una solución sobresaturada que precipita el exceso.",
  },
  {
    id: 45,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "¿Cuál de los siguientes fenómenos no es químico?",
    opciones: [
      "Quemar gasolina.",
      "Fermentar panela.",
      "Licuar oxígeno.",
      "Oxidar hierro.",
    ],
    correcta: 2,
    explicacion:
      "Licuar (gas→líquido) es un cambio de estado (físico), no forma sustancias nuevas. Los demás sí transforman la materia. Truco: cambio de estado = físico.",
    detalle:
      "La licuefacción es un cambio físico de estado; combustión, fermentación y oxidación son cambios químicos.",
  },
  {
    id: 46,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado:
      "Es el movimiento de un objeto a uno y otro lado de su posición de equilibrio debido a la acción de la gravedad. La definición anterior corresponde a un movimiento",
    opciones: [
      "pendular.",
      "vibratorio.",
      "ondulatorio transversal.",
      "ondulatorio longitudinal.",
    ],
    correcta: 0,
    explicacion:
      "Vaivén alrededor del equilibrio POR GRAVEDAD = péndulo. El vibratorio es por elasticidad; los ondulatorios se propagan. Truco: gravedad + vaivén = péndulo.",
    detalle:
      "El movimiento pendular es una oscilación alrededor del equilibrio causada por la gravedad.",
  },
  {
    id: 47,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "El condensador eléctrico es un dispositivo que",
    opciones: [
      "conduce cargas eléctricas.",
      "crea cargas eléctricas.",
      "almacena cargas eléctricas.",
      "neutraliza cargas eléctricas.",
    ],
    correcta: 2,
    explicacion:
      "Un condensador (capacitor) almacena carga/energía eléctrica. Truco: condensador = almacén.",
    detalle:
      "El condensador almacena cargas eléctricas entre sus placas.",
  },
  {
    id: 48,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "La distancia recorrida por una onda en un período se denomina",
    opciones: ["frecuencia.", "amplitud.", "velocidad.", "longitud de onda."],
    correcta: 3,
    explicacion:
      "En un período (T) la onda avanza una longitud de onda (λ). Truco: distancia en un T = λ.",
    detalle:
      "La longitud de onda es la distancia que recorre la perturbación en un período.",
    formula: "\\lambda = v \\cdot T",
  },
  {
    id: 49,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado:
      "Un hombre salta a tierra desde un bote que está en reposo a cierta distancia de la orilla. Al saltar el hombre, el bote",
    opciones: [
      "se alejará de la orilla con una velocidad que no depende de su masa.",
      "se alejará de la orilla con una velocidad que depende de su masa.",
      "oscilará con una velocidad y frecuencia que depende de su masa.",
      "permanecerá en reposo.",
    ],
    correcta: 1,
    explicacion:
      "Por conservación del momento: el hombre va hacia la orilla y el bote retrocede; su velocidad depende de las masas (m·v se conserva). Truco: acción-reacción + masas.",
    detalle:
      "El momento total se conserva; la velocidad de retroceso del bote depende de su masa respecto a la del hombre.",
    formula: "m_1v_1=m_2v_2",
  },
  {
    id: 50,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado: "Un cuerpo en equilibrio puede tener",
    opciones: [
      "velocidad uniforme en línea recta.",
      "fuerza resultante diferente de cero.",
      "aceleración resultante diferente de cero.",
      "movimiento circular con velocidad constante.",
    ],
    correcta: 0,
    explicacion:
      "Equilibrio = fuerza neta cero = sin aceleración. Puede estar quieto O moverse recto y uniforme (1ª ley de Newton). El circular exige aceleración centrípeta. Truco: equilibrio incluye moverse constante.",
    detalle:
      "En equilibrio la resultante es cero; el cuerpo puede estar en reposo o con velocidad constante en línea recta.",
    formula: "\\sum F = 0",
  },
  {
    id: 51,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado:
      "Un satélite artificial que se encuentra sobre la superficie terrestre tiene un peso igual a P. ¿Cuál será el peso del mismo satélite cuando se encuentra a una altura, por encima de la superficie terrestre, igual al radio de la tierra?",
    opciones: [
      "El mismo.",
      "Cuatro veces mayor.",
      "Cuatro veces menor.",
      "Dos veces mayor.",
    ],
    correcta: 2,
    explicacion:
      "El peso cae con el cuadrado de la distancia (1/r²). A altura R, la distancia es 2R → peso = P/4. Truco: doble distancia = cuarta parte.",
    detalle:
      "P ∝ 1/r². De r=R a r=2R, el peso se divide entre 4.",
    formula: "P' = P\\left(\\frac{R}{2R}\\right)^2 = \\frac{P}{4}",
  },
  {
    id: 52,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado: "La aceleración de una piedra que se deja caer libremente es",
    opciones: [
      "igual a la de una piedra que se lanza hacia arriba.",
      "menor que la de una piedra que se lanza hacia abajo.",
      "mayor que la de una piedra que se lanza hacia arriba.",
      "menor que la de una piedra que se lanza hacia arriba.",
    ],
    correcta: 0,
    explicacion:
      "En caída libre (sin aire) la aceleración siempre es g, sin importar si sube, baja o se suelta. Truco: g es la misma para todo.",
    detalle:
      "La aceleración gravitacional es constante (g) independiente de la velocidad inicial.",
    formula: "a = g",
  },
  {
    id: 53,
    tema: "Ciencias naturales",
    nivel: "media",
    enunciado:
      "Un carro se desplaza a lo largo de una carretera rectilínea con una velocidad de 20 metros por segundo. Al aplicar los frenos se detiene al cabo de 5 segundos. Si la aceleración del carro es constante, su valor en metros por segundo al cuadrado es",
    opciones: ["4", "0,25", "−0,25", "−4"],
    correcta: 3,
    explicacion:
      "a = Δv/Δt = (0−20)/5 = −4 m/s² (negativa porque frena). Truco: frenar = aceleración negativa.",
    detalle: "a = (0 − 20)/5 = −4 m/s².",
    formula: "a=\\frac{\\Delta v}{\\Delta t}=\\frac{-20}{5}=-4\\ m/s^2",
  },
  {
    id: 54,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado:
      "Se lanzan verticalmente hacia arriba dos objetos: uno de 50 gramos y el otro de 100 gramos. Si parten con la misma velocidad inicial y desde el mismo punto, y teniendo en cuenta que el experimento se realiza en el vacío,",
    opciones: [
      "los dos objetos gastarán tiempos distintos para volver al punto de partida.",
      "el objeto de menor peso tendrá una aceleración mayor cuando está cayendo.",
      "los dos objetos se moverán con la misma aceleración.",
      "el objeto de mayor peso alcanzará una altura menor.",
    ],
    correcta: 2,
    explicacion:
      "En el vacío todos caen con la misma aceleración g, sin importar la masa (Galileo). Truco: en vacío la masa no importa.",
    detalle:
      "Sin aire, la única fuerza es el peso y la aceleración es g para ambos; misma altura y mismo tiempo.",
  },
  {
    id: 55,
    tema: "Ciencias naturales",
    nivel: "fácil",
    enunciado:
      "Con respecto a la velocidad lineal (o tangencial) en un movimiento circular uniforme, se puede afirmar que",
    opciones: [
      "la magnitud y la dirección son constantes.",
      "la magnitud es constante, pero la dirección cambia.",
      "la magnitud y la dirección cambian.",
      "la magnitud cambia, pero la dirección es constante.",
    ],
    correcta: 1,
    explicacion:
      "En MCU la rapidez (magnitud) es constante pero la dirección (tangente) cambia todo el tiempo; por eso hay aceleración centrípeta. Truco: uniforme = rapidez constante, pero gira.",
    detalle:
      "La velocidad tangencial mantiene su magnitud pero cambia continuamente de dirección.",
  },
  {
    id: 56,
    tema: "Matemáticas",
    nivel: "media",
    enunciado:
      "Al simplificar la expresión $(2^4 \\times 3^3 \\times 25^3 \\times 6^5) / (2^{12} \\times 10^2 \\times 15^2)$ se obtiene:",
    opciones: [
      "$(3^3 \\times 5^6)/(2^8 \\times 150^2)$",
      "$(3^3 \\times 5^4 \\times 6^5)/(2^5 \\times 10^2)$",
      "$(3^6 \\times 5^2)/2^5$",
      "$(3^3 \\times 5^6)/(2^8 \\times 150^2)$",
    ],
    correcta: 2,
    explicacion:
      "Descompón todo en primos: 25³=5⁶, 6⁵=2⁵·3⁵, 10²=2²·5², 15²=3²·5². Suma exponentes arriba, resta abajo. Resultado 3⁶·5²/2⁵. Truco: convierte todo a primos 2,3,5.",
    detalle:
      "Num: 2⁴·3³·5⁶·2⁵·3⁵ = 2⁹·3⁸·5⁶. Den: 2¹²·2²·5²·3²·5² = 2¹⁴·3²·5⁴. Cociente: 2⁻⁵·3⁶·5² = 3⁶·5²/2⁵.",
    formula: "\\frac{2^9 3^8 5^6}{2^{14}3^2 5^4}=\\frac{3^6 5^2}{2^5}",
  },
  {
    id: 57,
    tema: "Matemáticas",
    nivel: "media",
    enunciado:
      "Acerca de la ecuación $\\log_2 x = \\log_4(x + 12)$ es correcto afirmar que",
    opciones: [
      "no tiene soluciones reales.",
      "tiene una única solución.",
      "tiene dos soluciones positivas.",
      "tiene dos soluciones en el intervalo [−5, 5].",
    ],
    correcta: 1,
    explicacion:
      "log₄(x+12) = (1/2)log₂(x+12). Entonces 2log₂x = log₂(x+12) → x² = x+12 → x=4 o x=−3. Pero x=−3 no vale (log de negativo). Solo x=4. Truco: verifica el dominio.",
    detalle:
      "x²−x−12=0 → x=4 o x=−3; x=−3 se descarta por dominio. Única solución x=4.",
    formula: "x^2=x+12\\Rightarrow x=4",
  },
  {
    id: 58,
    tema: "Matemáticas",
    nivel: "media",
    enunciado: "Considere los siguientes enunciados:",
    afirmaciones: [
      "Si cos 2x > 0, entonces cos x > 0.",
      "(sen x)(cos x) < 1 para todo número real x.",
    ],
    opciones: [
      "(1) y (2) son verdaderos.",
      "(1) y (2) son falsos.",
      "(1) es falso y (2) es verdadero.",
      "(1) es verdadero y (2) es falso.",
    ],
    correcta: 2,
    explicacion:
      "(1) es falso: con x=π, cos2x=1>0 pero cosx=−1<0. (2) es verdadero: senx·cosx = (1/2)sen2x ≤ 1/2 < 1. Truco: busca un contraejemplo para (1).",
    detalle:
      "x=π refuta (1). (sen x)(cos x) = (1/2)sen 2x < 1 siempre.",
    formula: "\\sin x\\cos x=\\frac{1}{2}\\sin 2x<1",
  },
];

export const configSimulacroGeneral: Omit<
  SimulacroDef,
  "preguntas" | "lecturas"
> = {
  id: "general",
  titulo: "Simulacro General",
descripcion:
    "58 preguntas: 11 de Análisis de la imagen, 15 de comprensión lectora, 29 de Ciencias naturales y 3 de Matemáticas, del cuadernillo oficial de la Universidad Nacional.",
  componente: "General",
  totalPreguntas: 58,
  segundosPorPregunta: 105,
  minutosExtra: 5,
};

export const simulacroGeneralDef: SimulacroDef = {
  ...configSimulacroGeneral,
  preguntas: preguntasGeneral,
  lecturas: [lecturaCarta],
};

export const TIEMPO_GENERAL_SEGUNDOS =
  configSimulacroGeneral.totalPreguntas *
    configSimulacroGeneral.segundosPorPregunta +
  configSimulacroGeneral.minutosExtra * 60;
