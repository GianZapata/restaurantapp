import {createContext} from 'react';
import {Pedido, Producto} from '../../interface/productos';

interface ContextProps {
  idPedido: string;
  pedido: Pedido[];
  platillo: Producto;
  total: number;
  eliminarPlatillo: (id: string) => void;
  guardarPedido: (pedido: Pedido) => void;
  mostrarResumen: (total: number) => void;
  pedidoRealizado: (id: string) => void;
  seleccionarPlatillo: (platillo: Producto) => void;
}

export const PedidoContext = createContext({} as ContextProps);
