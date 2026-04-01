import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { getTareas } from '../services/api';

console.log('FUNCION:', getTareas); // 👈 AGREGA ESTO

const TareasScreen = ({ navigation }) => {

  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

    const cargarTareas = async () => {
    try {
      const data = await getTareas();
      console.log('DATA:', data); // 👈 CLAVE
      setTareas(data);
      } catch (error) {
        console.log(error);
      }
      };

  return (
    <View style={styles.container}>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id_tarea.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetalleTarea', { tarea: item })}
          >
            <Text style={styles.title}>{item.titulo}</Text>
            <Text>{item.materia}</Text>
            <Text>{item.prioridad}</Text>
            <Text>{item.estado}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default TareasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16
  }
});