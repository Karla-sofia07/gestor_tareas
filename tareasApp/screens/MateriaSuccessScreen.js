import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MateriaSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Ionicons name="checkmark-circle" size={120} color="#2ecc71" />

      <Text style={styles.text}>
        La materia se ha creado correctamente
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

export default MateriaSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  text: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 20
  },

  button: {
    backgroundColor: '#3b2ca0',
    padding: 15,
    borderRadius: 25,
    width: '60%',
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});