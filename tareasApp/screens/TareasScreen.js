import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Alert, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTareas, eliminarTarea, completarTarea, getMaterias } from '../services/api';

const ESTADOS = [
  { id: null, label: 'Todos' },
  { id: 1, label: 'Pendiente' },
  { id: 2, label: 'En progreso' },
  { id: 3, label: 'Completada' },
  { id: 4, label: 'Vencida' },
];

const PRIORIDADES = [
  { id: null, label: 'Todas' },
  { id: 1, label: 'Baja' },
  { id: 2, label: 'Media' },
  { id: 3, label: 'Alta' },
];

const TareasScreen = ({ navigation }) => {
  const [tareas, setTareas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [filtroMateria, setFiltroMateria] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState(null);
  const [filtroPrioridad, setFiltroPrioridad] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarTareas();
    });
    getMaterias().then(setMaterias);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    cargarTareas();
  }, [filtroMateria, filtroEstado, filtroPrioridad]);

  const cargarTareas = async () => {
    const filtros = {};
    if (filtroMateria)   filtros.id_materia   = filtroMateria;
    if (filtroEstado)    filtros.id_estado     = filtroEstado;
    if (filtroPrioridad) filtros.id_prioridad  = filtroPrioridad;

    console.log('🔍 FILTROS ENVIADOS:', JSON.stringify(filtros));
    const data = await getTareas(filtros);
    console.log('📥 TAREAS RECIBIDAS:', JSON.stringify(data));
    setTareas(data);
  };

  const handleEliminar = (id_tarea) => {
    Alert.alert('Eliminar tarea', '¿Estás seguro?', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const resultado = await eliminarTarea(id_tarea);
          if (resultado) cargarTareas();
          else Alert.alert('Error', 'No se pudo eliminar la tarea');
        }
      }
    ]);
  };

  const handleCompletar = async (id_tarea) => {
    console.log('✅ COMPLETANDO TAREA ID:', id_tarea);
    const resultado = await completarTarea(id_tarea);
    console.log('📥 RESULTADO COMPLETAR:', JSON.stringify(resultado));
    if (resultado) cargarTareas();
    else Alert.alert('Error', 'No se pudo completar la tarea');
  };

  const prioridadColor = (id) => {
    if (id === 3) return '#e74c3c';
    if (id === 2) return '#f1c40f';
    return '#2ecc71';
  };

  const renderFiltro = (opciones, valorActual, setValor) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtroRow}>
      {opciones.map((op) => (
        <TouchableOpacity
          key={String(op.id)}
          style={[styles.filtroBtn, valorActual === op.id && styles.filtroBtnActivo]}
          onPress={() => setValor(valorActual === op.id ? null : op.id)}
        >
          <Text style={[styles.filtroText, valorActual === op.id && styles.filtroTextActivo]}>
            {op.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const materiasConTodos = [{ id_materia: null, nombre: 'Todas' }, ...materias];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Tareas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CrearTarea')}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* FILTROS */}
      <View style={styles.filtros}>
        <Text style={styles.filtroLabel}>Materia</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtroRow}>
          {materiasConTodos.map((m) => (
            <TouchableOpacity
              key={String(m.id_materia)}
              style={[styles.filtroBtn, filtroMateria === m.id_materia && styles.filtroBtnActivo]}
              onPress={() => setFiltroMateria(filtroMateria === m.id_materia ? null : m.id_materia)}
            >
              <Text style={[styles.filtroText, filtroMateria === m.id_materia && styles.filtroTextActivo]}>
                {m.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.filtroLabel}>Estado</Text>
        {renderFiltro(ESTADOS, filtroEstado, setFiltroEstado)}

        <Text style={styles.filtroLabel}>Prioridad</Text>
        {renderFiltro(PRIORIDADES, filtroPrioridad, setFiltroPrioridad)}
      </View>

      {/* LISTA */}
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id_tarea.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay tareas con estos filtros</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.id_estado === 3 && styles.cardCompletada]}
            onPress={() => navigation.navigate('DetalleTarea', { tarea: item })}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.prioridadDot, { backgroundColor: prioridadColor(item.id_prioridad) }]} />
              <View>
                <Text style={[styles.cardTitulo, item.id_estado === 3 && styles.tituloCompletado]}>
                  {item.titulo}
                </Text>
                <Text style={styles.cardSub}>{item.materia} · {item.estado}</Text>
                <Text style={styles.cardFecha}>📅 {item.fecha_entrega?.toString().slice(0, 10)}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              {item.id_estado !== 3 && (
                <TouchableOpacity onPress={() => handleCompletar(item.id_tarea)} style={styles.actionBtn}>
                  <Ionicons name="checkmark-circle-outline" size={24} color="#2ecc71" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('EditarTarea', { tarea: item })}
                style={styles.actionBtn}
              >
                <Ionicons name="create-outline" size={24} color="#3b6edc" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEliminar(item.id_tarea)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TareasScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#3b6edc',
    paddingTop: 50, paddingBottom: 15, paddingHorizontal: 15,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  filtros: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, elevation: 2 },
  filtroLabel: { fontSize: 12, color: '#888', marginTop: 6, marginBottom: 4 },
  filtroRow: { flexDirection: 'row', marginBottom: 4 },
  filtroBtn: {
    paddingVertical: 5, paddingHorizontal: 12,
    borderRadius: 20, backgroundColor: '#eee',
    marginRight: 8, borderWidth: 1, borderColor: '#ddd'
  },
  filtroBtnActivo: { backgroundColor: '#3b6edc', borderColor: '#3b6edc' },
  filtroText: { fontSize: 13, color: '#444' },
  filtroTextActivo: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff', marginHorizontal: 15,
    marginTop: 10, borderRadius: 10, padding: 15,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', elevation: 1
  },
  cardCompletada: { opacity: 0.6 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  prioridadDot: { width: 10, height: 10, borderRadius: 5 },
  cardTitulo: { fontSize: 15, fontWeight: 'bold', color: '#1a1a1a' },
  tituloCompletado: { textDecorationLine: 'line-through', color: '#999' },
  cardSub: { fontSize: 12, color: '#666', marginTop: 2 },
  cardFecha: { fontSize: 12, color: '#999', marginTop: 2 },
  cardActions: { flexDirection: 'row', gap: 4 },
  actionBtn: { padding: 4 },
  empty: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 15 }
});