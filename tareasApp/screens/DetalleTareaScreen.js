import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetalleTareaScreen = ({ route, navigation }) => {
  const { tarea } = route.params;

  const prioridadColor = () => {
    if (tarea.id_prioridad === 3) return '#e74c3c';
    if (tarea.id_prioridad === 2) return '#f1c40f';
    return '#2ecc71';
  };

  const prioridadLabel = () => {
    if (tarea.id_prioridad === 3) return 'Alta';
    if (tarea.id_prioridad === 2) return 'Media';
    return 'Baja';
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Detalle de Tarea</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditarTarea', { tarea })}>
          <Ionicons name="create-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body}>

        <View style={styles.card}>
          <Text style={styles.titulo}>{tarea.titulo}</Text>

          <View style={styles.row}>
            <Ionicons name="document-text-outline" size={18} color="#666" />
            <Text style={styles.valor}>{tarea.descripcion || 'Sin descripción'}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <Text style={styles.valor}>{tarea.fecha_entrega}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="book-outline" size={18} color="#666" />
            <Text style={styles.valor}>Materia ID: {tarea.id_materia}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="flag-outline" size={18} color={prioridadColor()} />
            <Text style={[styles.valor, { color: prioridadColor() }]}>
              Prioridad: {prioridadLabel()}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#3b6edc" />
            <Text style={styles.valor}>Estado ID: {tarea.id_estado}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnEditar}
          onPress={() => navigation.navigate('EditarTarea', { tarea })}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.btnEditarText}>Editar tarea</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default DetalleTareaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#3b6edc',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  body: {
    padding: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12
  },
  valor: {
    fontSize: 15,
    color: '#444'
  },
  btnEditar: {
    backgroundColor: '#3b2ca0',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  btnEditarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
});