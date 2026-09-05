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
    "25 preguntas basadas en el componente de Matemáticas de la prueba de admisión de la Universidad Nacional (pensamiento numérico, espacial y métrico, aleatorio y variacional).",
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
      "Una tableta cuesta $680.000 y tiene un descuento del 15 %. ¿Cuánto se paga finalmente por ella?",
    opciones: ["$102.000", "$578.000", "$612.000", "$680.000"],
    correcta: 1,
    explicacion:
      "No confundas el descuento con el precio final. Primero calcula el 15 % de $680.000 (que es $102.000) y luego réstalo. Truco: pagar con 15 % de descuento es pagar el 85 %, así que multiplica directo: $680.000 × 0,85.",
    detalle:
      "Descuento = $680.000 × 0,15 = $102.000. Precio final = $680.000 − $102.000 = $578.000. Equivalente a $680.000 × 0,85 = $578.000.",
    formula: "Precio\\ final = Precio\\ original \\times (1 - \\frac{descuento}{100})",
  },
  {
    id: 2,
    tema: "Pensamiento numérico",
    nivel: "fácil",
    enunciado:
      "Si 5 kg de naranjas cuestan $18.000, ¿cuánto cuestan 8 kg?",
    opciones: ["$28.800", "$22.500", "$36.000", "$2.880"],
    correcta: 0,
    explicacion:
      "Usa regla de tres directa. Primero halla el precio de 1 kg dividiendo y luego multiplica por 8. Truco: $18.000 ÷ 5 = $3.600 por kilo; × 8 = $28.800.",
    detalle:
      "Precio por kg = $18.000 ÷ 5 = $3.600. Precio de 8 kg = $3.600 × 8 = $28.800.",
    formula: "\\frac{5\\ kg}{\\$18.000} = \\frac{8\\ kg}{x} \\Rightarrow x = \\$28.800",
  },
  {
    id: 3,
    tema: "Pensamiento numérico",
    nivel: "media",
    enunciado: "El resultado de $\\frac{3}{4} + \\frac{5}{6} - \\frac{2}{3}$ es:",
    opciones: ["$\\frac{11}{12}$", "$\\frac{6}{7}$", "$1$", "$\\frac{7}{12}$"],
    correcta: 0,
    explicacion:
      "Usa denominador común 12. Convierte cada fracción: 3/4 = 9/12, 5/6 = 10/12 y 2/3 = 8/12. Luego opera: 9 + 10 − 8 = 11 sobre 12. Truco: el 12 es el mcm de 4, 6 y 3.",
    detalle:
      "$\\frac{3}{4}=\\frac{9}{12}$, $\\frac{5}{6}=\\frac{10}{12}$, $\\frac{2}{3}=\\frac{8}{12}$. Entonces $\\frac{9}{12}+\\frac{10}{12}-\\frac{8}{12}=\\frac{11}{12}$.",
    formula: "mcm(4,6,3)=12",
  },
  {
    id: 4,
    tema: "Pensamiento numérico",
    nivel: "media",
    enunciado:
      "Se invierten $1.500.000 a un interés simple del 4 % anual. ¿Cuánto interés se genera en 5 años?",
    opciones: ["$60.000", "$120.000", "$300.000", "$375.000"],
    correcta: 2,
    explicacion:
      "El interés simple es proporcional al tiempo. Un año da el 4 % de $1.500.000 = $60.000. En 5 años: $60.000 × 5 = $300.000. Truco: calcula el interés de un año y multiplica.",
    detalle:
      "Interés anual = $1.500.000 × 0,04 = $60.000. Interés en 5 años = $60.000 × 5 = $300.000.",
    formula: "I = P \\times r \\times t",
  },
  {
    id: 5,
    tema: "Pensamiento numérico",
    nivel: "media",
    enunciado: "¿Cuál es el mínimo común múltiplo (mcm) de 8 y 12?",
    opciones: ["4", "24", "48", "96"],
    correcta: 1,
    explicacion:
      "Descompón en primos: 8 = 2³ y 12 = 2² × 3. El mcm toma el mayor exponente de cada primo: 2³ × 3 = 24. Truco: 24 es el primer múltiplo común de 8 y 12 (8×3 = 12×2).",
    detalle:
      "8 = 2³; 12 = 2² × 3. mcm = 2³ × 3 = 8 × 3 = 24.",
    formula: "mcm(8,12)=2^3 \\times 3 = 24",
  },
  {
    id: 6,
    tema: "Pensamiento numérico",
    nivel: "difícil",
    enunciado: "El valor de $(2^3 \\times 2^4) \\div 2^5$ es:",
    opciones: ["2", "4", "8", "16"],
    correcta: 1,
    explicacion:
      "Con la misma base se suman los exponentes al multiplicar y se restan al dividir: 3 + 4 − 5 = 2, y 2² = 4. Truco: no multipliques potencias enormes, opera exponentes.",
    detalle:
      "$2^3 \\times 2^4 = 2^{3+4} = 2^7$. Luego $2^7 \\div 2^5 = 2^{7-5} = 2^2 = 4$.",
    formula: "a^m \\times a^n = a^{m+n};\\quad a^m \\div a^n = a^{m-n}",
  },
  {
    id: 7,
    tema: "Pensamiento numérico",
    nivel: "difícil",
    enunciado:
      "Una imprenta con 4 máquinas produce 600 libros en 5 horas. ¿Cuántos libros producen 6 máquinas en 10 horas?",
    opciones: ["1.500", "1.800", "2.400", "900"],
    correcta: 1,
    explicacion:
      "Regla de tres compuesta. Halla cuánto produce una máquina en una hora: 600 ÷ (4×5) = 30 libros. Luego: 6 máquinas × 10 horas × 30 = 1.800. Truco: siempre reduce a la unidad.",
    detalle:
      "Producción por máquina por hora = 600 ÷ (4 × 5) = 30. Total = 6 × 10 × 30 = 1.800 libros.",
    formula: "600 \\ \\text{libros} = 4\\ \\text{máq} \\times 5\\ \\text{h} \\times r \\Rightarrow r=30",
  },
  {
    id: 8,
    tema: "Espacial y métrico",
    nivel: "fácil",
    enunciado:
      "Un tablero rectangular mide 40 cm de largo y 25 cm de ancho. Su área es:",
    opciones: ["130 cm²", "1.000 cm²", "100 cm²", "650 cm²"],
    correcta: 1,
    explicacion:
      "Área del rectángulo = largo × ancho. 40 × 25 = 1.000. Truco: 40 × 25 es 40 × (100 ÷ 4) = 4.000 ÷ 4 = 1.000.",
    detalle: "Área = 40 cm × 25 cm = 1.000 cm².",
    formula: "A = base \\times altura",
  },
  {
    id: 9,
    tema: "Espacial y métrico",
    nivel: "fácil",
    enunciado: "Un cuadrado tiene un área de 64 m². ¿Cuánto mide su perímetro?",
    opciones: ["32 m", "16 m", "8 m", "64 m"],
    correcta: 0,
    explicacion:
      "Si el área es 64 m², el lado es √64 = 8 m (porque 8×8=64). El perímetro es 4 × lado = 32 m. Truco: no confundas perímetro (suma de lados) con área.",
    detalle: "Lado = √64 = 8 m. Perímetro = 4 × 8 m = 32 m.",
    formula: "P = 4 \\times l;\\quad l = \\sqrt{A}",
  },
  {
    id: 10,
    tema: "Espacial y métrico",
    nivel: "media",
    enunciado: "Un triángulo tiene base 12 cm y altura 7 cm. Su área es:",
    opciones: ["84 cm²", "42 cm²", "21 cm²", "38 cm²"],
    correcta: 1,
    explicacion:
      "El área del triángulo es la mitad del producto base por altura. 12 × 7 = 84, y la mitad es 42. Truco: no olvides el ÷ 2 (olvidarlo es el error más común y da 84).",
    detalle: "Área = (12 cm × 7 cm) ÷ 2 = 84 ÷ 2 = 42 cm².",
    formula: "A = \\frac{base \\times altura}{2}",
  },
  {
    id: 11,
    tema: "Espacial y métrico",
    nivel: "media",
    enunciado: "Una caja tiene dimensiones 5 cm × 4 cm × 3 cm. Su volumen es:",
    opciones: ["12 cm³", "60 cm³", "20 cm³", "30 cm³"],
    correcta: 1,
    explicacion:
      "El volumen de una caja (prisma rectangular) es el producto de sus tres dimensiones: 5 × 4 × 3. Truco: 5×4 = 20 y 20×3 = 60.",
    detalle: "Volumen = 5 cm × 4 cm × 3 cm = 60 cm³.",
    formula: "V = largo \\times ancho \\times alto",
  },
  {
    id: 12,
    tema: "Espacial y métrico",
    nivel: "media",
    enunciado:
      "En un triángulo rectángulo, los catetos miden 6 y 8. ¿Cuánto mide la hipotenusa?",
    opciones: ["10", "14", "12", "48"],
    correcta: 0,
    explicacion:
      "Aplica el teorema de Pitágoras: c² = 6² + 8² = 36 + 64 = 100, luego c = 10. Truco: 6-8-10 es una terna pitagórica clásica (el doble de 3-4-5).",
    detalle: "$c^2 = 6^2 + 8^2 = 36 + 64 = 100$, por lo tanto $c = \\sqrt{100} = 10$.",
    formula: "c^2 = a^2 + b^2",
  },
  {
    id: 13,
    tema: "Espacial y métrico",
    nivel: "difícil",
    enunciado:
      "El área de un círculo de radio 7 cm, tomando π = 22/7, es:",
    opciones: ["44 cm²", "154 cm²", "308 cm²", "22 cm²"],
    correcta: 1,
    explicacion:
      "Área = π × r² = (22/7) × 7² = (22/7) × 49. El 7 del denominador se cancela con el 49: queda 22 × 7 = 154. Truco: usar π = 22/7 simplifica cuando el radio es múltiplo de 7.",
    detalle: "$A = \\pi r^2 = \\frac{22}{7} \\times 49 = 22 \\times 7 = 154$ cm².",
    formula: "A = \\pi r^2",
  },
  {
    id: 14,
    tema: "Espacial y métrico",
    nivel: "difícil",
    enunciado:
      "En un mapa a escala 1:50.000, dos ciudades están a 4 cm de distancia. La distancia real es:",
    opciones: ["2 km", "20 km", "0,2 km", "200 km"],
    correcta: 0,
    explicacion:
      "Escala 1:50.000 significa que 1 cm = 50.000 cm reales. Entonces 4 cm = 200.000 cm. Convierte: 100.000 cm = 1 km, así que 200.000 cm = 2 km. Truco: divide los cm entre 100.000 para pasar a km.",
    detalle:
      "Distancia real = 4 × 50.000 = 200.000 cm = 2.000 m = 2 km.",
    formula: "d_{real} = d_{mapa} \\times escala",
  },
  {
    id: 15,
    tema: "Pensamiento aleatorio",
    nivel: "fácil",
    enunciado: "Las notas de un estudiante son 3, 4, 5 y 8. Su promedio es:",
    opciones: ["4", "5", "6", "4,5"],
    correcta: 1,
    explicacion:
      "El promedio (media) es la suma dividida entre el número de datos. 3 + 4 + 5 + 8 = 20, y 20 ÷ 4 = 5. Truco: suma primero y divide entre cuántos datos hay.",
    detalle: "Promedio = (3 + 4 + 5 + 8) ÷ 4 = 20 ÷ 4 = 5.",
    formula: "\\bar{x} = \\frac{\\sum x_i}{n}",
  },
  {
    id: 16,
    tema: "Pensamiento aleatorio",
    nivel: "fácil",
    enunciado: "En la lista 2, 5, 3, 5, 7, 5, 9 la moda es:",
    opciones: ["2", "5", "7", "9"],
    correcta: 1,
    explicacion:
      "La moda es el dato que más se repite. El 5 aparece 3 veces, más que cualquier otro. Truco: solo cuenta cuántas veces aparece cada número.",
    detalle: "Frecuencias: 2→1, 3→1, 5→3, 7→1, 9→1. La moda es 5.",
  },
  {
    id: 17,
    tema: "Pensamiento aleatorio",
    nivel: "media",
    enunciado: "La mediana del conjunto {7, 2, 9, 4, 6} es:",
    opciones: ["4", "6", "7", "9"],
    correcta: 1,
    explicacion:
      "La mediana es el valor central de los datos ordenados. Ordena: 2, 4, 6, 7, 9. El del medio (posición 3) es 6. Truco: primero ordena, nunca calcules con el orden original.",
    detalle: "Datos ordenados: 2, 4, 6, 7, 9. Con 5 datos, la mediana es el tercero: 6.",
  },
  {
    id: 18,
    tema: "Pensamiento aleatorio",
    nivel: "media",
    enunciado:
      "Al lanzar un dado de 6 caras, la probabilidad de obtener un número par es:",
    opciones: ["1/6", "1/2", "1/3", "2/3"],
    correcta: 1,
    explicacion:
      "Casos favorables (pares: 2, 4, 6) son 3 de 6 posibles. 3/6 se simplifica a 1/2. Truco: la mitad de los números de un dado son pares.",
    detalle: "P(par) = 3/6 = 1/2.",
    formula: "P = \\frac{casos\\ favorables}{casos\\ posibles}",
  },
  {
    id: 19,
    tema: "Pensamiento aleatorio",
    nivel: "difícil",
    enunciado:
      "Al lanzar dos dados, la probabilidad de que la suma sea 7 es:",
    opciones: ["1/12", "1/6", "7/36", "1/2"],
    correcta: 1,
    explicacion:
      "Hay 36 resultados posibles (6 × 6). La suma 7 se logra con 6 combinaciones: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Por eso 6/36 = 1/6. Truco: la suma 7 es la más probable de todas.",
    detalle:
      "Casos favorables = 6; casos posibles = 36. P(suma = 7) = 6/36 = 1/6.",
    formula: "P(suma=7)=\\frac{6}{36}=\\frac{1}{6}",
  },
  {
    id: 20,
    tema: "Pensamiento variacional",
    nivel: "fácil",
    enunciado: "Si 2x + 6 = 14, el valor de x es:",
    opciones: ["3", "4", "8", "10"],
    correcta: 1,
    explicacion:
      "Despeja x: resta 6 a ambos lados (2x = 8) y divide entre 2 (x = 4). Truco: haz la operación inversa en orden: primero el +6, luego el ×2.",
    detalle: "2x + 6 = 14 → 2x = 8 → x = 4.",
  },
  {
    id: 21,
    tema: "Pensamiento variacional",
    nivel: "fácil",
    enunciado: "Si f(x) = 3x − 2, entonces f(4) es:",
    opciones: ["10", "12", "8", "14"],
    correcta: 0,
    explicacion:
      "Sustituye x por 4: f(4) = 3(4) − 2 = 12 − 2 = 10. Truco: multiplica primero y luego resta.",
    detalle: "f(4) = 3(4) − 2 = 12 − 2 = 10.",
  },
  {
    id: 22,
    tema: "Pensamiento variacional",
    nivel: "media",
    enunciado: "En la sucesión 5, 9, 13, 17, …, el décimo término es:",
    opciones: ["41", "37", "45", "40"],
    correcta: 0,
    explicacion:
      "Es una progresión aritmética con diferencia 4. Fórmula: aₙ = a₁ + (n−1)·d. Con n = 10: 5 + (10−1)·4 = 5 + 36 = 41. Truco: del primero al décimo hay 9 saltos de 4.",
    detalle:
      "a₁ = 5, d = 4. a₁₀ = 5 + 9×4 = 5 + 36 = 41.",
    formula: "a_n = a_1 + (n-1)d",
  },
  {
    id: 23,
    tema: "Pensamiento variacional",
    nivel: "media",
    enunciado: "La pendiente de la recta que pasa por (0, 2) y (3, 8) es:",
    opciones: ["2", "3", "1/2", "6"],
    correcta: 0,
    explicacion:
      "Pendiente = (y₂ − y₁) / (x₂ − x₁) = (8 − 2) / (3 − 0) = 6/3 = 2. Truco: es el cambio en y dividido entre el cambio en x.",
    detalle: "$m = \\frac{8 - 2}{3 - 0} = \\frac{6}{3} = 2$.",
    formula: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
  },
  {
    id: 24,
    tema: "Pensamiento variacional",
    nivel: "difícil",
    enunciado: "Las soluciones de $x^2 - 5x + 6 = 0$ son:",
    opciones: ["x = 2 y x = 3", "x = −2 y x = −3", "x = 1 y x = 6", "x = 5 y x = 6"],
    correcta: 0,
    explicacion:
      "Factoriza buscando dos números que multipliquen 6 y sumen 5: son 2 y 3. Entonces (x − 2)(x − 3) = 0, y x = 2 o x = 3. Truco: con signo − en el término del medio y + en el constante, ambas raíces son positivas.",
    detalle:
      "$x^2 - 5x + 6 = (x-2)(x-3) = 0$, de donde $x = 2$ o $x = 3$.",
    formula: "x^2 - (a+b)x + ab = (x-a)(x-b)",
  },
  {
    id: 25,
    tema: "Pensamiento variacional",
    nivel: "difícil",
    enunciado:
      "Una población de bacterias se duplica cada hora. Si se inicia con 10 bacterias, ¿cuántas habrá después de 4 horas?",
    opciones: ["80", "160", "40", "100"],
    correcta: 1,
    explicacion:
      "Crecimiento exponencial: cada hora se multiplica por 2. Después de 4 horas: 10 × 2⁴ = 10 × 16 = 160. Truco: 2⁴ = 16 (10, 20, 40, 80, 160 al duplicar paso a paso).",
    detalle:
      "Población = 10 × 2⁴ = 10 × 16 = 160 bacterias.",
    formula: "P(t) = P_0 \\times 2^{t}",
  },
];