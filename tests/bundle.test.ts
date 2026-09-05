import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Presupuesto de tamaño del bundle (bytes). Ajusta estos límites solo si una
 * funcionalidad nueva lo justifica; si crecen, revisa las optimizaciones antes
 * de aceptarlo.
 */
export const LIMITES = {
  // Total de JS servido en bytes. 2 MB es el tope razonable para una app con
  // Recharts (admin), KaTeX (simulacro) y motion. Si crece, revisa qué se agrega.
  totalJS: 2.1 * 1024 * 1024,
  // Chunk individual más grande (KaTeX/recharts/simulacro)
  chunkMax: 500 * 1024,
};

function chunksJS(): { name: string; size: number }[] {
  const dir = join(process.cwd(), ".next", "static", "chunks");
  if (!existsSync(dir)) return [];
  const salida: { name: string; size: number }[] = [];
  const recorrer = (d: string) => {
    for (const entrada of readdirSync(d)) {
      const ruta = join(d, entrada);
      if (statSync(ruta).isDirectory()) recorrer(ruta);
      else if (entrada.endsWith(".js")) {
        salida.push({ name: entrada, size: statSync(ruta).size });
      }
    }
  };
  recorrer(dir);
  return salida;
}

describe("Presupuesto de bundle (optimización)", () => {
  it("hay un build previo (ejecuta npm run build antes de test)", () => {
    const chunks = chunksJS();
    // Si no hay build, el test falla para recordar ejecutar build primero
    expect(chunks.length).toBeGreaterThan(0);
  });

  it("el total de JS está bajo el presupuesto", () => {
    const chunks = chunksJS();
    const total = chunks.reduce((a, c) => a + c.size, 0);
    expect(total).toBeLessThan(LIMITES.totalJS);
  });

  it("ningún chunk individual supera el presupuesto por módulo", () => {
    const chunks = chunksJS();
    const max = chunks.reduce((a, c) => Math.max(a, c.size), 0);
    expect(max).toBeLessThan(LIMITES.chunkMax);
  });
});