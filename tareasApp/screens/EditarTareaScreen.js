import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, Alert, ScrollView, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { editarTarea, getMaterias } from '../services/api';

const EditarTareaScreen = ({ route, navigation }) => {
  const { tarea } = route.params;

  const [titulo, setTitulo] = useState(tarea.titulo || '');
  const [descripcion, setDescripcion] = useState(tarea.descripcion || '');
  const [fecha, setFecha] = useState(tarea.fecha_entrega?.toString().slice(0, 10) || '');
  const [prioridad, setPrioridad] = useState(
    tarea.id_prioridad === 3 ? 'alta' : tarea.id_prioridad === 2 ? 'media' : 'baja'
  );
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(tarea.id_materia || null);
  const [cargandoMaterias, setCargandoMaterias] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    const data = await getMaterias();
    setMaterias(data);
    setCargandoMaterias(false);
  };

  const handleGuardar = async () => {
    if (!titulo || !fecha || !prioridad || !materiaSeleccionada) {
      Alert.alert('Error', 'Completa todos los campos obligatorios');
      return;
    }

    if (fecha.length < 10) {
      Alert.alert('Error', 'Formato de fecha inválido (YYYY-MM-DD)');
      return;
    }

    setLoading(true);
    try {
      const tareaActualizada = {
        titulo,
        descripcion,
        fecha_entrega: fecha,
        id_materia: materiaSeleccionada,
        id_prioridad: prioridad === 'alta' ? 3 : prioridad === 'media' ? 2 : 1,
        id_estado: tarea.id_estado || 1
      };

      console.log('📤 ENVIANDO EDICIÓN:', JSON.stringify(tareaActualizada));
      console.log('🆔 ID TAREA:', tarea.id_tarea);

      const resultado = await editarTarea(tarea.id_tarea, tareaActualizada);

      console.log('📥 RESULTADO EDICIÓN:', JSON.stringify(resultado));

      if (resultado) {
        Alert.alert('¡Listo!', 'Tarea actualizada correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', 'No se pudo actualizar la tarea');
      }
    } catch (error) {
      console.log('❌ Error al editar tarea:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar');
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.headerTitle}>Editar Tarea</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.form}>

        <Text style={styles.label}>📌 Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Nombre de la tarea"
        />

        <Text style={styles.label}>📝 Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción"
          multiline
        />

        <Text style={styles.label}>📅 Fecha (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="2026-12-31"
        />

        <Text style={styles.label}>🎯 Prioridad</Text>
        <View style={styles.prioridadContainer}>
          <PrioridadBtn label="Alta"  color="#e74c3c" value="alta"  selected={prioridad} setSelected={setPrioridad} />
          <PrioridadBtn label="Media" color="#f1c40f" value="media" selected={prioridad} setSelected={setPrioridad} />
          <PrioridadBtn label="Baja"  color="#2ecc71" value="baja"  selected={prioridad} setSelected={setPrioridad} />
        </View>

        <Text style={styles.label}>🎓 Materia</Text>
        {cargandoMaterias ? (
          <ActivityIndicator color="#3b6edc" />
        ) : (
          <View style={styles.materiasContainer}>
            {materias.map((m) => (
              <TouchableOpacity
                key={m.id_materia}
                style={[
                  styles.materiaBtn,
                  materiaSeleccionada === m.id_materia && styles.materiaBtnSelected
                ]}
                onPress={() => setMateriaSeleccionada(m.id_materia)}
              >
                <Text style={[
                  styles.materiaBtnText,
                  materiaSeleccionada === m.id_materia && styles.materiaBtnTextSelected
                ]}>
                  {m.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Guardar cambios</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default EditarTareaScreen;

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  form: { padding: 20 },
  label: { fontSize: 15, marginBottom: 5, fontWeight: '500' },
  input: { backgroundColor: '#eee', padding: 10, borderRadius: 5, marginBottom: 15 },
  textArea: { height: 80, textAlignVertical: 'top' },
  prioridadContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  prioridadBtn: { padding: 10, borderRadius: 20, width: '30%', alignItems: 'center' },
  prioridadText: { color: '#fff', fontWeight: 'bold' },
  materiasContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 15 },
  materiaBtn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#eee', borderWidth: 1, borderColor: '#ccc' },
  materiaBtnSelected: { backgroundColor: '#3b6edc', borderColor: '#3b6edc' },
  materiaBtnText: { color: '#333', fontWeight: '500' },
  materiaBtnTextSelected: { color: '#fff' },
  buttons: { marginTop: 20, marginBottom: 40 },
  btnGuardar: { backgroundColor: '#3b2ca0', padding: 15, borderRadius: 25, marginBottom: 10, alignItems: 'center' },
  btnCancelar: { backgroundColor: '#f06c0c', padding: 15, borderRadius: 25, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});