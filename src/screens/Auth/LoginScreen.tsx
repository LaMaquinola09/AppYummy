import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica para manejar el inicio de sesión
        console.log('Logging in with', email, password);
    };

    return (
        <ImageBackground
            source={{ uri: 'https://example.com/food-background.jpg' }} // URL de imagen de comida de fondo
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Yummy!</Text>
                <Text style={styles.subtitle}>Deliciousness delivered to your door</Text>

                <TextInput
                    style={styles.input}
                    placeholder="🍕 Email"
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="🍔 Password"
                    placeholderTextColor="#fff"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Order In!</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.registerText}>Don’t have an account? Sign up!</Text>
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
