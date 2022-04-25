import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Paragraph, Title} from 'react-native-paper';
import globalStyles from '../styles/global';
import {PedidoContext} from '../context/pedidos';
import {FirebaseContext} from '../context/firebase';
import {useNavigation} from '@react-navigation/native';

export const ProgresoPedido = () => {
  const navigation = useNavigation();
  const {idPedido} = useContext(PedidoContext);
  const {firebase} = useContext(FirebaseContext);
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false);
  useEffect(() => {
    const obtenerProducto = async () => {
      firebase.db
        .collection('ordenes')
        .doc(idPedido)
        .onSnapshot(doc => {
          setTiempo(doc.data().tiempoEntrega);
          setCompletado(doc.data().completado);
        });
    };
    obtenerProducto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              {' '}
              Hemos recibido tu orden...
            </Text>
            <Text style={{textAlign: 'center'}}>
              {' '}
              Estamos preparando el tiempo de entrega
            </Text>
          </>
        )}
        {!completado && tiempo > 0 && (
          <>
            <Text style={styles.texto}> Su orden estará lista en:</Text>
            <Text style={styles.texto}> {tiempo} minutos</Text>
          </>
        )}

        {completado && (
          <>
            <Title style={styles.texto}> ¡Orden lista!</Title>
            <Paragraph style={{textAlign: 'center'}}>
              {' '}
              Por favor, pase a recoger su pedido
            </Paragraph>
            <Button
              mode="contained"
              style={{marginTop: 20}}
              onPress={() => navigation.navigate('NuevaOrden')}>
              Comenzar una orden nueva
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
