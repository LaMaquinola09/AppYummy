import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Para mostrar un spinner mientras se realiza la autenticación

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, introduce tu correo y contraseña.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://yummy.soudevteam.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log(data); // Para verificar la respuesta

            if (response.ok) {
                Alert.alert('Login exitoso', `Bienvenido ${data.user.nombre}`);
                // Almacena el nombre de usuario
                await AsyncStorage.setItem('userName', data.user.nombre); // Almacena el nombre de usuario
                await AsyncStorage.setItem('userEmail', data.user.email);
                await AsyncStorage.setItem('userPhone', data.user.telefono);
                await AsyncStorage.setItem('userDireccion', data.user.direccion); // Opcional

                // Si la API eventualmente devuelve un token, se puede manejar aquí
                if (data.token) {
                    await AsyncStorage.setItem('token', data.token);
                }

                navigation.navigate('MainDrawer'); // Navega a la pantalla principal
            } else {
                Alert.alert('Error de autenticación', data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092' }} // URL de imagen de comida de fondo
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.title}>Login</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                    <Text style={styles.registerText}>¿No tienes una cuenta? ¡Regístrate!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        padding: 20,
        borderRadius: 10,
    },
    containerHeader: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: 250,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#000',
    },
    loginButton: {
        backgroundColor: '#ff6347', // Color similar al de una salsa de tomate
        padding: 15,
        marginBottom: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    registerText: {
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default LoginScreen;
