import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { createTarea, updateTarea } from "../../services/tareaService";

export default function TareaFormScreen({ route, navigation }) {
  const tarea = route.params?.tarea;
  const materiaId = route.params?.materiaId;

  const [titulo, setTitulo] = useState(tarea?.titulo || "");

  const handleSave = async () => {
    if (tarea) {
      await updateTarea(tarea.id, { titulo });
    } else {
      await createTarea({ titulo, materia_id: materiaId });
    }
    navigation.goBack();
  };

  return (
    <View>
      <TextInput value={titulo} onChangeText={setTitulo} placeholder="Título" />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}