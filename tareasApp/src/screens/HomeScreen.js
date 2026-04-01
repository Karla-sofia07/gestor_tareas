import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Study+</Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Materias')}
      >
        <Text style={globalStyles.buttonText}>Ir a Materias</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Tareas')}
      >
        <Text style={globalStyles.buttonText}>Ir a Tareas</Text>
      </TouchableOpacity>
    </View>
  );
}