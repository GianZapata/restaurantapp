/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Dialog, Paragraph, Portal, Title} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-paper-grid';
import globalStyles from '../styles/global';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {PedidoContext} from '../context/pedidos';
import {formatNumber} from '../utils/formatNumber';
import {Pedido} from '../interface/productos';

export const FormularioPlatillo = () => {
  const navigation = useNavigation();
  const [cantidad, setCantidad] = useState(1);

  const [total, setTotal] = useState(0);

  const [visible, setVisible] = useState(false);

  const hideDialog = () => {
    setVisible(false);
  };

  // Platillo
  const {platillo, guardarPedido} = useContext(PedidoContext);
  const {precio} = platillo;

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  const increaseBy = (value: number) => {
    const newValue = Math.max(cantidad + value, 1);
    setCantidad(newValue);
  };

  const calcularTotal = () => {
    const totalPagar = cantidad * precio;
    setTotal(totalPagar);
  };

  return (
    <View style={globalStyles.contenido}>
      <View>
        <Text style={globalStyles.titulo}>Cantidad</Text>
        <View style={{height: '25%'}}>
          <Grid>
            <Row>
              <Col>
                <Button style={styles.boton} onPress={() => increaseBy(-1)}>
                  <AwesomeIcon name="minus" size={20} color="#fff" />
                </Button>
              </Col>
              <Col>
                <Title style={styles.titulo}>{cantidad.toString()}</Title>
              </Col>
              <Col>
                <Button style={styles.boton} onPress={() => increaseBy(+1)}>
                  <AwesomeIcon name="plus" size={20} color="#fff" />
                </Button>
              </Col>
            </Row>
          </Grid>
        </View>
        <Text style={[globalStyles.cantidad, {textAlign: 'center'}]}>
          Subtotal: {formatNumber(total)}
        </Text>
      </View>
      <Button
        onPress={() => {
          setVisible(true);
        }}
        mode="contained">
        <Text>Agregar al pedido</Text>
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>¿Desea agregar este platillo al pedido?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Un pedido confirmado no se puede modificar</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button
              onPress={() => {
                hideDialog();
                // Almacenar el pedido al pedido principal
                const pedido: Pedido = {
                  ...platillo,
                  cantidad,
                  total,
                };
                guardarPedido(pedido);
                navigation.navigate('ResumenPedido');
              }}>
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#000',
  },
  titulo: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});
