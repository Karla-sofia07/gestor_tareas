import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TareaForm() {
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título" style={styles.input} onChangeText={setTitulo}/>
      <TextInput placeholder="Descripción" style={styles.input} onChangeText={setDesc}/>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#4A6CF7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  buttonText: { color: '#fff' }
});