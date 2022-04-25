import React from 'react';
import globalStyles from '../styles/global';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const NuevaOrden = () => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyles.contenedor, styles.contenedor]}>
      <View style={[globalStyles.contenido]}>
        <Button
          mode="contained"
          style={globalStyles.boton}
          onPress={() => navigation.navigate('Menu')}>
          {' '}
          Crear Nueva Orden
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
