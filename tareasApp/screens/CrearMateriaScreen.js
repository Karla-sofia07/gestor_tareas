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

const CrearMateriaScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleCrear = () => {
    if (!nombre) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    // Aquí luego irá backend

    navigation.navigate('MateriaSuccess');
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Crear Materia</Text>
        <Ionicons name="person-circle" size={30} color="#fff" />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.label}>🎓 Nombre de la materia</Text>
        <TextInput
          placeholder="Ingresa el nombre de la materia"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>📝 Descripción</Text>
        <TextInput
          placeholder="Ingresa una breve descripción"
          style={[styles.input, { height: 100 }]}
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>

      {/* BOTONES */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnCrear} onPress={handleCrear}>
          <Text style={styles.btnText}>Crear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CrearMateriaScreen;

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
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500'
  },

  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
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