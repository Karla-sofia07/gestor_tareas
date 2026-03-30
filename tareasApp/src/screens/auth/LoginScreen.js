import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>

      <TextInput placeholder="Correo" style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Contraseña" secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Iniciar sesión" onPress={() => {}} />
    </View>
  );
}