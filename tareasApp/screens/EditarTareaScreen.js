import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';

const EditarTareaScreen = () => {

  const [titulo, setTitulo] = useState('Tarea ejemplo');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Editar Tarea</Text>

      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditarTareaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  label: { fontSize: 18, marginBottom: 10 },

  input: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 20
  },

  button: {
    backgroundColor: '#3b2ca0',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff'
  }
});