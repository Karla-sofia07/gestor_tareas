import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { getMaterias, deleteMateria } from "../../services/materiaService";

export default function MateriasScreen({ navigation }) {
  const [materias, setMaterias] = useState([]);

  const load = async () => {
    const res = await getMaterias();
    setMaterias(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View>
      <Button title="Crear Materia" onPress={() => navigation.navigate("MateriaForm")} />

      <FlatList
        data={materias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Button title="Editar" onPress={() => navigation.navigate("MateriaForm", { materia: item })} />
            <Button title="Eliminar" onPress={async () => { await deleteMateria(item.id); load(); }} />
            <Button title="Ver tareas" onPress={() => navigation.navigate("Tareas", { materiaId: item.id })} />
          </View>
        )}
      />
    </View>
  );
}