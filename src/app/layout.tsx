import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.tagline}, con identidad del ${site.community}. Información del examen, historial de puntajes, fechas, contenidos y simulacros.`,
  keywords: [
    "examen admisión",
    "Universidad Nacional de Colombia",
    "UNAL",
    "puntajes",
    "PAES",
    "cabildo muisca",
    "simulacro",
    "Bosa",
  ],
  applicationName: site.name,
  authors: [{ name: site.community }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: `${site.tagline}, con identidad del ${site.community}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: `${site.tagline}, con identidad del ${site.community}.`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07150e" },
    { media: "(prefers-color-scheme: light)", color: "#f7f0e3" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="light"?"":"dark";document.documentElement.classList.toggle("dark",d==="dark");}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald focus:px-5 focus:py-2.5 focus:font-semibold focus:text-forest-deep"
          >
            Saltar al contenido
          </a>
          <Header />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileTabBar />
        </ThemeProvider>
      </body>
    </html>
  );
}