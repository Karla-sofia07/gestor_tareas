import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { createMateria, updateMateria } from "../../services/materiaService";

export default function MateriaFormScreen({ route, navigation }) {
  const materia = route.params?.materia;

  const [nombre, setNombre] = useState(materia?.nombre || "");

  const handleSave = async () => {
    if (materia) {
      await updateMateria(materia.id, { nombre });
    } else {
      await createMateria({ nombre });
    }
    navigation.goBack();
  };

  return (
    <View>
      <TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre" />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}