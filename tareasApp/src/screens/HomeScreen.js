import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola Jairo 👋</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Materias')}>
        <Icon name="menu-book" size={30} color="#fff" />
        <Text style={styles.cardText}>Materias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Tareas')}>
        <Icon name="assignment" size={30} color="#fff" />
        <Text style={styles.cardText}>Tareas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },

  card: {
    backgroundColor: '#4A6CF7',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },

  cardText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10
  }
});