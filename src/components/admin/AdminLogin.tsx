"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase";

export function AdminLogin({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const supabase = getSupabase();
      if (!supabase) {
        setError("Supabase no está configurado.");
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      onLogin();
    } catch {
      setError("No se pudo iniciar sesión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="glass mx-auto max-w-md p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold">
        Iniciar sesión como administrador
      </h2>
      <p className="mt-2 text-sm text-foreground/60">
        Usa la cuenta creada en Supabase Auth (Dashboard → Authentication →
        Users). Asegúrate de que tu correo esté en la tabla{" "}
        <code className="font-mono text-emerald">admins</code>.
      </p>

      <form onSubmit={entrar} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="admin-email"
            className="text-xs font-semibold uppercase tracking-wider text-foreground/50"
          >
            Correo
          </label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-forest/10 bg-background px-4 py-3 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30 dark:border-white/10"
          />
        </div>
        <div>
          <label
            htmlFor="admin-password"
            className="text-xs font-semibold uppercase tracking-wider text-foreground/50"
          >
            Contraseña
          </label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-forest/10 bg-background px-4 py-3 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30 dark:border-white/10"
          />
        </div>

        {error ? (
          <p className="rounded-lg border border-coral/40 bg-coral/10 px-3 py-2 text-sm text-coral">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          icon={<LogIn className="h-4 w-4" />}
          disabled={cargando}
        >
          {cargando ? "Ingresando…" : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
}