-- =============================================================
-- PreUnalWeb · Exámenes anteriores (recopilatorio del administrador)
-- Ejecutar en: Supabase Dashboard → SQL Editor (después de 0001)
-- =============================================================

create extension if not exists "pgcrypto";

create table if not exists public.examenes (
  id uuid primary key default gen_random_uuid(),
  anio int not null,
  titulo text not null,
  descripcion text,
  tipo text not null default 'documento',
  archivo_url text,
  creado_en timestamptz not null default now()
);

alter table public.examenes enable row level security;

-- Lectura pública
create policy "Lectura pública de exámenes" on public.examenes
  for select to anon, authenticated using (true);

-- Escritura únicamente para administradores registrados
create policy "Admins gestionan exámenes" on public.examenes
  for all to authenticated
  using (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')))
  with check (exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email')));

-- Los archivos se suben al bucket público "biblioteca" (ya creado en 0001),
-- bajo la ruta examenes/
insert into storage.buckets (id, name, public)
values ('biblioteca', 'biblioteca', true)
on conflict (id) do nothing;