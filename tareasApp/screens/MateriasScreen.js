import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MateriasScreen = () => {
  const [materias, setMaterias] = useState([
    { id: '1', nombre: 'Matemáticas' },
    { id: '2', nombre: 'Programación' }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [editando, setEditando] = useState(null);

  // ➕ Crear o editar
  const guardarMateria = () => {
    if (!nombre) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    if (editando) {
      // ✏️ editar
      setMaterias(materias.map(m =>
        m.id === editando ? { ...m, nombre } : m
      ));
      setEditando(null);
    } else {
      // ➕ crear
      const nueva = {
        id: Date.now().toString(),
        nombre
      };
      setMaterias([...materias, nueva]);
    }

    setNombre('');
    setModalVisible(false);
  };

  // 🗑️ eliminar (simulado)
  const eliminarMateria = (id) => {
    Alert.alert('Eliminar', '¿Seguro?', [
      { text: 'Cancelar' },
      {
        text: 'Sí',
        onPress: () => {
          setMaterias(materias.filter(m => m.id !== id));
        }
      }
    ]);
  };

  // ✏️ abrir modal editar
  const editarMateria = (materia) => {
    setNombre(materia.nombre);
    setEditando(materia.id);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.nombre}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => editarMateria(item)}>
          <Ionicons name="create" size={20} color="#3b6edc" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => eliminarMateria(item.id)}>
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materias</Text>

      <FlatList
        data={materias}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {/* ➕ Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* 🧩 MODAL */}
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

            <TouchableOpacity style={styles.saveBtn} onPress={guardarMateria}>
              <Text style={{ color: '#fff' }}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default MateriasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  text: {
    fontSize: 16
  },

  actions: {
    flexDirection: 'row',
    gap: 15
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3b6edc',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  modal: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10
  },

  modalTitle: {
    fontSize: 18,
    marginBottom: 10
  },

  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5
  },

  saveBtn: {
    backgroundColor: '#3b6edc',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5
  }
});