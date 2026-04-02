import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { login } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Email inválido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Mínimo 6 caracteres en contraseña');
      return;
    }

    setLoading(true);
    try {
      const usuario = await login(email, password);
      console.log('✅ Usuario logueado:', usuario);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member login</Text>

      <View style={styles.avatar}>
        <Ionicons name="person" size={60} color="#fff" />
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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
          <Text style={styles.optionText}>Forgot password?</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>LOGIN</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
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
    fontSize: 12
  },
  button: {
    backgroundColor: '#1fa4c7',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    minWidth: 120,
    alignItems: 'center'
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