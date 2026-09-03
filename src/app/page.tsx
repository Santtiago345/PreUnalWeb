import { CallToAction } from "@/components/home/CallToAction";
import { Hero } from "@/components/home/Hero";
import { QuickAccess } from "@/components/home/QuickAccess";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <CallToAction />
    </>
  );
}