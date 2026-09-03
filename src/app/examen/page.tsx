import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Información del Examen",
};

export default function ExamenPage() {
  return (
    <ComingSoon
      title="Información del Examen"
      description="Tiempo total, tiempos por componente, descripción y temáticas de la prueba de admisión de la Universidad Nacional."
    />
  );
}