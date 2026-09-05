# Manual del Administrador — PreUnalWeb

Guía para activar y gestionar la **Biblioteca de Preparación** y el **Panel de Administración**.

## 1. Crear el proyecto en Supabase (gratuito)

1. Crea una cuenta en **supabase.com** y un nuevo proyecto (región cercana a Colombia si es posible).
2. Guarda la **URL del proyecto** y la **anon key** en *Project Settings → API*.

## 2. Crear la base de datos

1. En el Dashboard, abre **SQL Editor**.
2. Pega y ejecuta el contenido de **`supabase/migrations/0001_biblioteca.sql`**.
3. Luego ejecuta **`supabase/migrations/0002_examenes.sql`** (tabla de exámenes anteriores).
   Esto crea las tablas `categorias`, `contenidos`, `examenes` y `admins`, las políticas de seguridad (RLS) y el bucket público `biblioteca`.

## 3. Crear el usuario administrador

1. En **Authentication → Users → Add user**, crea una cuenta con tu correo y una contraseña.
2. En **Table Editor → admins**, agrega una fila con tu correo (es quien puede editar contenido).
   > Si usas la opción "New row", escribe tu correo en la columna `email`.

## 4. Configurar la aplicación

Copia `.env.local.example` a `.env.local` y completa:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

- **Local:** `npm run dev`
- **Vercel:** en el proyecto → *Settings → Environment Variables*, agrega las dos variables y vuelve a desplegar (o se desplegará automáticamente en el próximo push).

## 5. Usar el panel

- Entra a **`/admin`** en la web.
- Inicia sesión con el correo y contraseña creados en Supabase.
- Puedes:
  - Crear/eliminar **categorías** (Matemáticas, Análisis textual, etc.).
  - Crear/editar/eliminar **contenidos** (título, descripción, tipo, categoría).
  - **Subir archivos** (PDF, guías, etc.) que se guardan en el bucket `biblioteca` y se publican con enlace público.
  - Crear/editar/eliminar **exámenes anteriores** (año, título, descripción y archivo), que aparecen en `/examenes`.

## 6. Ver el resultado público

El contenido aparece en la sección **Biblioteca** (`/biblioteca`), agrupado por categorías, y el recopilatorio en **Exámenes Anteriores** (`/examenes`), para todos los visitantes.

## Nota sobre exámenes oficiales

La UNAL **no publica** los exámenes aplicados (banco de preguntas reservado, Acuerdo 039 de 1998). El recopilatorio de la plataforma es material de práctica gestionado por el administrador; las demostraciones oficiales se enlazan directamente desde la sección pública.

## Seguridad

- Las políticas RLS garantizan que **solo los correos listados en `admins`** puedan crear/editar/eliminar contenido; el público solo lee.
- No compartas la anon key (es pública por diseño, pero la seguridad real la da RLS).
- Para más de un administrador, agrega más correos a la tabla `admins`.