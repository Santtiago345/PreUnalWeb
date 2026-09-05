-- =============================================================
-- PreUnalWeb · Simulacro (sesiones, configuración y resultados)
-- Ejecutar en: Supabase Dashboard → SQL Editor (después de 0001 y 0002)
-- =============================================================

create extension if not exists "pgcrypto";

-- Configuración global (una sola fila, id = 1)
create table if not exists public.simulacro_config (
  id int primary key default 1,
  habilitado boolean not null default true
);

insert into public.simulacro_config (id, habilitado)
values (1, true)
on conflict (id) do nothing;

-- Sesiones de los estudiantes
create table if not exists public.simulacro_sesiones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  iniciado_en timestamptz not null default now(),
  ultima_actividad timestamptz not null default now(),
  respondidas int not null default 0,
  faltas int not null default 0,
  terminado_en timestamptz,
  respuestas jsonb,
  correctas int,
  puntaje numeric,
  puntaje_componente numeric,
  tiempo_usado int
);

alter table public.simulacro_config enable row level security;
alter table public.simulacro_sesiones enable row level security;

-- Configuración: lectura pública (habilita el botón), escritura solo admins
create policy "Lectura de config simulacro" on public.simulacro_config
  for select to anon, authenticated using (true);

create policy "Admins gestionan config simulacro" on public.simulacro_config
  for all to authenticated
  using (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')))
  with check (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')));

-- Sesiones: estudiantes (anon) crean y actualizan su propia sesión.
-- Nota: para un preuniversitario de bajo riesgo se permite que el anon
-- actualice filas; si se requiere mayor control, agrega un token por sesión.
create policy "Estudiantes crean sesión" on public.simulacro_sesiones
  for insert to anon, authenticated with check (true);

create policy "Estudiantes actualizan sesión" on public.simulacro_sesiones
  for update to anon, authenticated using (true);

-- Lectura: solo administradores autenticados (no se expone a anónimos)
create policy "Admins leen sesiones" on public.simulacro_sesiones
  for select to authenticated
  using (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')));