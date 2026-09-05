# Optimización y Rendimiento — PreUnalWeb

Guía de optimización **obligatoria** para futuras funcionalidades y simulacros. Los tests automáticos del CI hacen cumplir estos límites.

## Cómo correr los tests

```bash
npm run build   # genera los chunks para el test de bundle
npm test        # corre los tests (calificación, datos, bundle)
```

El CI ejecuta `npm test` después del build en cada push/PR y publica un **resumen automático** con el tamaño del bundle en el reporte de la corrida.

## Reglas de rendimiento (muy importante)

Estas reglas existen porque el simulacro sufrió **colapso de RAM tras ~30 min** por re-renderizar todo cada segundo. Se aplican a partir de ahora.

### 1. Nunca pongas un `setInterval`/estado que se actualice por segundo en un componente con hijos pesados
- El cronómetro vive en su propio componente (`Cronometro`) y solo re-renderiza el número.
- Los hijos que no dependen del tiempo deben estar **aislados**.

### 2. Memoriza listas
- Toda lista de tarjetas (preguntas, contenido) debe usar `React.memo` y recibir props estables.
- En `ExamenVista` cada pregunta es `PreguntaCard` (memo): solo se re-renderiza cuando cambia **su** respuesta.

### 3. Cachea operaciones costosas
- El renderizado de **KaTeX** está cacheado en `src/components/simulacro/Math.tsx` (Map por cadena). No lo elimines.
- Los cálculos derivados en el admin usan `useMemo` (no recalculan todo en cada tick).

### 4. Usa refs para valores que no deben causar re-render
- `respuestas`, `faltas` y tiempo usan refs en el simulacro; el estado React solo cambia cuando algo debe re-renderizar.

### 5. Sondeo del panel admin
- El admin sondea sesiones cada 4 s **solo si la pestaña está visible** (`document.hidden`). No agregues más polling a otras páginas.

### 6. Presupuesto de bundle (tests/bundle.test.ts)
| Métrica | Límite |
|---|---|
| Total JS | 2150 KB |
| Chunk más grande | 500 KB |

Si un cambio supera el límite, el test **falla**. Antes de subir el límite: revisa si hay librerías pesadas que se puedan cargar de forma diferida (`next/dynamic`) o eliminar.

## Pruebas automáticas existentes

- `tests/calificacion.test.ts` — modelo Rasch, escala 10±1, penalización por faltas, simulación de sesión larga (3000 tics) que detecta regresiones de rendimiento.
- `tests/datos.test.ts` — integridad del banco (25 preguntas, opciones, respuestas, `$` de moneda no sueltos, fechas, puntajes).
- `tests/bundle.test.ts` — presupuesto de tamaño del bundle.

## Recomendaciones al agregar un simulacro nuevo
1. Reutiliza `ExamenVista`/`Cronometro`/`PreguntaCard` (ya optimizados) en vez de copiar.
2. Mantén las preguntas en el mismo formato (`PreguntaSimulacro`) para que los tests de datos las validen.
3. Agrega tests del nuevo simulacro al patrón existente.
4. Verifica con `npm run build && npm test` antes de hacer push (el CI lo repite).