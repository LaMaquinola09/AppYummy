import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import HomeScreen from './src/screens/User/Home';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }} // Ocultar encabezado
                />
                {}
            </Stack.Navigator> */}

            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }} // Ocultar encabezado
                />
                {/* Otras pantallas pueden agregarse aquí, como Registro, Página Principal, etc. */}
            </Stack.Navigator>

        </NavigationContainer>
    );
}