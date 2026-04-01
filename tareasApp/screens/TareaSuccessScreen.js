import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TareaSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Ionicons name="checkmark-circle" size={120} color="green" />

      <Text style={styles.text}>
        La tarea se ha creado correctamente
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>

    </View>
  );
};

export default TareaSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center'
  },

  button: {
    backgroundColor: '#3b2ca0',
    padding: 15,
    borderRadius: 25
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});