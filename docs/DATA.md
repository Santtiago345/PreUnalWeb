# Fuentes de Datos — PreUnalWeb

Toda la información publicada en la plataforma proviene de **páginas oficiales de la Universidad Nacional de Colombia** y entidades oficiales. Cada dato incluye su fuente y fecha de verificación.

## 1. Prueba de Admisión

**Fuente principal:** [Dirección Nacional de Admisiones — Prueba de Admisión](https://admisiones.unal.edu.co/pregrado/prueba-de-admision/) · verificada el 02/09/2026.

### Datos oficiales extraídos

| Dato | Valor oficial |
|------|---------------|
| Componentes | 5 |
| Preguntas totales | 120 (opción múltiple, única respuesta) |
| Tiempo máximo total | 3 h 30 min (210 minutos) |
| Análisis textual | 25 preguntas |
| Matemáticas | 25 preguntas |
| Ciencias Naturales | 25 preguntas |
| Ciencias Sociales | 25 preguntas |
| Análisis de la imagen | 20 preguntas |
| Escala por componente | Media 10, desviación 1 |
| Escala puntaje total | Media 500, desviación 100 |
| Método de calificación | Teoría de Respuesta al Ítem — modelo de Rasch |

### Notas
- **Tiempos por componente:** la Universidad **no publica** tiempos individuales por componente; solo el tiempo máximo total (3 h 30 min). El "promedio por pregunta" (1 min 45 s) mostrado en la plataforma es un **valor derivado** (210 min ÷ 120 preguntas).
- **Normativa:** [Resolución 11 de 2025](https://legal.unal.edu.co/rlunal/home/doc.jsp?d_i=113211) de la Vicerrectoría Académica (deroga la Resolución 19 de 2022).

## 2. Fechas del proceso (convocatoria vigente)

**Fuente:** [Guía paso a paso — Pregrado](https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/) · verificada el 02/09/2026.

### Convocatoria cargada: 2027-1 (primer periodo académico de 2027)

| Paso | Fecha oficial |
|------|---------------|
| Pago de los derechos de inscripción (PIN) | 6 jul – 24 ago 2026 (ampliada) |
| Formalizar la inscripción | 6 jul – 24 ago 2026 (ampliada) |
| Consultar la citación | desde 31 ago 2026 |
| Prueba de admisión | domingo 20 sep 2026 |
| Publicación de puntajes | 1 oct 2026 |
| Inscripción de programa curricular | 1 – 6 oct 2026 |
| Publicación de admitidos | 9 oct 2026 |
| Postulación a programa con cupos (2) | 15 – 19 oct 2026 |
| Resultados a programa con cupos (2) | 22 oct 2026 |
| Postulación a programa con cupos (3) | 9 – 11 nov 2026 |
| Resultados a programa con cupos (3) | 13 nov 2026 |

> Incluye la ampliación oficial de fechas de pago e inscripción hasta el 24 de agosto de 2026 (publicada en la guía paso a paso).

### Exportación a calendarios
- Cada hito tiene un enlace "Agregar a Google Calendar" (URL `calendar.google.com/render?action=TEMPLATE`).
- Botón "Exportar a Google Calendar (.ics)": descarga un `.ics` con todos los eventos, importable en Google Calendar (Configuración → Importar).

## 3. Historial de puntajes (2015 → actualidad)

**Fuente:** [Estadísticas del proceso de admisión](https://admisiones.unal.edu.co/servicios-en-linea/estadisticas-del-proceso-de-admision/) — PDFs oficiales por semestre y sede.

### Estado actual (verificado el 02/09/2026)

| Alcance | Estado |
|---------|--------|
| Sede Bogotá · Semestre I · **2015–2022** | ✅ Cargado (49 programas, extraído del texto oficial del PDF) |
| Sede Bogotá · Semestre I · **2023–2026** | ⏳ Pendiente (PDF oficial escaneado; enlace directo en la plataforma) |
| Semestre II · cualquier año | ⏳ Pendiente |

### Metodología
- El valor publicado es el **puntaje del último admitido (corte)** de cada programa en el semestre I.
- Se toma el **mínimo** entre las columnas de puntaje del PDF oficial de cada año.
- **Promedio ponderado** = Σ(corte × admitidos) ÷ Σ(admitidos).
- El código de extracción vive fuera del repo (dir. temporal) y los datos verificados están en `src/data/puntajes.ts`, con fuentes en `src/data/fuentesPuntajes.ts`.

### Proceso para completar
1. Descargar el PDF oficial del semestre (ver `fuentesPuntajes.ts`).
2. Si el PDF tiene capa de texto (2015–2022): extraer el texto y parsear (el parser está documentado en este repositorio).
3. Si el PDF está escaneado (2023–2026): verificar el valor manualmente contra el documento antes de publicarlo.

## 4. PAES y programas de admisión especial

**Fuentes oficiales:** Resoluciones de la Vicerrectoría Académica (PAES), acuerdos del Consejo Superior Universitario (Acuerdo 12/1986 y 07/1995), páginas de las Sedes con programas especiales (PEAMA, PAET, PTIUN) y canales oficiales del Cabildo Muisca de Bosa.

> Se completará en la **Fase 5**.

## Regla de oro

Ningún dato se publica sin fuente oficial. Los valores derivados (promedios, cuentas) se calculan exclusivamente a partir de cifras oficiales y se marcan explícitamente como derivados.