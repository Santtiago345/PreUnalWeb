"use client";

import { useEffect, useState } from "react";

type Parts = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

function getParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    mins: Math.floor((diff % 3_600_000) / 60_000),
    secs: Math.floor((diff % 60_000) / 1_000),
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="glass flex h-16 w-full min-w-16 items-center justify-center font-mono text-2xl font-semibold tabular-nums sm:h-20 sm:min-w-20 sm:text-3xl">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/50">
        {label}
      </span>
    </div>
  );
}

export function Countdown({
  target,
  className,
}: {
  target: number;
  className?: string;
}) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!parts) {
    return (
      <div className={`grid grid-cols-4 gap-2 ${className ?? ""}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass h-16 w-full sm:h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-4 gap-2 ${className ?? ""}`}>
      <Cell value={parts.days} label="Días" />
      <Cell value={parts.hours} label="Horas" />
      <Cell value={parts.mins} label="Min" />
      <Cell value={parts.secs} label="Seg" />
    </div>
  );
}