import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TareaForm({ route, navigation }) {

  const { tareas, setTareas } = route.params;
  const [titulo, setTitulo] = useState('');

  return (
    <View style={styles.container}>

      <TextInput 
        placeholder="Título de la tarea" 
        style={styles.input}
        onChangeText={setTitulo}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          const nueva = {
            id: Date.now().toString(),
            titulo
          };

          setTareas([...tareas, nueva]);
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>

    </View>
  );
}