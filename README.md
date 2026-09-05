# PreUnalWeb

Plataforma de preparación para el examen de admisión de la **Universidad Nacional de Colombia**, con identidad educativa del **Cabildo Indígena Muisca de Bosa**.

## Paneles

- Información del examen (tiempos y temáticas por componente)
- Historial de puntajes 2015 → actualidad
- Promedio ponderado por carreras
- Fechas importantes del semestre
- PAES / admisión especial (cabildos indígenas)
- Biblioteca de preparación (gestionada por el administrador)
- Exámenes anteriores
- **Simulacros** (inicio con matemáticas)
- Panel de administración

## Stack

Next.js · TypeScript · Tailwind CSS · Framer Motion · Supabase (BD + Auth + Storage) · Recharts · Vercel

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Configuración (Biblioteca + Panel Admin)

Copia `.env.local.example` a `.env.local` y completa las credenciales de Supabase
(URL del proyecto y anon key). Ejecuta el esquema de
`supabase/migrations/0001_biblioteca.sql` en el SQL Editor de Supabase. Pasos
completos en [docs/ADMIN.md](./docs/ADMIN.md).

El panel de administración vive en `/admin` y la biblioteca pública en
`/biblioteca`.

## Documentación

- [PLAN.md](./PLAN.md) — plan completo de desarrollo
- [docs/DESIGN.md](./docs/DESIGN.md) — guía de identidad visual
- [docs/DATA.md](./docs/DATA.md) — fuentes de datos
- [docs/ADMIN.md](./docs/ADMIN.md) — manual del administrador
- [docs/PERFORMANCE.md](./docs/PERFORMANCE.md) — optimización y tests automáticos

## Tests

```bash
npm run build && npm test
```

Ejecuta tests de calificación (Rasch), integridad de datos y presupuesto de bundle. El CI los corre en cada push y publica un resumen de optimización.