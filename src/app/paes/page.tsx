import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "PAES y Admisión Especial",
};

export default function PaesPage() {
  return (
    <ComingSoon
      title="PAES y Admisión Especial"
      description="Información de los programas de admisión especial, con foco en PAES mediante los cabildos indígenas y el proceso a través del Cabildo Muisca de Bosa."
    />
  );
}