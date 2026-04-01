import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MateriasScreen from '../screens/MateriasScreen';
import CrearMateriaScreen from '../screens/CrearMateriaScreen';
import MateriaSuccessScreen from '../screens/MateriaSuccessScreen';
import TareasScreen from '../screens/TareasScreen';
import CrearTareaScreen from '../screens/CrearTareaScreen';
import TareaSuccessScreen from '../screens/TareaSuccessScreen';
import EditarTareaScreen from '../screens/EditarTareaScreen';
import DetalleTareaScreen from '../screens/DetalleTareaScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Materias" component={MateriasScreen} />
        <Stack.Screen name="CrearMateria" component={CrearMateriaScreen} />
        <Stack.Screen name="MateriaSuccess" component={MateriaSuccessScreen} />
        <Stack.Screen name="Tareas" component={TareasScreen} />
        <Stack.Screen name="CrearTarea" component={CrearTareaScreen} />
        <Stack.Screen name="TareaSuccess" component={TareaSuccessScreen} /> 
        <Stack.Screen name="EditarTarea" component={EditarTareaScreen} />
        <Stack.Screen name="DetalleTarea" component={DetalleTareaScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;