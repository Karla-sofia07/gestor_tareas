import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';

import MateriasScreen from '../screens/materias/MateriasScreen';
import MateriaForm from '../screens/materias/MateriaForm';

import TareasScreen from '../screens/tareas/TareasScreen';
import TareaForm from '../screens/tareas/TareaForm';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Materias" component={MateriasScreen} />
      <Stack.Screen name="CrearMateria" component={MateriaForm} />

      <Stack.Screen name="Tareas" component={TareasScreen} />
      <Stack.Screen name="CrearTarea" component={TareaForm} />
    </Stack.Navigator>
  );
}