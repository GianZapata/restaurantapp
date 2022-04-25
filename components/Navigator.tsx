import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Menu,
  DetallePlatillo,
  FormularioPlatillo,
  ResumenPedido,
  ProgresoPedido,
  NuevaOrden,
} from '../views';
import {BotonResumen} from './BotonResumen';

export type AppRootParamList = {
  Menu: undefined;
  DetallePlatillo: undefined;
  FormularioPlatillo: undefined;
  ResumenPedido: undefined;
  ProgresoPedido: undefined;
  NuevaOrden: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}

export const Navigator = () => {
  const Stack = createStackNavigator<AppRootParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NuevaOrden"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFDA00',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: '#000',
        }}>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: 'Nuestro menu',
            headerRight: () => <BotonResumen />,
          }}
        />
        <Stack.Screen
          name="NuevaOrden"
          component={NuevaOrden}
          options={{
            title: 'Nueva Orden',
          }}
        />
        <Stack.Screen
          name="DetallePlatillo"
          component={DetallePlatillo}
          options={{
            title: 'Detalle Platillo',
          }}
        />
        <Stack.Screen
          name="FormularioPlatillo"
          component={FormularioPlatillo}
          options={{
            title: 'Ordenar Platillo',
          }}
        />
        <Stack.Screen
          name="ResumenPedido"
          component={ResumenPedido}
          options={{
            title: 'Resumen Pedido',
          }}
        />
        <Stack.Screen
          name="ProgresoPedido"
          component={ProgresoPedido}
          options={{
            title: 'Progreso de pedido',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
