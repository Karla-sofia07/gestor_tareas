import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { login } from "../services/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>

      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <Button title="Ingresar" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}