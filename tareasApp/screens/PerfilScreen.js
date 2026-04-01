import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PerfilScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <Text>Nombre: Usuario Demo</Text>
      <Text>Email: usuario@email.com</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  button: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff'
  }
});