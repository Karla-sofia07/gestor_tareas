import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <LinearGradient colors={['#3B5BDB', '#5C7CFA']} style={styles.container}>

      <Text style={styles.logo}>👤</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Member login</Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUser}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={setPass}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
        >
          CREATE ACCOUNT
        </Text>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 60,
    marginBottom: 20,
  },

  card: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#3B5BDB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    marginTop: 10,
    color: '#3B5BDB',
  }
});