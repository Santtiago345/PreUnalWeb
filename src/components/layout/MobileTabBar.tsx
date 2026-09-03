"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid, X } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { mobileTabs, moreItems, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function MoreItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "glass flex flex-col gap-2 p-4 transition-colors",
        active
          ? "border-emerald/50"
          : "hover:border-emerald/40 hover:bg-white/10",
      )}
    >
      <item.icon className="h-5 w-5 text-emerald" />
      <span className="text-sm font-semibold">{item.label}</span>
    </Link>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        aria-label="Navegación móvil"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden dark:border-white/10"
      >
        <div className="grid grid-cols-5">
          {mobileTabs.map((tab) => {
            const active = isActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-emerald" : "text-foreground/60",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={cn(
                    "rounded-full p-1.5 transition-colors",
                    active && "bg-emerald/15",
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                </span>
                {tab.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-foreground/60 transition-colors"
            aria-label="Abrir más secciones"
          >
            <span className="rounded-full p-1.5">
              <LayoutGrid className="h-5 w-5" />
            </span>
            Más
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Más secciones"
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-white/10 bg-background pb-[calc(env(safe-area-inset-bottom)+1rem)] lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between px-5 pb-2 pt-5">
                <div className="flex items-center gap-2.5">
                  <Logo className="h-8 w-8" />
                  <span className="font-display text-base font-bold">
                    Más secciones
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground/70 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 px-5 pb-2">
                {moreItems.map((item) => (
                  <MoreItem
                    key={item.href}
                    item={item}
                    onClose={() => setOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}