import React, {useReducer} from 'react';
import {Pedido, Producto} from '../../interface/productos';
import {PedidoContext} from './PedidoContext';
import {pedidoReducer} from './PedidoReducer';

export interface PedidoState {
  pedido: Pedido[];
  platillo: Producto;
  total: number;
  idPedido: string;
}

const Pedido_INITIAL_STATE: PedidoState = {
  pedido: [],
  total: 0,
  platillo: {
    id: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    categoria: '',
    imagen: '',
  },
  idPedido: '',
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PedidoProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(pedidoReducer, Pedido_INITIAL_STATE);

  const seleccionarPlatillo = (platillo: Producto) => {
    dispatch({
      type: '[Pedido] = seleccionarProducto',
      payload: platillo,
    });
  };

  const guardarPedido = (pedido: Pedido) => {
    dispatch({
      type: '[Pedido] = agregarPedido',
      payload: pedido,
    });
  };

  const mostrarResumen = (total: number) => {
    dispatch({
      type: '[Pedido] = mostrarResumen',
      payload: total,
    });
  };

  const eliminarPlatillo = (id: string) => {
    dispatch({
      type: '[Pedido] = eliminarPlatillo',
      payload: id,
    });
  };

  const pedidoRealizado = (id: string) => {
    dispatch({
      type: '[Pedido] = pedidoRealizado',
      payload: id,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        ...state,
        seleccionarPlatillo,
        guardarPedido,
        mostrarResumen,
        eliminarPlatillo,
        pedidoRealizado,
      }}>
      {children}
    </PedidoContext.Provider>
  );
};
