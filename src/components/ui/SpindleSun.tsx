import { cn } from "@/lib/utils";

export function SpindleSun({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={cn("h-72 w-72 text-emerald/25", className)}
    >
      <g className="origin-center animate-spin-slow">
        <circle
          cx="200"
          cy="200"
          r="192"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 12"
        />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="14"
            x2="200"
            y2="58"
            stroke="currentColor"
            strokeWidth="2"
            transform={`rotate(${i * 15} 200 200)`}
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="158"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M200 62 L338 200 L200 338 L62 200 Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M200 120 L280 200 L200 280 L120 200 Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="200" cy="200" r="30" fill="currentColor" />
      </g>
    </svg>
  );
}