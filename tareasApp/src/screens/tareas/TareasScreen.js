import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TareasScreen({ navigation }) {

  const [tareas, setTareas] = useState([]);

  return (
    <View style={styles.container}>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No hay tareas</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon name="assignment" size={22} color="#FF8C42" />
            <Text style={{ marginLeft: 10 }}>{item.titulo}</Text>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CrearTarea', { tareas, setTareas })}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}