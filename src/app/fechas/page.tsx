import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Fechas Importantes",
};

export default function FechasPage() {
  return (
    <ComingSoon
      title="Fechas Importantes"
      description="Calendario del semestre con cuenta regresiva en vivo: pago de PIN, inscripción, citación, prueba de admisión, puntajes y cupos."
    />
  );
}