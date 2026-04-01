import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Mínimo 6 caracteres en contraseña');
      return;
    }

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member login</Text>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Ionicons name="person" size={60} color="#fff" />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.options}>
          <Text style={styles.optionText}>Remember me</Text>
          <Text style={styles.optionText}>Forgot password?</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Navegación */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b6edc',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 25,
    fontWeight: '600'
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -55,
    zIndex: 1,
    elevation: 5
  },

  card: {
    width: '85%',
    backgroundColor: '#0d2c6b',
    padding: 25,
    alignItems: 'center',
    borderRadius: 10
  },

  input: {
    width: '100%',
    backgroundColor: '#d9d9d9',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5
  },

  options: {
    width: '100%',
    marginBottom: 20
  },

  optionText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 3
  },

  button: {
    backgroundColor: '#1fa4c7',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1
  },

  link: {
    color: '#fff',
    marginTop: 15,
    fontSize: 12,
    textDecorationLine: 'underline'
  }
});