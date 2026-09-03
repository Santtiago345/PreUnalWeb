import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Simulacros",
};

export default function SimulacrosPage() {
  return (
    <ComingSoon
      title="Simulacros"
      description="Pruebas cronometradas tipo examen de admisión con resultados, desglose por tema y revisión de respuestas. Empezamos con matemáticas."
    />
  );
}