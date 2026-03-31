import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MateriaForm({ route, navigation }) {

  const { materias, setMaterias } = route.params;
  const [nombre, setNombre] = useState('');

  return (
    <View style={styles.container}>

      <TextInput 
        placeholder="Nombre de la materia" 
        style={styles.input}
        onChangeText={setNombre}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          const nueva = {
            id: Date.now().toString(),
            nombre
          };

          setMaterias([...materias, nueva]);
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  button: {
    backgroundColor: '#4A6CF7',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  buttonText: { color: '#fff' }
});