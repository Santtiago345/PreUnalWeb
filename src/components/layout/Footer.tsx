import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/lib/navigation";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-forest/10 dark:border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-bold tracking-tight">
              PreUnal<span className="text-emerald">Web</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">
            {site.tagline}, con identidad educativa del {site.community}.
          </p>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald">
            Explorar
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-emerald"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald">
            Comunidad
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-foreground/60">
            Preparación gratuita y abierta para todos los aspirantes a la
            Universidad Nacional de Colombia. {site.city}
          </p>
        </div>
      </div>

      <div className="border-t border-forest/10 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-foreground/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.community}
          </p>
          <div className="flex items-center gap-4">
            <p>Hecho para la comunidad, con identidad muisca.</p>
            <Link
              href="/admin"
              className="transition-colors hover:text-emerald"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}