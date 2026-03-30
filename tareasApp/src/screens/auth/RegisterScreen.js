import { useState, useContext } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleRegister = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Campos requeridos");
    }

    try {
      await register(form);
      Alert.alert("Registrado");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Error en registro");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={(t) => setForm({ ...form, email: t })} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={(t) => setForm({ ...form, password: t })} />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}