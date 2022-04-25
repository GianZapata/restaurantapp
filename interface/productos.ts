export interface Producto {
  categoria: string;
  descripcion: string;
  existencia?: boolean;
  id: string;
  imagen?: string;
  nombre: string;
  precio: number;
}

export interface Pedido extends Producto {
  cantidad: number;
  total: number;
}

export interface Orden {
  completado: boolean;
  creado: number;
  orden: Pedido[];
  tiempoEntrega: number;
  total: number;
}
