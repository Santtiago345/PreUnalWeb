-- =============================================================
-- PreUnalWeb · Permisos de Storage (bucket biblioteca)
-- Ejecutar en: Supabase Dashboard → SQL Editor (después de 0001)
-- =============================================================

-- Lectura pública de los archivos del bucket
create policy "Lectura pública de archivos" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'biblioteca');

-- Subida de archivos: solo administradores
create policy "Admins suben archivos" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'biblioteca'
    and exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email'))
  );

-- Actualización (sobrescribir): solo administradores
create policy "Admins actualizan archivos" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'biblioteca'
    and exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email'))
  )
  with check (
    bucket_id = 'biblioteca'
    and exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email'))
  );

-- Eliminación: solo administradores
create policy "Admins eliminan archivos" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'biblioteca'
    and exists (select 1 from public.admins a where a.email = (select auth.jwt()->>'email'))
  );