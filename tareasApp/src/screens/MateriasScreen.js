import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import { getMaterias, createMateria, deleteMateria } from "../services/materiaService";

export default function MateriasScreen() {
  const [materias, setMaterias] = useState([]);
  const [nombre, setNombre] = useState("");

  const loadMaterias = async () => {
    const res = await getMaterias();
    setMaterias(res.data);
  };

  useEffect(() => {
    loadMaterias();
  }, []);

  const handleCreate = async () => {
    await createMateria({ nombre });
    setNombre("");
    loadMaterias();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nueva materia" onChangeText={setNombre} value={nombre} />
      <Button title="Agregar" onPress={handleCreate} />

      <FlatList
        data={materias}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Button title="Eliminar" onPress={() => deleteMateria(item._id)} />
          </View>
        )}
      />
    </View>
  );
}