import React from "react";
import { View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Materias" onPress={() => navigation.navigate("Materias")} />
      <Button title="Tareas" onPress={() => navigation.navigate("Tareas")} />
    </View>
  );
}