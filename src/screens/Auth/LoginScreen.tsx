import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // Lógica de autenticación
        console.log('Logging in with', email, password);
        navigation.navigate('Home'); // Navegar a la pantalla Home después de iniciar sesión
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Don’t have an account? Sign up!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
        color: '#fff',
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
        marginBottom: 15,
        color: '#fff',
    },
    loginButton: {
        backgroundColor: '#ff6347', // Color similar al de una salsa de tomate
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    registerText: {
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default LoginScreen;
