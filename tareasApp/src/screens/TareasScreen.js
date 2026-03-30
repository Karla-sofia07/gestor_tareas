import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import { getTareas, createTarea, deleteTarea } from "../services/tareaService";

export default function TareasScreen() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const loadTareas = async () => {
    const res = await getTareas();
    setTareas(res.data);
  };

  useEffect(() => {
    loadTareas();
  }, []);

  const handleCreate = async () => {
    await createTarea({ titulo });
    setTitulo("");
    loadTareas();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nueva tarea" onChangeText={setTitulo} value={titulo} />
      <Button title="Agregar" onPress={handleCreate} />

      <FlatList
        data={tareas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Button title="Eliminar" onPress={() => deleteTarea(item._id)} />
          </View>
        )}
      />
    </View>
  );
}