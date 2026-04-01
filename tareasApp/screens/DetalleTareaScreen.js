import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalleTareaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Tarea</Text>
      <Text>Título: Ejemplo</Text>
      <Text>Descripción: Lorem ipsum</Text>
      <Text>Estado: Pendiente</Text>
    </View>
  );
};

export default DetalleTareaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});