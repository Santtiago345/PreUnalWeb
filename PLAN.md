# PLAN DE DESARROLLO — PreUnalWeb

**Preparación para el examen de admisión de la Universidad Nacional de Colombia**
**Orientado al Cabildo Indígena Muisca de Bosa**

---

## 1. Visión del proyecto

Centralizar en una sola plataforma web toda la información, los datos históricos, las fechas, los contenidos de estudio y los simulacros necesarios para preparar el examen de admisión de la Universidad Nacional de Colombia. La plataforma se diseña desde la identidad educativa del Cabildo Indígena Muisca de Bosa y está pensada para ser usada **principalmente desde dispositivos móviles**.

### Audiencia
- Estudiantes de bachillerato y aspirantes a la UNAL.
- Jóvenes y comunidades del Cabildo Indígena Muisca de Bosa.
- Cualquier aspirante que busque prepararse de forma gratuita y organizada.

### Principios
1. **Gratuito** — 100 % de los servicios usados en sus planes free.
2. **Mobile-first** — la experiencia completa está optimizada para celulares.
3. **Identidad Muisca** — diseño inspirado en la cosmovisión y el arte del pueblo muisca.
4. **Moderno y accesible** — UX/UI profesional, animaciones y cumplimiento de accesibilidad.
5. **Documentado y versionado** — todo el proceso se lleva con GitHub y docs.

---

## 2. Paneles (módulos) de la aplicación

| # | Panel | Descripción |
|---|-------|-------------|
| 1 | **Inicio / Landing** | Hero con identidad, accesos rápidos, próxima fecha con cuenta regresiva. |
| 2 | **Información del Examen** | Tiempo total, tiempos por componente, descripción y temáticas por componente. |
| 3 | **Historial de Puntajes** | Puntajes mínimos por carrera y semestre desde **2015** hasta la actualidad, con gráficas interactivas y filtros. |
| 4 | **Promedio Ponderado por Carreras** | Promedios ponderados de todos los semestres, organizados por carrera, con ranking y comparativas. |
| 5 | **Fechas Importantes** | Timeline del semestre con cuenta regresiva: pago de PIN, formalizar inscripción, consultar citación, prueba de admisión, publicación de puntajes, inscripción de programa, publicación de admitidos, postulación a cupos (2), resultados cupos (2), postulación a cupos (3), resultados cupos (3). |
| 6 | **PAES / Admisión Especial** | Información de los programas de admisión especial, con foco en **PAES mediante los cabildos indígenas** (requisitos, cupos, proceso a través del Cabildo Muisca de Bosa). |
| 7 | **Biblioteca de Preparación** | Contenido de estudio organizado por categorías. El administrador sube el contenido. |
| 8 | **Exámenes Anteriores** | Recopilatorio de exámenes pasados (descargables). |
| 9 | **Simulacros** ⭐ | Motor de simulacros con cronómetro, preguntas tipo examen, resultados y revisión. **Fase inicial: simulacro de Matemáticas.** |
| 10 | **Admin** | Panel privado con login para gestionar biblioteca, exámenes, fechas y puntajes. |

---

## 3. Stack tecnológico (100 % gratuito)

| Recurso | Uso | Por qué |
|--------|-----|---------|
| **Next.js 14+ (App Router) + React + TypeScript** | Framework principal | SSR/SSG, SEO, despliegue nativo en Vercel. |
| **Tailwind CSS** | Estilos | Utility-first, rapidez de desarrollo, responsividad por diseño. |
| **Framer Motion** | Animaciones | Transiciones de página, scroll reveal, microinteracciones. |
| **shadcn/ui + Radix** | Componentes base | Base accesible, moderna y personalizable. |
| **lucide-react** | Iconos | Ligeros y consistentes. |
| **Supabase (Free Tier)** | BD + Auth + Storage | Postgres 500 MB, autenticación de administrador y storage para PDFs/contenido. |
| **Recharts** | Gráficas | Historial de puntajes y promedios ponderados. |
| **Google Fonts** | Tipografías | Variables y gratuitas. |
| **GitHub + GitHub Actions** | Versionado + CI | Flujo de ramas y verificación automática. |
| **Vercel** | Hosting | Deploy continuo desde GitHub, gratis para uso personal. |
| **Vercel Analytics / Speed Insights** | Analítica | Plan gratuito para proyectos personales. |

