-- =============================================================
-- PreUnalWeb · Simulacro: distingue Matemáticas vs General
-- Ejecutar en: Supabase Dashboard → SQL Editor (después de 0003)
-- =============================================================

-- 1. Nueva columna: qué simulacro originó la sesión.
--    Las filas existentes quedan como 'matematicas' por defecto.
alter table public.simulacro_sesiones
  add column if not exists tipo text not null default 'matematicas';

-- 2. Backfill: las sesiones con más de 25 respuestas (o alguna
--    pregunta con id > 25) pertenecen al simulacro general (58
--    preguntas), no al de matemáticas (25 preguntas).
update public.simulacro_sesiones
set tipo = 'general'
where tipo = 'matematicas'
  and (
    respondidas > 25
    or (
      respuestas is not null
      and jsonb_typeof(respuestas) = 'array'
      and (
        jsonb_array_length(respuestas) > 25
        or exists (
          select 1
          from jsonb_array_elements(respuestas) r
          where (r.value ->> 'pregunta')::int > 25
        )
      )
    )
  );

-- 3. Limpieza: borra sesiones de prueba/abandonadas.
--    a) Abiertas hace más de 200 minutos (tiempo máximo real de un
--       simulacro + margen; si siguen abiertas es que se abandonaron).
delete from public.simulacro_sesiones
where terminado_en is null
  and iniciado_en < now() - interval '200 minutes';

--    b) Sesiones terminadas de prueba (nombres de test).
delete from public.simulacro_sesiones
where terminado_en is not null
  and (
    nombre ilike 'prueba%'
    or nombre ilike '%test%'
  );
