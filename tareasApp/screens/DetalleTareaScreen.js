import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalleTareaScreen = ({ route }) => {
  const { tarea } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tarea.titulo}</Text>
      <Text>{tarea.descripcion}</Text>
      <Text>📅 {tarea.fecha_entrega}</Text>
      <Text>📚 {tarea.materia}</Text>
      <Text>⚡ {tarea.prioridad}</Text>
      <Text>📌 {tarea.estado}</Text>
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