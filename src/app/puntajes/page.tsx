import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Historial de Puntajes",
};

export default function PuntajesPage() {
  return (
    <ComingSoon
      title="Historial de Puntajes"
      description="Puntajes mínimos por carrera y semestre desde 2015, con gráficas interactivas, filtros y promedio ponderado por programas."
    />
  );
}