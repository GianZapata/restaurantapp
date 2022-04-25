import React, {Fragment, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import {FirebaseContext} from '../context/firebase';
import {PedidoContext} from '../context/pedidos/PedidoContext';
import {Producto} from '../interface/productos';

export const Menu = () => {
  const {menu, obtenerProductos} = useContext(FirebaseContext);

  const {seleccionarPlatillo} = useContext(PedidoContext);

  const navigation = useNavigation();
  useEffect(() => {
    obtenerProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      {menu.map((platillo, index) => {
        const {categoria, nombre, precio, imagen, id, descripcion} = platillo;
        return (
          <Fragment key={id}>
            {mostrarHeading({categoria, index, menu})}
            <Card
              onPress={() => {
                // Eliminar la existencia del objeto platillo
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {existencia, ...producto} = platillo;
                seleccionarPlatillo(producto);
                navigation.navigate('DetallePlatillo');
              }}>
              <Card.Title
                title={nombre}
                subtitle={categoria}
                left={props =>
                  imagen !== '' ? (
                    <Avatar.Image {...props} source={{uri: imagen}} size={50} />
                  ) : (
                    <Avatar.Icon {...props} icon="food" color="#000" />
                  )
                }
                right={props => (
                  <Paragraph style={{marginRight: 10}} {...props}>
                    Precio: ${precio.toFixed(2)}
                  </Paragraph>
                )}
              />
              <Card.Content>
                <Paragraph>{descripcion}</Paragraph>
              </Card.Content>
            </Card>
          </Fragment>
        );
      })}
    </View>
  );
};

const mostrarHeading = ({
  categoria,
  index,
  menu,
}: {
  categoria: string;
  index: number;
  menu: Producto[];
}) => {
  if (index > 0) {
    const categoriaAnterior = menu[index - 1].categoria;
    if (categoriaAnterior !== categoria) {
      return (
        <View style={styles.separador}>
          <Paragraph style={styles.separadorTexto}>{categoria}</Paragraph>
        </View>
      );
    }
  } else {
    return (
      <View style={styles.separador}>
        <Paragraph style={styles.separadorTexto}>{categoria}</Paragraph>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000',
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: '1%',
    paddingLeft: '2.5%',
  },
});
