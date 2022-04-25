import {PedidoState} from './PedidoProvider';
import {Pedido, Producto} from '../../interface/productos';

type PedidoActionType =
  | {type: '[Pedido] = agregarPedido'; payload: Pedido}
  | {type: '[Pedido] = eliminarPlatillo'; payload: string}
  | {type: '[Pedido] = mostrarResumen'; payload: number}
  | {type: '[Pedido] = pedidoRealizado'; payload: string}
  | {type: '[Pedido] = seleccionarProducto'; payload: Producto};

export const pedidoReducer = (
  state: PedidoState,
  action: PedidoActionType,
): PedidoState => {
  switch (action.type) {
    case '[Pedido] = seleccionarProducto':
      return {
        ...state,
        platillo: action.payload,
      };
    case '[Pedido] = agregarPedido':
      return {
        ...state,
        pedido: [...state.pedido, action.payload],
      };
    case '[Pedido] = mostrarResumen':
      return {
        ...state,
        total: action.payload,
      };
    case '[Pedido] = eliminarPlatillo':
      return {
        ...state,
        pedido: state.pedido.filter(
          (pedido: Pedido) => pedido.id !== action.payload,
        ),
      };
    case '[Pedido] = pedidoRealizado':
      return {
        ...state,
        idPedido: action.payload,
        pedido: [],
        total: 0,
      };
    default:
      return state;
  }
};
