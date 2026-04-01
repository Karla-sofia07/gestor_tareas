import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// AUTH
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// HOME
import HomeScreen from '../screens/home/HomeScreen';

// MATERIAS
import MateriasScreen from '../screens/materias/MateriasScreen';
import MateriaForm from '../screens/materias/MateriaForm';

// TAREAS
import TareasScreen from '../screens/tareas/TareasScreen';
import TareaForm from '../screens/tareas/TareaForm';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Materias" component={MateriasScreen} />
      <Stack.Screen name="MateriaForm" component={MateriaForm} />

      <Stack.Screen name="Tareas" component={TareasScreen} />
      <Stack.Screen name="TareaForm" component={TareaForm} />

    </Stack.Navigator>
  );
}