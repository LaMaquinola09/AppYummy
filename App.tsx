import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation/types';
import LoginScreen from './src/screens/Auth/LoginScreen';
import HomeScreen from './src/screens/User/Home';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import CourierHomeScreen from './src/screens/Courier/CourierHomeScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
             <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }} // Ocultar encabezado
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: true, title: 'Register' }} // Mostrar encabezado con título
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }} // Pantalla principal del usuario final
                />
                <Stack.Screen
                    name="CourierHome"
                    component={CourierHomeScreen}
                    options={{ headerShown: false }} // Pantalla principal del repartidor
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}