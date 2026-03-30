import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { getTareas, deleteTarea, completeTarea } from "../../services/tareaService";

export default function TareasScreen({ route, navigation }) {
  const { materiaId } = route.params;
  const [tareas, setTareas] = useState([]);

  const load = async () => {
    const res = await getTareas();
    const filtradas = res.data.filter(t => t.materia_id === materiaId);
    setTareas(filtradas);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View>
      <Button title="Crear tarea" onPress={() => navigation.navigate("TareaForm", { materiaId })} />

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Text>{item.estado}</Text>

            <Button title="Completar" onPress={async () => { await completeTarea(item.id); load(); }} />
            <Button title="Editar" onPress={() => navigation.navigate("TareaForm", { tarea: item })} />
            <Button title="Eliminar" onPress={async () => { await deleteTarea(item.id); load(); }} />
          </View>
        )}
      />
    </View>
  );
}