import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { register } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email.includes("@")) {
      return Alert.alert("Error", "Correo inválido");
    }

    try {
      await register({ name, email, password });
      Alert.alert("Éxito", "Usuario creado");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nombre" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}