import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
} as const;

const variants = {
  primary:
    "bg-gradient-to-r from-emerald to-emerald-soft text-forest-deep shadow-lg shadow-emerald/25 hover:brightness-105 hover:shadow-emerald/40",
  secondary:
    "border border-forest/20 text-foreground hover:border-emerald/50 hover:bg-emerald/5 dark:border-white/15",
  ghost: "text-foreground/80 hover:bg-white/5 hover:text-foreground",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, sizes[size], variants[variant], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}