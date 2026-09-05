"use client";

import { Fragment } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function renderMath(tex: string, display: boolean) {
  try {
    return katex.renderToString(tex, {
      throwOnError: false,
      displayMode: display,
    });
  } catch {
    return tex;
  }
}

export function M({ children }: { children: string }) {
  const partes = children.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).filter(Boolean);
  return (
    <>
      {partes.map((parte, i) => {
        if (parte.startsWith("$$")) {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: renderMath(parte.slice(2, -2), true),
              }}
            />
          );
        }
        if (parte.startsWith("$")) {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: renderMath(parte.slice(1, -1), false),
              }}
            />
          );
        }
        return <Fragment key={i}>{parte}</Fragment>;
      })}
    </>
  );
}

export function Formula({ f, className }: { f: string; className?: string }) {
  return (
    <div
      className={className ?? "my-2 overflow-x-auto rounded-lg bg-white/5 px-3 py-2 font-mono"}
      dangerouslySetInnerHTML={{ __html: renderMath(f, true) }}
    />
  );
}