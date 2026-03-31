import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Icon name="person" size={90} color="#4A6CF7" style={styles.icon} />

      <Text style={styles.title}>Study+</Text>

      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        CREATE ACCOUNT
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
  icon: { alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 28, textAlign: 'center', fontWeight: 'bold', marginBottom: 30 },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#4A6CF7',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5
  },

  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { textAlign: 'center', marginTop: 20, color: '#4A6CF7' }
});