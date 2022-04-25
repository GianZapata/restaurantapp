import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {FirebaseProvider} from './context/firebase';
import {Navigator} from './components';
import {PedidoProvider} from './context/pedidos';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFDA00',
  },
};
const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <FirebaseProvider>
          <PedidoProvider>
            <Navigator />
          </PedidoProvider>
        </FirebaseProvider>
      </PaperProvider>
    </>
  );
};
export default App;
