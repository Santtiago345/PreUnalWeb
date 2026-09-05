import type { GraficoPolinomio } from "@/components/simulacro/Grafico";

export type Nivel = "fácil" | "media" | "difícil";

export type PreguntaSimulacro = {
  id: number;
  tema: string;
  nivel: Nivel;
  enunciado: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
  detalle: string;
  formula?: string;
  grafico?: GraficoPolinomio;
};

export type SimulacroConfig = {
  titulo: string;
  descripcion: string;
  totalPreguntas: number;
  segundosPorPregunta: number;
  minutosExtra: number;
};

export const configSimulacro: SimulacroConfig = {
  titulo: "Simulacro de Matemáticas",
  descripcion:
    "25 preguntas basadas en el componente de Matemáticas de la prueba de admisión de la Universidad Nacional (pensamiento numérico, espacial y métrico, aleatorio y variacional), elaboradas a partir del cuadernillo oficial «Simulacro AU» de la Dirección Nacional de Admisiones.",
  totalPreguntas: 25,
  segundosPorPregunta: 105,
  minutosExtra: 5,
};

export const TIEMPO_TOTAL_SEGUNDOS =
  configSimulacro.totalPreguntas * configSimulacro.segundosPorPregunta +
  configSimulacro.minutosExtra * 60;

const DIFICULTAD: Record<Nivel, number> = {
  fácil: -1.2,
  media: -0.2,
  difícil: 0.9,
};

export const dificultadDe = (nivel: Nivel) => DIFICULTAD[nivel];

