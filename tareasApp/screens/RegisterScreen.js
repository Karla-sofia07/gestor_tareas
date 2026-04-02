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
import { register } from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePasswords = (pass, confirm) => {
    if (confirm && pass !== confirm) {
      setError('Las contraseñas no coinciden');
    } else {
      setError('');
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      Alert.alert('¡Listo!', 'Cuenta creada exitosamente', [
        { text: 'Iniciar sesión', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register user</Text>

      <View style={styles.avatar}>
        <Ionicons name="person" size={60} color="#fff" />
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

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
          onChangeText={(text) => {
            setPassword(text);
            validatePasswords(text, confirmPassword);
          }}
        />

        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            validatePasswords(password, text);
          }}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
  error: {
    color: '#ff4d4d',
    marginBottom: 10,
    fontSize: 12
  },
  button: {
    backgroundColor: '#1fa4c7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    minWidth: 150,
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