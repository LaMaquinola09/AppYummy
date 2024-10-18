import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica de autenticación
        console.log('Logging in with', email, password);
        navigation.navigate('Home'); // Navegar a la pantalla Home después de iniciar sesión
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
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Aún no tienes una cuenta? Regístrate!</Text>
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
        alignItems: 'center' 
    },
    title: {
        fontSize: 32,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
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
        marginBottom:15,
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
