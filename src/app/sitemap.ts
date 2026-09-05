import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

const rutas = [
  { path: "", priority: 1 },
  { path: "/examen", priority: 0.9 },
  { path: "/puntajes", priority: 0.9 },
  { path: "/fechas", priority: 0.9 },
  { path: "/simulacros", priority: 0.9 },
  { path: "/paes", priority: 0.8 },
  { path: "/biblioteca", priority: 0.8 },
  { path: "/examenes", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map((ruta) => ({
    url: `${site.url}${ruta.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: ruta.priority,
  }));
}