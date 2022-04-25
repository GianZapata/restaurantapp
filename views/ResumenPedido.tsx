import React, {useContext, useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PedidoContext} from '../context/pedidos';
import globalStyles from '../styles/global';
import {formatNumber} from '../utils/formatNumber';
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Paragraph,
  Title,
  Portal,
  IconButton,
} from 'react-native-paper';
import {FirebaseContext} from '../context/firebase';
import {Orden} from '../interface/productos';

export const ResumenPedido = () => {
  const navigation = useNavigation();
  const {pedido, total, mostrarResumen, eliminarPlatillo, pedidoRealizado} =
    useContext(PedidoContext);
  const {firebase} = useContext(FirebaseContext);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => {
    setVisible(false);
  };
  useEffect(() => {
    calcularTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedido]);

  const calcularTotal = () => {
    let totalPagar = 0;
    totalPagar = pedido.reduce((nuevoTotal, platillo) => {
      return nuevoTotal + platillo.precio * platillo.cantidad;
    }, 0);
    mostrarResumen(totalPagar);
  };

  const confirmarEliminacion = (id: string) => {
    // mostrarResumen(total - precio * cantidad);
    Alert.alert(
      '¿Desea eliminar este platillo?',
      'Una vez eliminado no podrá recuperarlo',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            eliminarPlatillo(id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={[globalStyles.contenedor, {justifyContent: 'space-between'}]}>
      <View style={globalStyles.contenido}>
        <Title style={globalStyles.titulo}>Resumen del pedido</Title>
        {pedido.map(({id, precio, imagen, nombre, cantidad}) => (
          <Card key={id}>
            <Card.Title
              title={nombre}
              subtitle={`Precio: ${formatNumber(
                precio,
              )} - Cantidad: ${cantidad}`}
              left={props =>
                imagen !== '' ? (
                  <Avatar.Image {...props} source={{uri: imagen}} size={50} />
                ) : (
                  <Avatar.Icon {...props} icon="food" color="#000" />
                )
              }
              right={props => (
                <IconButton
                  {...props}
                  icon="delete"
                  color="#c42a2a"
                  onPress={() => {
                    confirmarEliminacion(id);
                  }}
                />
              )}
            />
          </Card>
        ))}
        <Text style={[globalStyles.cantidad, {textAlign: 'center'}]}>
          Total a Pagar: {formatNumber(total)}
        </Text>
        <Button
          onPress={() => navigation.navigate('Menu')}
          mode="contained"
          color="#000">
          <Text style={{color: '#FFF'}}>Seguir pidiendo</Text>
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Revisa tu pedido</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Una vez que hayas confirmado tu pedido, no podrás volver a
                cambiarlo.
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>
                <Text style={{color: '#000'}}>Cancelar</Text>
              </Button>
              <Button
                onPress={async () => {
                  // Crear el objeto
                  const pedidoObj: Orden = {
                    tiempoEntrega: 0,
                    completado: false,
                    total: Number(total),
                    orden: pedido,
                    creado: Date.now(),
                  };
                  try {
                    const result = await firebase.db
                      .collection('ordenes')
                      .add(pedidoObj);
                    pedidoRealizado(result.id);
                    // Escribir el objeto en la base de datos
                    navigation.navigate('ProgresoPedido');
                    hideDialog();
                  } catch (error) {
                    console.log({error});
                  }
                }}>
                <Text style={{color: '#000'}}>Confirmar</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <Button mode="contained" onPress={() => setVisible(true)}>
        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
      </Button>
    </View>
  );
};