export const preguntasMatematicas: PreguntaSimulacro[] = [
  {
    id: 1,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "El producto de dos números es igual a 84. ¿Cuál sería este producto si el multiplicando y el multiplicador se multiplicaran a su vez por 5?",
    opciones: ["250", "420", "3.200", "2.100"],
    correcta: 3,
    explicacion:
      "Si multiplicas ambos factores por 5, el producto se multiplica por 5 × 5 = 25. Truco: 84 × 25 = 84 × (100 ÷ 4) = 2.100.",
    detalle:
      "$(a\\cdot b)=84$. Entonces $(5a)(5b)=25ab=25\\times 84=2.100$.",
    formula: "(5a)(5b)=25ab=25\\times 84=2.100",
  },
  {
    id: 2,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado: "¿Qué tanto por ciento de 1 es 0,2?",
    opciones: ["$\\frac{1}{2}$", "$\\frac{1}{4}$", "20", "10"],
    correcta: 2,
    explicacion:
      "0,2 = 20/100 = 20 %. Truco: 0,2 son 2 décimas, es decir 20 de cada 100.",
    detalle: "$\\frac{0,2}{1}\\times 100 = 20\\%$.",
    formula: "\\frac{0,2}{1}\\times 100 = 20\\%",
  },
  {
    id: 3,
    tema: "Espacial y métrico",
    nivel: "fácil",
    enunciado: "Un recipiente de 1 metro cúbico contiene:",
    opciones: ["100 litros", "1.000 litros", "10.000 litros", "100.000 litros"],
    correcta: 1,
    explicacion:
      "1 m³ = 1.000 dm³ = 1.000 litros. Truco: un metro cúbico equivale exactamente a mil litros.",
    detalle: "1 m³ = 1.000 L.",
    formula: "1\\ m^3 = 1.000\\ L",
  },
  {
    id: 4,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "Dos números son entre sí como 5 es a 2. Si su suma es igual a 49, los números son:",
    opciones: ["14 y 35", "5 y 44", "7 y 42", "10 y 39"],
    correcta: 0,
    explicacion:
      "Están en razón 5:2, así que representalos por 5k y 2k. Como 5k + 2k = 7k = 49, k = 7; los números son 35 y 14. Truco: divide la suma entre la suma de la razón.",
    detalle: "$5k+2k=49 \\Rightarrow k=7$. Números: $35$ y $14$.",
    formula: "5k+2k=49 \\Rightarrow k=7",
  },
  {
    id: 5,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "Una vendedora cambió naranjas por peras a razón de 3 por 1. Si entregó 42 docenas de naranjas, ¿cuántas peras recibió?",
    opciones: ["136", "144", "168", "172"],
    correcta: 2,
    explicacion:
      "42 docenas = 42 × 12 = 504 naranjas. Por cada 3 naranjas recibe 1 pera: 504 ÷ 3 = 168. Truco: convierte docenas a unidades antes de dividir.",
    detalle: "$42\\times 12 = 504$; $504 \\div 3 = 168$ peras.",
    formula: "\\frac{42\\times 12}{3}=168",
  },
  {
    id: 6,
    tema: "Pensamiento numérico",
    nivel: "media",
    enunciado:
      "Por 5 metros de tela y 12 metros de paño se pagaron $168.500, y por 20 metros de tela y 3 metros de paño $89.000. ¿Cuánto cuesta un metro de paño?",
    opciones: ["$14.050", "$13.000", "$12.250", "$11.000"],
    correcta: 1,
    explicacion:
      "Plantea dos ecuaciones. Multiplica la primera por 4 para igualar la tela y resta: 45p = 585.000, así que p = 13.000. Truco: elimina la variable de la tela.",
    detalle:
      "$5t+12p=168.500$; $20t+3p=89.000$. Multiplicando la primera por 4: $20t+48p=674.000$. Restando: $45p=585.000 \\Rightarrow p=13.000$.",
    formula: "\\text{paño}=\\$13.000",
  },
  {
    id: 7,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "Una llave llena un estanque en 12 horas, mientras que otra lo hace en 4. Si se abren las dos llaves al tiempo, ¿cuántas horas se necesitan para llenar el estanque?",
    opciones: ["3", "8", "6", "2"],
    correcta: 0,
    explicacion:
      "Suma las velocidades: 1/12 + 1/4 = 1/12 + 3/12 = 4/12 = 1/3 del estanque por hora. Tiempo = 3 horas. Truco: la llave de 4 h aporta 3 veces más rápido.",
    detalle:
      "$\\frac{1}{12}+\\frac{1}{4}=\\frac{1}{3}$; tiempo = $1/(1/3)=3$ horas.",
    formula: "\\frac{1}{12}+\\frac{1}{4}=\\frac{1}{3}\\Rightarrow t=3",
  },
  {
    id: 8,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado: "Los $\\frac{3}{4}$ de los $\\frac{4}{5}$ de 45 son iguales a:",
    opciones: ["15", "21", "33", "27"],
    correcta: 3,
    explicacion:
      "Multiplica las fracciones: (3/4)(4/5) = 12/20 = 3/5. Luego (3/5) × 45 = 27. Truco: los 4 se cancelan entre sí.",
    detalle: "$\\frac{3}{4}\\times\\frac{4}{5}\\times 45 = \\frac{3}{5}\\times 45 = 27$.",
    formula: "\\frac{3}{4}\\times\\frac{4}{5}\\times 45 = 27",
  },
  {
    id: 9,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "Un dependiente reparte 720 nueces en 3 cajas, colocando cada vez en la primera 2, en la segunda 3 y en la tercera 4. ¿Cuántas nueces coloca en la tercera caja?",
    opciones: ["80", "160", "240", "320"],
    correcta: 3,
    explicacion:
      "Reparto en razón 2:3:4. La tercera recibe 4 de un total de 9 partes: (4/9) × 720 = 320. Truco: 720 ÷ 9 = 80 por parte, × 4 = 320.",
    detalle: "Total de partes = 2 + 3 + 4 = 9. Tercera = (4/9) × 720 = 320.",
    formula: "\\frac{4}{2+3+4}\\times 720 = 320",
  },
  {
    id: 10,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado: "¿Cuál de las siguientes afirmaciones es verdadera?",
    opciones: [
      "Todo número primo es impar.",
      "Ningún número primo es igual a la suma de dos números primos.",
      "Ningún número primo divide exactamente a otro número primo.",
      "El cuadrado de un número primo es siempre un número primo.",
    ],
    correcta: 2,
    explicacion:
      "El 2 es primo y par (descarta A); 5 = 2 + 3 (descarta B); 2² = 4 no es primo (descarta D). La única cierta: un primo no divide exactamente a otro primo distinto. Truco: busca contraejemplos.",
    detalle:
      "C es verdadera: dos primos distintos solo comparten el divisor 1, por lo que ninguno divide exactamente al otro.",
  },
  {
    id: 11,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "Considere los números a = 124 y b = 34. (1) El máximo común divisor de a y b es 2. (2) El mínimo común múltiplo de a y b es $2^2 \\times 17 \\times 31$.",
    opciones: [
      "(1) y (2) son verdaderas.",
      "(1) es verdadera y (2) es falsa.",
      "(1) es falsa y (2) es verdadera.",
      "(1) y (2) son falsas.",
    ],
    correcta: 0,
    explicacion:
      "Descompón: 124 = 2² × 31 y 34 = 2 × 17. MCD = 2 (verdadero). MCM = 2² × 17 × 31 = 2.108 (verdadero). Truco: el MCD toma el menor exponente y el MCM el mayor.",
    detalle: "MCD(124,34) = 2. MCM = 2²·17·31 = 2.108.",
    formula: "124=2^2\\times31;\\quad 34=2\\times17",
  },
  {
    id: 12,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "Juan vendió algunas revistas cada una a $24.000 y tuvo dinero suficiente para comprar boletas para un concierto, cada una de las cuales costaba $50.000. Se quedó sin dinero después de comprarlas. La menor cantidad de revistas que debió haber vendido Juan es:",
    opciones: ["15", "25", "40", "50"],
    correcta: 1,
    explicacion:
      "El dinero (24.000 × n) debe ser múltiplo de 50.000. El menor n que lo logra es 25: 25 × 24.000 = 600.000 = 12 × 50.000. Truco: busca el menor múltiplo común.",
    detalle:
      "mcm(24.000, 50.000) = 600.000 → n = 600.000 ÷ 24.000 = 25.",
    formula: "mcm(24000,50000)=600000\\Rightarrow n=25",
  },
  {
    id: 13,
    tema: "Pensamiento numérico",
    nivel: "media",
    enunciado:
      "Al escribir $3\\log_2 x - 7\\log_2 x^3 + \\log_2 z$ como un solo logaritmo se obtiene:",
    opciones: [
      "$\\log_2(3x-7x^3+z)$",
      "$\\log_2(21x^4z)$",
      "$\\log_2(x^3-x^{21})z$",
      "$\\log_2\\frac{z}{x^{18}}$",
    ],
    correcta: 3,
    explicacion:
      "Usa las propiedades de logaritmos: $3\\log_2 x = \\log_2 x^3$; $-7\\log_2 x^3 = \\log_2 x^{-21}$; y suma $\\log_2 z$. Resultado: $\\log_2(x^3\\cdot z/x^{21}) = \\log_2(z/x^{18})$. Truco: los exponentes se suman al multiplicar y se restan al dividir.",
    detalle:
      "$3\\log_2 x - 7\\log_2 x^3 + \\log_2 z = \\log_2 x^3 - \\log_2 x^{21} + \\log_2 z = \\log_2 \\frac{z}{x^{18}}$.",
    formula: "\\log\\frac{x^3 z}{x^{21}}=\\log\\frac{z}{x^{18}}",
  },
  {
    id: 14,
    tema: "Espacial y métrico",
    nivel: "fácil",
    enunciado:
      "Los rectángulos ABCD y EFGH son semejantes. El rectángulo ABCD tiene 14 metros de perímetro. La longitud de cada lado del rectángulo EFGH es 2,5 veces la del lado correspondiente de ABCD. El perímetro del rectángulo EFGH, en metros, es:",
    opciones: ["24", "35", "28", "56"],
    correcta: 1,
    explicacion:
      "Al multiplicar los lados por 2,5, el perímetro también se multiplica por 2,5: 14 × 2,5 = 35. Truco: el perímetro escala igual que los lados.",
    detalle: "P(EFGH) = 2,5 × 14 = 35 m.",
    formula: "P_{EFGH}=2,5\\times P_{ABCD}=2,5\\times 14=35",
  },
  {
    id: 15,
    tema: "Espacial y métrico",
    nivel: "fácil",
    enunciado:
      "La distancia entre dos ciudades es de 50 millas, y un viajero ha recorrido 20 kilómetros. Si una milla equivale a 1,609 km, para llegar a la otra ciudad le restan:",
    opciones: [
      "menos de 40 km",
      "entre 40 y 55 km",
      "entre 55 y 70 km",
      "más de 70 km",
    ],
    correcta: 2,
    explicacion:
      "50 millas = 50 × 1,609 = 80,45 km. Le resta 80,45 − 20 = 60,45 km, que está entre 55 y 70. Truco: convierte todo a la misma unidad.",
    detalle: "50 × 1,609 = 80,45 km; 80,45 − 20 = 60,45 km.",
    formula: "50\\times 1,609 - 20 = 60,45\\ km",
  },
  {
    id: 16,
    tema: "Espacial y métrico",
    nivel: "fácil",
    enunciado:
      "El volumen de un cono se calcula con $V = \\frac{1}{3}A\\cdot h$, donde A es el área de la base y h la altura. Si un cono tiene como base un círculo de radio 3 m y su altura es de 5 m, entonces su volumen está entre:",
    opciones: ["15 y 30 m³", "60 y 75 m³", "30 y 45 m³", "45 y 60 m³"],
    correcta: 3,
    explicacion:
      "A = π × 3² = 9π ≈ 28,27. V = (1/3) × 9π × 5 = 15π ≈ 47,1 m³, que está entre 45 y 60. Truco: usa π ≈ 3,14 y aproxima.",
    detalle: "V = (1/3)(9π)(5) = 15π ≈ 47,12 m³.",
    formula: "V=\\frac{1}{3}\\pi r^2 h=\\frac{1}{3}\\pi\\cdot 9\\cdot 5=15\\pi",
  },
  {
    id: 17,
    tema: "Espacial y métrico",
    nivel: "media",
    enunciado:
      "Los lados de un triángulo son a, b y c y verifican la relación $3a = 2b = c$. El perímetro del triángulo es:",
    opciones: ["$\\frac{11a}{2}$", "$\\frac{11a}{3}$", "$\\frac{9a}{2}$", "$\\frac{8a}{3}$"],
    correcta: 0,
    explicacion:
      "De $3a = c$ se tiene c = 3a; de $2b = 3a$, b = 3a/2. Perímetro = a + 3a/2 + 3a = 11a/2. Truco: expresa todos los lados en función de a.",
    detalle: "c = 3a; b = 3a/2. P = a + 3a/2 + 3a = (2a + 3a + 6a)/2 = 11a/2.",
    formula: "P=a+\\frac{3a}{2}+3a=\\frac{11a}{2}",
  },
  {
    id: 18,
    tema: "Espacial y métrico",
    nivel: "media",
    enunciado:
      "Las medidas de los lados de un triángulo rectángulo e isósceles son 6 cm y $6\\sqrt{2}$ cm. El radio de la circunferencia que se puede circunscribir en este triángulo es:",
    opciones: ["$6\\sqrt{2}$ cm", "3 cm", "$3\\sqrt{2}$ cm", "6 cm"],
    correcta: 2,
    explicacion:
      "En un triángulo rectángulo, el circunradio es la mitad de la hipotenusa. La hipotenusa es 6√2, así que R = 3√2. Truco: el centro de la circunferencia circunscrita está en el punto medio de la hipotenusa.",
    detalle: "R = hipotenusa ÷ 2 = 6√2 ÷ 2 = 3√2 cm.",
    formula: "R=\\frac{6\\sqrt{2}}{2}=3\\sqrt{2}\\ cm",
  },
  {
    id: 19,
    tema: "Pensamiento aleatorio",
    nivel: "media",
    enunciado:
      "En un estudio sobre los puntajes de los aspirantes a la Universidad Nacional, el promedio fue 500 puntos y la desviación estándar 100. La desviación estándar es el valor que, al restarse dos veces del promedio y sumarse dos veces, da los extremos del intervalo donde se encuentra el 95 % de los puntajes. Si todo admitido a Medicina está por lo menos una desviación estándar por encima del promedio, considere: (1) Una persona con 800 puntos supera al menos al 95 % de los aspirantes. (2) Un aspirante a Medicina con 590 puntos no es admitido.",
    opciones: [
      "(1) es verdadera y (2) es falsa.",
      "(1) y (2) son verdaderas.",
      "(1) es falsa y (2) es verdadera.",
      "(1) y (2) son falsas.",
    ],
    correcta: 1,
    explicacion:
      "El 95 % está entre 500 − 2·100 = 300 y 500 + 2·100 = 700. 800 > 700 → supera al 95 % (1 verdadera). Medicina exige al menos 600; 590 < 600 → no admitido (2 verdadera). Truco: usa el intervalo μ ± 2σ.",
    detalle: "Intervalo del 95 %: [300, 700]. 800 supera. Medicina ≥ 500 + 100 = 600; 590 < 600.",
    formula: "\\mu\\pm 2\\sigma = 500\\pm 200 = [300,700]",
  },
  {
    id: 20,
    tema: "Pensamiento variacional",
    nivel: "difícil",
    enunciado:
      "La gráfica corresponde a la curva $y = x^5 - x^3 - 2x + 1$. De la ecuación $x^5 - x^3 - 2x + 1 = 0$ es correcto afirmar que:",
    opciones: [
      "tiene cinco soluciones reales.",
      "tiene sólo una solución real positiva.",
      "no tiene soluciones reales.",
      "tiene dos soluciones reales positivas.",
    ],
    correcta: 3,
    explicacion:
      "La curva corta el eje x tres veces (una para x < 0 y dos para x > 0), así que hay dos soluciones reales positivas. Truco: cuenta los cruces con el eje x en la gráfica.",
    detalle:
      "Por el criterio de Descartes hay 2 o 0 raíces positivas; como f(0) > 0, f(0,5) < 0 y f(2) > 0, hay exactamente dos positivas (y una negativa).",
    formula: "x^5-x^3-2x+1=0",
    grafico: { coefs: [1, 0, -1, 0, -2, 1], dominio: [-2, 2] },
  },
  {
    id: 21,
    tema: "Pensamiento variacional",
    nivel: "fácil",
    enunciado:
      "Considere las funciones $f(x) = x^2 - 1$ y $g(x) = \\frac{1}{2x}$. El valor de $(g \\circ f)(-2)$ es:",
    opciones: ["$-\\frac{15}{16}$", "$\\frac{1}{6}$", "6", "$\\frac{1}{16}$"],
    correcta: 1,
    explicacion:
      "Primero resuelve f(−2) = 4 − 1 = 3; luego g(3) = 1/(2·3) = 1/6. Truco: resuelve primero la función de adentro.",
    detalle: "f(−2) = 3; g(3) = 1/6.",
    formula: "f(-2)=3,\\quad g(3)=\\frac{1}{6}",
  },
  {
    id: 22,
    tema: "Pensamiento aleatorio",
    nivel: "media",
    enunciado:
      "En la tabla se presentan las notas obtenidas por un grupo de estudiantes: 2,5 · 3,5 · 4,0 · 5,0 · 1,0 · 3,0 · 4,5 · 3,5. (1) La nota promedio es 3,5. (2) La moda en las notas es 3,5.",
    opciones: [
      "(1) y (2) son verdaderas.",
      "(1) es verdadera y (2) es falsa.",
      "(1) y (2) son falsas.",
      "(1) es falsa y (2) es verdadera.",
    ],
    correcta: 3,
    explicacion:
      "Promedio = 27 ÷ 8 = 3,375, no 3,5 (1 falsa). La moda (el valor que más se repite) es 3,5 (2 verdadera). Truco: no confundas promedio con moda.",
    detalle: "Suma = 27; promedio = 27/8 = 3,375. La moda es 3,5.",
    formula: "\\bar{x}=\\frac{27}{8}=3,375",
  },
  {
    id: 23,
    tema: "Pensamiento variacional",
    nivel: "fácil",
    enunciado:
      "Del sistema $\\begin{cases} ax + y = 1 \\\\ 2x - y = 2 \\end{cases}$ es correcto afirmar que si a = −2, entonces:",
    opciones: [
      "tiene infinitas soluciones.",
      "tiene solución única.",
      "no tiene solución.",
      "tiene dos soluciones.",
    ],
    correcta: 2,
    explicacion:
      "Con a = −2: −2x + y = 1 y 2x − y = 2. Al sumar las dos, 0 = 3, una contradicción → no tiene solución. Truco: cuando las ecuaciones son paralelas, el sistema es inconsistente.",
    detalle:
      "$-2x+y=1$ y $2x-y=2$; sumando: $0=3$, por lo que no hay solución.",
    formula: "\\begin{cases}-2x+y=1\\\\2x-y=2\\end{cases}\\Rightarrow 0=3",
  },
  {
    id: 24,
    tema: "Pensamiento variacional",
    nivel: "fácil",
    enunciado: "El número que corresponde a $\\int_{1}^{6} 2x\\,dx$ es igual a:",
    opciones: ["35", "25", "11", "10"],
    correcta: 0,
    explicacion:
      "La antiderivada de 2x es x². Evalúa de 1 a 6: 36 − 1 = 35. Truco: ∫2x dx = x² + C.",
    detalle: "$[x^2]_1^6 = 36 - 1 = 35$.",
    formula: "\\int_1^6 2x\\,dx = [x^2]_1^6 = 36-1 = 35",
  },
  {
    id: 25,
    tema: "Pensamiento variacional",
    nivel: "fácil",
    enunciado:
      "Para hallar los números reales que satisfacen $\\sqrt{x} = x$ se utilizó el siguiente razonamiento: 1. Se eleva al cuadrado, entonces x = x². 2. Se cancela x, por lo tanto x = 1. Es correcto afirmar que el razonamiento:",
    opciones: [
      "no es válido porque el cuadrado de un número es igual al cuadrado de su opuesto.",
      "es válido porque se está cancelando el mismo número.",
      "es válido porque se puede elevar al cuadrado.",
      "no es válido porque no se puede dividir por cero.",
    ],
    correcta: 3,
    explicacion:
      "Al 'cancelar x' se está dividiendo por x, lo cual es inválido si x = 0; además se pierde la solución x = 0. Truco: nunca dividas por una variable que puede ser cero.",
    detalle:
      "$x = x^2 \\Rightarrow x^2 - x = 0 \\Rightarrow x(x-1) = 0$, de donde x = 0 o x = 1. Dividir por x elimina la solución x = 0.",
    formula: "x^2-x=0\\Rightarrow x(x-1)=0",
  },
];