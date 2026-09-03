import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Biblioteca",
};

export default function BibliotecaPage() {
  return (
    <ComingSoon
      title="Biblioteca de Preparación"
      description="Contenido de estudio organizado por categorías, gestionado directamente por el equipo de la plataforma."
    />
  );
}