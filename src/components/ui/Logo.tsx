import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="logo-emerald" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#2ec27e" />
          <stop offset="1" stopColor="#e8b04b" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="url(#logo-emerald)"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />
      <path
        d="M20 5 L35 20 L20 35 L5 20 Z"
        stroke="#2ec27e"
        strokeWidth="1.6"
      />
      <path
        d="M20 12 L28 20 L20 28 L12 20 Z"
        stroke="#e8b04b"
        strokeWidth="1.4"
      />
      <circle cx="20" cy="20" r="4" fill="#2ec27e" />
    </svg>
  );
}