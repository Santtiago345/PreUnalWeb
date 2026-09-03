export type Categoria = {
  id: string;
  nombre: string;
  color: string;
  orden: number;
  creado_en: string;
};

export type Contenido = {
  id: string;
  categoria_id: string | null;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  archivo_url: string | null;
  creado_en: string;
};