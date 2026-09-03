import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Exámenes Anteriores",
};

export default function ExamenesPage() {
  return (
    <ComingSoon
      title="Exámenes Anteriores"
      description="Recopilatorio de pruebas de admisión pasadas, organizadas por año, listas para consultar y descargar."
    />
  );
}