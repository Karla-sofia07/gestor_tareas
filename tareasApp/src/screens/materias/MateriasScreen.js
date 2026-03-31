import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MateriasScreen({ navigation }) {

  const [materias, setMaterias] = useState([]);

  return (
    <View style={styles.container}>

      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No hay materias</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon name="menu-book" size={22} color="#4A6CF7" />
            <Text style={{ marginLeft: 10 }}>{item.nombre}</Text>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CrearMateria', { materias, setMaterias })}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4A6CF7',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  }
});