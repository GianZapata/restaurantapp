import React, {useReducer} from 'react';
import Firebase from './firebase';
import {firebaseReducer, FirebaseContext} from './';
import {Producto} from '../../interface/productos';
import _ from 'lodash';

export interface FirebaseState {
  firebase: Firebase;
  menu: Producto[];
}

const firebase = new Firebase();

const INITIAL_STATE: FirebaseState = {
  firebase,
  menu: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const FirebaseProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(firebaseReducer, INITIAL_STATE);
  const {db} = state.firebase;

  const obtenerProductos = () => {
    db.collection('productos')
      // Traer solo los que estén en existencia
      .where('existencia', '==', true)
      .onSnapshot(snapshot => {
        if (snapshot) {
          let productos = snapshot.docs.map(doc => {
            const producto = {
              id: doc.id,
              ...doc.data(),
            };
            return producto as Producto;
          });
          productos = _.sortBy(productos, ['categoria'], ['asc']);
          dispatch({
            type: '[Firebase] = GetProducts',
            payload: productos,
          });
        } else {
          dispatch({
            type: '[Firebase] = GetProductsError',
            payload: [],
          });
        }
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        obtenerProductos,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};
