import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TareasScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de tareas</Text>
    </View>
  );
};

export default TareasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});