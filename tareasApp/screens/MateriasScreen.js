import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, TextInput, Modal, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMaterias, crearMateria, editarMateria, eliminarMateria, getTareas } from '../services/api';

const MateriasScreen = ({ navigation }) => {
  const [materias, setMaterias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarMaterias);
    return unsubscribe;
  }, [navigation]);

  const cargarMaterias = async () => {
    const data = await getMaterias();
    setMaterias(data);
  };

  const guardarMateria = async () => {
    if (!nombre) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    if (editando) {
      const resultado = await editarMateria(editando, nombre, descripcion);
      if (!resultado) { Alert.alert('Error', 'No se pudo editar la materia'); return; }
    } else {
      const resultado = await crearMateria(nombre, descripcion);
      if (!resultado) { Alert.alert('Error', 'No se pudo crear la materia'); return; }
    }

    setNombre('');
    setDescripcion('');
    setEditando(null);
    setModalVisible(false);
    cargarMaterias();
  };

  const handleEliminar = (id_materia) => {
    Alert.alert('Eliminar materia', '¿Seguro? Se eliminarán también sus tareas.', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const resultado = await eliminarMateria(id_materia);
          if (resultado) cargarMaterias();
          else Alert.alert('Error', 'No se pudo eliminar la materia');
        }
      }
    ]);
  };

  const handleEditar = (materia) => {
    setNombre(materia.nombre);
    setDescripcion(materia.descripcion || '');
    setEditando(materia.id_materia);
    setModalVisible(true);
  };

  const handleVerTareas = (materia) => {
    navigation.navigate('Tareas', { filtroMateria: materia.id_materia });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleVerTareas(item)}>
      <View style={styles.itemLeft}>
        <View style={styles.iconMateria}>
          <Ionicons name="book-outline" size={20} color="#3b6edc" />
        </View>
        <View>
          <Text style={styles.nombreMateria}>{item.nombre}</Text>
          {item.descripcion ? <Text style={styles.descMateria}>{item.descripcion}</Text> : null}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEditar(item)} style={styles.actionBtn}>
          <Ionicons name="create-outline" size={22} color="#3b6edc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEliminar(item.id_materia)} style={styles.actionBtn}>
          <Ionicons name="trash-outline" size={22} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Materias</Text>
      </View>

      <FlatList
        data={materias}
        keyExtractor={item => item.id_materia.toString()}
        contentContainerStyle={{ padding: 15 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No tienes materias. ¡Crea una!</Text>
        }
        renderItem={renderItem}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => { setNombre(''); setDescripcion(''); setEditando(null); setModalVisible(true); }}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {editando ? 'Editar Materia' : 'Nueva Materia'}
            </Text>

            <TextInput
              placeholder="Nombre de la materia"
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />

            <TextInput
              placeholder="Descripción (opcional)"
              style={[styles.input, { marginTop: 10 }]}
              value={descripcion}
              onChangeText={setDescripcion}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={guardarMateria}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
              <Text style={{ color: '#666' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default MateriasScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#3b6edc',
    paddingTop: 50, paddingBottom: 15, paddingHorizontal: 15
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  item: {
    backgroundColor: '#fff', padding: 15, borderRadius: 10,
    marginBottom: 10, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center', elevation: 1
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconMateria: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center'
  },
  nombreMateria: { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  descMateria: { fontSize: 12, color: '#888', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 4 },
  empty: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 15 },
  fab: {
    position: 'absolute', bottom: 20, right: 20,
    backgroundColor: '#3b6edc', width: 60, height: 60,
    borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5
  },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modal: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#eee', padding: 12, borderRadius: 8 },
  saveBtn: {
    backgroundColor: '#3b6edc', padding: 12,
    marginTop: 15, alignItems: 'center', borderRadius: 8
  },
  cancelBtn: { marginTop: 10, alignItems: 'center', padding: 8 }
});