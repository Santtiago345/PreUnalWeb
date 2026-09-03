"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { AdminGestor } from "@/components/admin/AdminGestor";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { getSupabase, supabaseConfigurado } from "@/lib/supabase";

function NoConfigurado() {
  return (
    <div className="glass mx-auto max-w-2xl p-6 text-center">
      <h2 className="font-display text-xl font-semibold">
        Panel de administración en configuración
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
        Para activar el panel necesitas configurar Supabase:
      </p>
      <ol className="mx-auto mt-4 max-w-md space-y-2 text-left text-sm text-foreground/70">
        <li>1. Crea un proyecto en supabase.com (plan gratuito).</li>
        <li>2. Ejecuta el SQL de <code className="font-mono text-emerald">supabase/migrations/0001_biblioteca.sql</code>.</li>
        <li>3. Crea una cuenta de administrador en Authentication → Users.</li>
        <li>4. Agrega tu correo a la tabla <code className="font-mono text-emerald">admins</code>.</li>
        <li>5. Configura <code className="font-mono text-emerald">.env.local</code> y las variables en Vercel.</li>
      </ol>
    </div>
  );
}

export function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setCargando(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      setUser(sesion?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigurado) {
    return <NoConfigurado />;
  }

  if (cargando) {
    return <div className="glass mx-auto max-w-md animate-pulse p-8" />;
  }

  return user ? (
    <AdminGestor onLogout={() => setUser(null)} />
  ) : (
    <AdminLogin
      onLogin={() => {
        void getSupabase()
          ?.auth.getSession()
          .then(({ data }) => setUser(data.session?.user ?? null));
      }}
    />
  );
}