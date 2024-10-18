import React from 'react';
import { Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from './src/navigation/types';
import LoginScreen from './src/screens/Auth/LoginScreen';
import HomeScreen from './src/screens/User/Home';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import CourierHomeScreen from './src/screens/Courier/CourierHomeScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();


// Drawer para las vistas que tendrán menú de hamburguesa
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "slide",
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#eee',
        drawerStyle: {
          backgroundColor: '#ff6f00', // Color de fondo del drawer
          width: 240, // Ancho del drawer
        },

      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="CourierHome" component={CourierHomeScreen} />
    </Drawer.Navigator>
  );
}

// Crea el Stack dentro de una pantalla del Drawer
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Ocultar encabezado
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: true, title: 'Bienvenido a YUMMY' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }} // Ocultar encabezado
      />
      {/* Vistas con menú de hamburguesa */}
      <Stack.Screen
        name="MainDrawer"
        component={DrawerNavigator}
        options={{ headerShown: false }} // El Drawer manejará el encabezado
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />

    </NavigationContainer>
  );
}