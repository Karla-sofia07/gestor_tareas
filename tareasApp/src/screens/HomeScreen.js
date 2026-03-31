import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola 👋</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Materias')}>
        <Icon name="menu-book" size={30} color="#fff" />
        <Text style={styles.cardText}>Materias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { backgroundColor: '#FF8C42' }]} onPress={() => navigation.navigate('Tareas')}>
        <Icon name="assignment" size={30} color="#fff" />
        <Text style={styles.cardText}>Tareas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },

  card: {
    backgroundColor: '#4A6CF7',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5
  },

  cardText: { color: '#fff', fontSize: 18, marginLeft: 10 }
});