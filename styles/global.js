import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
  boton: {
    backgroundColor: '#FFDA00',
    color: '#000',
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000000',
  },
  titulo: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: '#000',
  },
  imagen: {
    width: '100%',
    height: 300,
  },
  cantidad: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  texto: {
    fontSize: 18,
    color: '#000',
  },
});

export default globalStyles;
