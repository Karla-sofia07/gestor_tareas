import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

const API_URL = 'http://192.168.100.63:3000/tareas'; // pon tu IP

const HomeScreen = ({ navigation }) => {

  const getTareas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log('🔥 Tareas desde backend:', data);
    } catch (error) {
      console.log('❌ Error al obtener tareas:', error);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 🔷 HEADER */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />

        <Text style={styles.headerTitle}>Main page</Text>

        <Ionicons 
          name="person-circle" 
          size={32} 
          color="#fff"
          onPress={() => navigation.navigate('Perfil')}
        />
      </View>

      {/* 📋 MENÚ */}
      <View style={styles.menu}>
        
        <MenuItem 
          icon="school" 
          text="Lista de materias" 
          onPress={() => navigation.navigate('Materias')}
        />

        <MenuItem 
          icon="add-circle" 
          text="Crear materia" 
          onPress={() => navigation.navigate('CrearMateria')}
        />

        <MenuItem 
          icon="list" 
          text="Lista de tareas" 
          onPress={() => navigation.navigate('Tareas')}
        />

        <MenuItem 
          icon="create" 
          text="Crear tarea" 
          onPress={() => navigation.navigate('CrearTarea')}
        />

        <MenuItem 
          icon="person" 
          text="Perfil de usuario" 
          onPress={() => navigation.navigate('Perfil')}
        />

      </View>

      {/* 🔘 ACCIONES */}
      <View style={styles.actions}>
        
        <TouchableOpacity
          style={styles.btnMaterias}
          onPress={() => navigation.navigate('Materias')}
        >
          <Text style={styles.btnText}>Ir a Materias</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnTareas}
          onPress={() => navigation.navigate('Tareas')}
        >
          <Text style={styles.btnText}>Ver Tareas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnCrearTarea}
          onPress={() => navigation.navigate('CrearTarea')}
        >
          <Text style={styles.btnText}>+ Nueva Tarea</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#555" />
    <Text style={styles.itemText}>{text}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },

  header: {
    backgroundColor: '#3b6edc',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },

  menu: { padding: 15 },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between'
  },

  itemText: { flex: 1, marginLeft: 10, fontSize: 14 },

  actions: { marginTop: 'auto', padding: 20 },

  btnMaterias: { backgroundColor: '#3b2ca0', padding: 15, borderRadius: 25, marginBottom: 10, alignItems: 'center' },
  btnTareas: { backgroundColor: '#f06c0c', padding: 15, borderRadius: 25, marginBottom: 10, alignItems: 'center' },
  btnCrearTarea: { backgroundColor: '#20c997', padding: 15, borderRadius: 25, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});