import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen({ navigation }) {
  return (
    <LinearGradient colors={['#3B5BDB', '#5C7CFA']} style={styles.container}>

      <Text style={styles.logo}>👤</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Register user</Text>

        <TextInput placeholder="User" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          BACK TO LOGIN
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