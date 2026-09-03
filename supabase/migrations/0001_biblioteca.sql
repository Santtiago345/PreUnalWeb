-- =============================================================
-- PreUnalWeb · Biblioteca + Panel Admin (Supabase)
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------
-- Categorías de la biblioteca
-- ---------------------------------------------------------------
create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  color text not null default 'emerald',
  orden int not null default 0,
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Contenidos de la biblioteca
-- ---------------------------------------------------------------
create table if not exists public.contenidos (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid references public.categorias(id) on delete cascade,
  titulo text not null,
  descripcion text,
  tipo text not null default 'documento',
  archivo_url text,
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Administradores (por correo). El panel /admin solo deja editar
-- a quienes estén listados aquí.
-- ---------------------------------------------------------------
create table if not exists public.admins (
  email text primary key,
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Categorías iniciales (ajusta o amplía según tu contenido)
-- ---------------------------------------------------------------
insert into public.categorias (nombre, color, orden) values
  ('Matemáticas', 'emerald', 1),
  ('Análisis textual', 'ocre', 2),
  ('Ciencias naturales', 'lagoon', 3),
  ('Ciencias sociales', 'terracotta', 4),
  ('Análisis de la imagen', 'sage', 5),
  ('Inglés', 'coral', 6)
on conflict (nombre) do nothing;

-- ---------------------------------------------------------------
-- Seed: administrador. REEMPLAZA con tu correo y descomenta.
-- ---------------------------------------------------------------
-- insert into public.admins (email) values ('tu-correo@ejemplo.com');

-- ---------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------
alter table public.categorias enable row level security;
alter table public.contenidos enable row level security;
alter table public.admins enable row level security;

-- Lectura pública (visitantes y autenticados)
create policy "Lectura pública de categorías" on public.categorias
  for select to anon, authenticated using (true);

create policy "Lectura pública de contenidos" on public.contenidos
  for select to anon, authenticated using (true);

-- Ver el listado de administradores (solo autenticados, para validar rol)
create policy "Lectura de admins" on public.admins
  for select to authenticated using (true);

-- Escritura únicamente para administradores registrados
create policy "Admins gestionan categorías" on public.categorias
  for all to authenticated
  using (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')))
  with check (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')));

create policy "Admins gestionan contenidos" on public.contenidos
  for all to authenticated
  using (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')))
  with check (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')));

-- ---------------------------------------------------------------
-- Storage: crear bucket público "biblioteca"
-- Dashboard → Storage → New bucket → nombre: biblioteca → Public
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('biblioteca', 'biblioteca', true)
on conflict (id) do nothing;