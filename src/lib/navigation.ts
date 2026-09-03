import {
  BarChart3,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  Home,
  Library,
  Scale,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type QuickAccessItem = NavItem & {
  desc: string;
  tile: string;
};

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Examen", href: "/examen", icon: GraduationCap },
  { label: "Puntajes", href: "/puntajes", icon: BarChart3 },
  { label: "Fechas", href: "/fechas", icon: CalendarDays },
  { label: "PAES", href: "/paes", icon: Users },
  { label: "Biblioteca", href: "/biblioteca", icon: Library },
  { label: "Exámenes", href: "/examenes", icon: FileText },
  { label: "Simulacros", href: "/simulacros", icon: Timer },
];

export const mobileTabs: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Examen", href: "/examen", icon: GraduationCap },
  { label: "Simulacros", href: "/simulacros", icon: Timer },
  { label: "Puntajes", href: "/puntajes", icon: BarChart3 },
];

export const moreItems: NavItem[] = [
  { label: "Fechas", href: "/fechas", icon: CalendarDays },
  { label: "PAES", href: "/paes", icon: Users },
  { label: "Biblioteca", href: "/biblioteca", icon: Library },
  { label: "Exámenes", href: "/examenes", icon: FileText },
];

export const quickAccess: QuickAccessItem[] = [
  {
    label: "Información del Examen",
    desc: "Tiempos, componentes y temáticas de la prueba de admisión.",
    href: "/examen",
    icon: GraduationCap,
    tile: "from-emerald to-sage",
  },
  {
    label: "Historial de Puntajes",
    desc: "Puntajes mínimos por carrera y semestre desde 2015.",
    href: "/puntajes",
    icon: BarChart3,
    tile: "from-ocre to-terracotta",
  },
  {
    label: "Promedios por Carrera",
    desc: "Promedio ponderado de todos los semestres por programa.",
    href: "/puntajes#promedios",
    icon: Scale,
    tile: "from-lagoon to-emerald",
  },
  {
    label: "Fechas Importantes",
    desc: "Hitos del semestre con cuenta regresiva en vivo.",
    href: "/fechas",
    icon: CalendarDays,
    tile: "from-terracotta to-coral",
  },
  {
    label: "PAES y Admisión Especial",
    desc: "Programas especiales y cupos por cabildos indígenas.",
    href: "/paes",
    icon: Users,
    tile: "from-lagoon to-sage",
  },
  {
    label: "Biblioteca",
    desc: "Contenido de estudio organizado por categorías.",
    href: "/biblioteca",
    icon: Library,
    tile: "from-sage to-emerald",
  },
  {
    label: "Exámenes Anteriores",
    desc: "Recopilatorio descargable de pruebas pasadas.",
    href: "/examenes",
    icon: FileText,
    tile: "from-ocre to-ocre-soft",
  },
  {
    label: "Simulacros",
    desc: "Pruebas cronometradas con resultados y revisión.",
    href: "/simulacros",
    icon: BookOpen,
    tile: "from-emerald to-lagoon",
  },
];