### Alternativas evaluadas
- **Firebase**: free tier más limitado para los datos que necesitamos.
- **CMS headless (Sanity/Contentful)**: útiles para contenido, pero limitan la lógica del simulacro; Supabase cubre BD + auth + storage en un solo servicio.

---

## 4. Arquitectura

Monorepo simple con Next.js App Router:

```
pre-unal-web/
├── app/                 # Páginas (router)
│   ├── page.tsx         # Landing
│   ├── examen/          # Información del examen
│   ├── puntajes/        # Historial y promedios
│   ├── fechas/          # Fechas importantes
│   ├── paes/            # Admisión especial
│   ├── biblioteca/      # Biblioteca de contenido
│   ├── examenes/        # Exámenes anteriores
│   ├── simulacros/      # Simulacros
│   └── admin/           # Panel de administración
├── components/          # UI + secciones reutilizables
├── lib/                 # Conexión Supabase, utilidades
├── data/                # Datos estáticos (componentes, temáticas, fechas)
├── styles/              # Tokens, globales
└── public/              # Recursos estáticos
```

**Estrategia de datos**
- Contenido casi estático (componentes del examen, temáticas): **SSG** al build.
- Datos dinámicos (biblioteca, exámenes, puntajes, fechas): **Supabase** con revalidación.
- Puntajes históricos: seed inicial en BD + panel admin para actualizaciones.

---

## 5. Identidad visual — Cabildo Muisca de Bosa

### Inspiración
- Tejidos en telar y geometría textil muisca.
- El **caracol chigüizo** y la **espiral** (símbolo de tiempo y ciclo).
- El **huso** (instrumento de hilado) y el **sol**.
- La **laguna** y la **siembra** — Bosa como territorio muisca de cultivo.

### Paleta de color

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `forest` | Verde bosque profundo | `#0E2A1F` | Fondo oscuro principal |
| `sage` | Verde salvia | `#7FAE8A` | Bordes y soportes |
| `emerald` | Verde esmeralda vivo | `#2EC27E` | CTAs y acentos |
| `ocre` | Ocre dorado | `#E8B04B` | Destacados positivos (sol) |
| `terracotta` | Terracota | `#C0572B` | Acento cálido (tierra/cerámica) |
| `cream` | Crema | `#F7F0E3` | Fondo en modo claro |
| `coral` | Coral vivo | `#FF6B5B` | Alertas y fechas críticas |
| `lagoon` | Azul laguna | `#3B82F6` | Información y enlaces |
| `ivory` | Marfil | `#FFF9EF` | Texto sobre fondos oscuros |

### Tipografía
- **Display**: `Fraunces` (serif variable, editorial) — títulos.
- **UI / Cuerpo**: `Space Grotesk` o `Inter` — interfaz.
- **Mono**: `JetBrains Mono` — números, puntajes y tiempos.

### Estilo visual
- **Dark mode predeterminado** (ideal para estudio nocturno) con toggle claro/oscuro.
- Gradientes entre `forest` y `emerald`; patrones geométricos muiscas en SVG de fondo.
- **Glassmorphism** en tarjetas y modales.
- Animaciones Framer Motion: *fade-up* al scroll, contadores animados, transiciones de página, hover states.
- Motivo del huso/caracol como marca de agua sutil.

### UX/UI (mobile-first)
- Navegación: **tab bar inferior fija en móvil**, menú superior/desktop en pantallas grandes.
- Áreas táctiles ≥ 48 px, gestos para navegar simulacros.
- Contraste AA, *focus states* visibles, skeletos de carga y estados vacíos.
- Jerarquía clara y lectura natural.

