import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CrearTareaScreen = ({ navigation }) => {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [prioridad, setPrioridad] = useState(null);
  const [materia, setMateria] = useState('');

  const handleCrear = () => {
    if (!titulo || !fecha || !prioridad || !materia) {
      Alert.alert('Error', 'Completa todos los campos obligatorios');
      return;
    }

    if (fecha.length < 10) {
      Alert.alert('Error', 'Formato de fecha inválido (YYYY-MM-DD)');
      return;
    }

    // 🚀 Aquí después irá conexión con backend
    navigation.navigate('TareaSuccess');
  };

  return (
    <View style={styles.container}>

      {/* 🔷 HEADER */}
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#fff" 
          onPress={() => navigation.goBack()} 
        />
        <Text style={styles.headerTitle}>Crear Tarea</Text>
        <Ionicons name="person-circle" size={30} color="#fff" />
      </View>

      {/* 📋 FORM */}
      <View style={styles.form}>

        <Text style={styles.label}>📌 Título</Text>
        <TextInput
          placeholder="Nombre de la tarea"
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>📝 Descripción</Text>
        <TextInput
          placeholder="Descripción"
          style={[styles.input, styles.textArea]}
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <Text style={styles.label}>📅 Fecha</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
        />

        <Text style={styles.label}>🎯 Prioridad</Text>
        <View style={styles.prioridadContainer}>
          <PrioridadBtn
            label="Alta"
            color="#e74c3c"
            value="alta"
            selected={prioridad}
            setSelected={setPrioridad}
          />
          <PrioridadBtn
            label="Media"
            color="#f1c40f"
            value="media"
            selected={prioridad}
            setSelected={setPrioridad}
          />
          <PrioridadBtn
            label="Baja"
            color="#2ecc71"
            value="baja"
            selected={prioridad}
            setSelected={setPrioridad}
          />
        </View>

        <Text style={styles.label}>🎓 Materia</Text>
        <TextInput
          placeholder="Ej: Matemáticas"
          style={styles.input}
          value={materia}
          onChangeText={setMateria}
        />

      </View>

      {/* 🔘 BOTONES */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnCrear} onPress={handleCrear}>
          <Text style={styles.btnText}>Crear</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnCancelar} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CrearTareaScreen;





// 🔥 COMPONENTE DE PRIORIDAD
const PrioridadBtn = ({ label, color, value, selected, setSelected }) => (
  <TouchableOpacity
    style={[
      styles.prioridadBtn,
      { backgroundColor: selected === value ? color : '#ccc' }
    ]}
    onPress={() => setSelected(value)}
  >
    <Text style={styles.prioridadText}>{label}</Text>
  </TouchableOpacity>
);





// 🎨 ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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

  form: {
    padding: 20
  },

  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '500'
  },

  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },

  prioridadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  prioridadBtn: {
    padding: 10,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center'
  },

  prioridadText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  buttons: {
    marginTop: 'auto',
    padding: 20
  },

  btnCrear: {
    backgroundColor: '#3b2ca0',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center'
  },

  btnCancelar: {
    backgroundColor: '#f06c0c',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center'
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});