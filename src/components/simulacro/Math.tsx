"use client";

import { Fragment } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// Caché de renderizado KaTeX: las cadenas del banco de preguntas son
// estáticas, así que cada fórmula se calcula una sola vez por sesión.
const katexCache = new Map<string, string>();

function renderMath(tex: string, display: boolean) {
  const key = (display ? "%%" : "$") + tex;
  const cached = katexCache.get(key);
  if (cached !== undefined) return cached;
  let html: string;
  try {
    html = katex.renderToString(tex, {
      throwOnError: false,
      displayMode: display,
    });
  } catch {
    html = tex;
  }
  katexCache.set(key, html);
  return html;
}

export function M({ children }: { children: string }) {
  const partes = children.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).filter(Boolean);
  return (
    <>
      {partes.map((parte, i) => {
        if (parte.startsWith("$$") && parte.endsWith("$$")) {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: renderMath(parte.slice(2, -2), true),
              }}
            />
          );
        }
        if (parte.startsWith("$") && parte.endsWith("$")) {
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