---

## 6. Modelo de datos (Supabase)

**Tablas**
- `carreras` — id, nombre, sede, área.
- `puntajes` — id, carrera_id, año, semestre, puntaje_mínimo, inscritos, admitidos *(histórico 2015 →)*.
- `fechas` — id, nombre, fecha, semestre, tipo.
- `categorias` — id, nombre (para la biblioteca).
- `contenidos` — id, categoria_id, título, descripción, archivo_url, creado_en.
- `examenes` — id, título, año, archivo_url.
- `simulacros` — id, título, componente, estado.
- `preguntas` — id, simulacro_id, enunciado, opciones (json), respuesta, explicación, tema.
- `resultados_simulacros` — id, usuario, simulacro_id, puntaje, respuestas (json), fecha *(futuro)*.

**Auth**: Supabase Auth con rol `admin` para el panel de administración.

**Seed inicial**: puntajes históricos UNAL 2015–2026 (datos públicos), fechas del semestre actual, componentes y temáticas del examen.

---

## 7. Roadmap por fases

### Fase 0 — Cimientos
- Repositorio GitHub, README, PLAN.md, .gitignore, licencia.
- Scaffold Next.js + TypeScript + Tailwind.
- CI básico (GitHub Actions: lint + build).
- Despliegue inicial en Vercel.

### Fase 1 — Design System e identidad
- Paleta, tokens, tipografías, patrones SVG muiscas.
- Layout global (header, tab bar móvil, footer) + componentes base + animaciones.
- Landing page con hero e identidad.

### Fase 2 — Panel de Información del Examen
- Datos de componentes (tiempos, temáticas) y su UI.

### Fase 3 — Puntajes Históricos y Promedios
- Modelo de datos + seed.
- Panel historial con gráficas interactivas.
- Panel promedio ponderado por carreras.

### Fase 4 — Fechas Importantes
- Timeline del semestre con cuenta regresiva.

### Fase 5 — PAES y Admisión Especial
- Contenido informativo de PAES y cabildos indígenas.

### Fase 6 — Biblioteca + Admin
- Supabase (tablas, storage, auth admin).
- Panel público de biblioteca + panel admin (CRUD).

### Fase 7 — Exámenes Anteriores
- Panel recopilatorio con descargas.

### Fase 8 — Simulacros ⭐
- Motor de simulacro: cronómetro, navegación, bandera de preguntas, resultados y revisión.
- Banco inicial de preguntas de **Matemáticas**.

### Fase 9 — Pulido y Lanzamiento
- SEO, metadatos, OG image, PWA básica, accesibilidad, performance.
- Pruebas en dispositivos móviles reales.
- `release: v1.0.0`.

---

## 8. Flujo de trabajo en GitHub

- Rama principal: **`main`** (producción; push a main → deploy automático en Vercel).
- Ramas de trabajo: `feat/*`, `fix/*`, `chore/*`, `docs/*`.
- **Pull Requests** con revisión antes de integrar (merge squash).
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `release:`.
- **Versionado semántico** con tags (`v1.0.0`, `v1.1.0`, …).
- **GitHub Actions**: CI (lint, typecheck, build) en cada PR y push.
- **Vercel**: *preview deploy* por PR + *production deploy* en main.

---

## 9. Documentación del proyecto

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Descripción, stack, cómo ejecutar localmente. |
| `PLAN.md` | Este plan de desarrollo. |
| `docs/DESIGN.md` | Guía de identidad visual (paleta, tipografía, patrones). |
| `docs/DATA.md` | Fuentes de datos (puntajes UNAL, fechas oficiales). |
| `docs/ADMIN.md` | Manual del administrador (cómo subir contenido). |

---

## 10. Próximos pasos inmediatos

1. Aprobación del plan por el usuario.
2. **Fase 0**: crear repo, scaffold Next.js, desplegar en Vercel.
3. **Fase 1**: identidad visual y design system.
4. Iterar fase por fase, con commits y documentación en GitHub.