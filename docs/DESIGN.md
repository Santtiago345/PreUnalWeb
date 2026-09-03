# Guía de Identidad Visual — PreUnalWeb

Identidad orientada al **Cabildo Indígena Muisca de Bosa** y a la preparación para el examen de admisión de la **Universidad Nacional de Colombia**.

## Fundamentos

La identidad toma inspiración de la cosmovisión muisca:

- **El caracol chigüizo y la espiral** — símbolo del tiempo, los ciclos y la preparación continua.
- **El huso y el telar** — el tejido como construcción de conocimiento.
- **El sol** — energía, guía e iluminación.
- **La laguna y la siembra** — el territorio de Bosa como lugar de cultivo y defensa.

## Paleta de color

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `forest-deep` | Verde bosque profundo | `#07150E` | Fondo oscuro (dark mode) |
| `forest` | Verde bosque | `#0E2A1F` | Fondo / texto en modo claro |
| `forest-800` | Verde hoja | `#143A2A` | Superficies elevadas |
| `forest-700` | Verde selva | `#1B4C36` | Superficies en dark |
| `forest-600` | Verde musgo | `#236045` | Bordes y degradados |
| `sage` | Verde salvia | `#7FAE8A` | Bordes y soportes |
| `emerald` | Verde esmeralda | `#2EC27E` | CTAs, acentos y estados activos |
| `emerald-soft` | Esmeralda suave | `#3FDD95` | Final de degradados |
| `ocre` | Ocre dorado | `#E8B04B` | Destacados positivos (sol) |
| `ocre-soft` | Ocre claro | `#F2C878` | Degradados cálidos |
| `terracotta` | Terracota | `#C0572B` | Acento cálido (tierra) |
| `terracotta-soft` | Terracota suave | `#D97A4A` | Degradados cálidos |
| `cream` | Crema | `#F7F0E3` | Fondo modo claro |
| `coral` | Coral vivo | `#FF6B5B` | Alertas y fechas críticas |
| `lagoon` | Azul laguna | `#3B82F6` | Información y enlaces |
| `ivory` | Marfil | `#FFF9EF` | Texto sobre fondos oscuros |

### Reglas de uso
- **Dark mode es el predeterminado** (ideal para estudio nocturno); el toggle guarda la preferencia en `localStorage`.
- CTAs primarios usan degradado `emerald → emerald-soft` sobre texto `forest-deep`.
- El `ocre` se reserva para el sol, hitos y valores positivos.
- El `coral` solo para fechas críticas o errores.

## Tipografía

| Rol | Fuente | Uso |
|-----|--------|-----|
| Display | **Fraunces** (serif variable) | Títulos y encabezados |
| Sans | **Space Grotesk** | Interfaz y cuerpo |
| Mono | **JetBrains Mono** | Números, puntajes, cronómetros |

Reglas:
- Títulos en `font-display` con `tracking-tight`.
- Datos numéricos (puntajes, tiempos) en `font-mono` con `tabular-nums`.

## Patrones e iconografía

- **Patrón muisca** (`bg-muisca`): rombos concéntricos SVG (tejido textil) en esmeralda al 8 %.
- **Patrón cálido** (`bg-muisca-warm`): zigzag en ocre al 10 %.
- **Marca** (`Logo`): sol con huso — diamantes concéntricos, estrella exterior y núcleo esmeralda→ocre.
- **Motivo decorativo** (`SpindleSun`): sol en espiral con rotación lenta (`animate-spin-slow`, 40 s).

## Animación

| Token | Valor | Uso |
|-------|-------|-----|
| `animate-spin-slow` | 40 s rotación | Sol/huso decorativo |
| `animate-float` | 7 s rebote | Elementos decorativos |
| `animate-float-delayed` | 9 s, delay 1.2 s | Variantes flotantes |

Componente `Reveal`: fade-up al entrar en viewport (ease `[0.22, 1, 0.36, 1]`, 0.6 s), una sola vez. Respeta `prefers-reduced-motion`.

## Superficies

- `.glass`: tarjetas translúcidas con `backdrop-blur-xl` (blanco 70 % en claro, blanco 5 % en oscuro).
- `.glass-strong`: tarjetas más sólidas para contenidos destacados.
- Bordes redondeados de 16–24 px (`rounded-2xl`/`rounded-3xl`) en tarjetas y modales.

## Layout y navegación

- **Móvil**: tab bar inferior fijo (5 destinos: Inicio, Examen, Simulacros, Puntajes, Más) con *bottom sheet* para el resto.
- **Desktop**: header fijo con navegación superior completa.
- Margen superior para tab bar en móvil: `pb-[env(safe-area-inset-bottom)]`.
- Áreas táctiles ≥ 44 px y estados `focus-visible` con anillo esmeralda.

## Accesibilidad

- Contraste AA sobre fondos `forest-deep` e `ivory`.
- `prefers-reduced-motion` respetado en animaciones.
- Skip-link, `aria-label` en botones de icono y `aria-current` en navegación activa.