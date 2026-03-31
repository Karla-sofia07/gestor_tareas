import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register user</Text>

      <TextInput placeholder="User" style={styles.input} onChangeText={setUser}/>
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail}/>
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPass}/>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>BACK TO LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#4A6CF7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  buttonText: { color: '#fff', fontWeight: 'bold' },

  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#4A6CF7'
  }
});