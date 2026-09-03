"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/components/providers/ThemeProvider";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-background/80 backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="PreUnalWeb — Inicio"
        >
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-bold tracking-tight">
            PreUnal<span className="text-emerald">Web</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegación principal"
        >
          {mainNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                index >= 5 && "hidden xl:inline-flex",
                isActive(pathname, item.href)
                  ? "bg-emerald/15 text-emerald"
                  : "text-foreground/70 hover:bg-white/5 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggle}
          aria-label={
            theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
          }
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/10 text-foreground/70 transition-colors hover:border-emerald/50 hover:text-emerald dark:border-white/10"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}