import {createContext} from 'react';
import {Producto} from '../../interface/productos';
import Firebase from './firebase';

export interface FirebaseContextProps {
  firebase: Firebase;
  menu: Producto[];
  obtenerProductos: () => void;
}

export const FirebaseContext = createContext<FirebaseContextProps>(
  {} as FirebaseContextProps,
);
