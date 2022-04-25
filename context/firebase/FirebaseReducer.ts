import {Producto} from '../../interface/productos';
import {FirebaseState} from './';

type FirebaseActionType =
  | {type: '[Firebase] = GetProducts'; payload: Producto[]}
  | {type: '[Firebase] = GetProductsError'; payload: []};

export const firebaseReducer = (
  state: FirebaseState,
  action: FirebaseActionType,
): FirebaseState => {
  switch (action.type) {
    case '[Firebase] = GetProducts':
      return {
        ...state,
        menu: action.payload,
      };
    case '[Firebase] = GetProductsError':
      return {
        ...state,
        menu: [],
      };
    default:
      return state;
  }
};
