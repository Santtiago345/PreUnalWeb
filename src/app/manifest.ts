import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "PreUnal",
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#07150e",
    theme_color: "#07150e",
    lang: "es",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}