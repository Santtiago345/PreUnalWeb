export type FuenteAnual = {
  anio: number;
  semestre: "I" | "II";
  url: string;
  estado: "verificado" | "pendiente";
};

const BASE = "https://admisiones.unal.edu.co/fileadmin/ArchivosDNA/Estadisticas";

export const fuentesAnualesBogota: FuenteAnual[] = [
  { anio: 2015, semestre: "I", url: `${BASE}/2015-1/151_regulares_y_MBPBog.pdf`, estado: "verificado" },
  { anio: 2016, semestre: "I", url: `${BASE}/2016-I/161_regulares_y_MBPBog.pdf`, estado: "verificado" },
  { anio: 2017, semestre: "I", url: `${BASE}/2017-1/171_regulares_y_MBPBogota.pdf`, estado: "verificado" },
  { anio: 2018, semestre: "I", url: `${BASE}/2018-1/181_regulares_y_MBPBogota.pdf`, estado: "verificado" },
  { anio: 2019, semestre: "I", url: `${BASE}/2019-1/191_regulares_y_MBP_Bogota.pdf`, estado: "verificado" },
  { anio: 2020, semestre: "I", url: `${BASE}/2020-1/201_regulares_y_MBP_Bogota.pdf`, estado: "verificado" },
  { anio: 2021, semestre: "I", url: `${BASE}/2021-1/211_regulares_y_MBP_BOGOTA.pdf`, estado: "verificado" },
  { anio: 2022, semestre: "I", url: `${BASE}/2022-1/22-1_regulares_y_MBP_BOGOTA.pdf`, estado: "verificado" },
  { anio: 2023, semestre: "I", url: `${BASE}/2023-1/23-1_regulares_y_MBP_BOGOTA.pdf`, estado: "pendiente" },
  { anio: 2024, semestre: "I", url: `${BASE}/2024_1/24-1_regulares_y_MBP_BOGOTA.pdf`, estado: "pendiente" },
  { anio: 2025, semestre: "I", url: `${BASE}/2025_1/2025-1_regulares_y_MBP_BOGOTA.pdf`, estado: "pendiente" },
  { anio: 2026, semestre: "I", url: `${BASE}/2026-I/26-1_regulares_y_MBP_BOGOTA.pdf`, estado: "pendiente" },
];

export const fuentePrincipal =
  "https://admisiones.unal.edu.co/servicios-en-linea/estadisticas-del-proceso-de-admision/";