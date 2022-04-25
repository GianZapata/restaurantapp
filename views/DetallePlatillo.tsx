import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {PedidoContext} from '../context/pedidos';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

export const DetallePlatillo = () => {
  // Pedido context
  const {platillo} = useContext(PedidoContext);
  const {nombre, imagen, descripcion, precio} = platillo;

  const navigation = useNavigation();

  return (
    <View style={[globalStyles.contenedor, {justifyContent: 'space-between'}]}>
      <View>
        <Title style={globalStyles.titulo}>{nombre}</Title>
        <Card style={globalStyles.contenido} mode="outlined">
          {imagen !== '' && <Card.Cover source={{uri: imagen}} />}
          <Card.Content>
            <Paragraph style={{marginTop: 15}}>{descripcion}</Paragraph>
            <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={[globalStyles.contenido, {marginBottom: 20}]}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('FormularioPlatillo')}>
          Ordenar Platillo
        </Button>
      </View>
    </View>
  );
};
