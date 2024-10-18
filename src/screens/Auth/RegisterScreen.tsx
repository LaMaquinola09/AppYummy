import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [vehiculo, setVehiculo] = useState('');

    const route = useRoute<RouteProp<RootStackParamList, 'Register'>>();
    const rol = route.params.rol; // Asegúrate de que 'rol' esté definido al navegar a esta pantalla

    useEffect(() => {
        console.log('Rol recibido:', rol); // Verifica el valor de rol
        navigation.setOptions({ title: 'Registro' });
    }, [navigation, rol]);

    const handleRegister = async () => {
        console.log('Registering with', email, password, rol);

        // Validación básica
        if (!name || !email || !password || !direccion || !telefono) {
            Alert.alert('Error', 'Por favor, completa todos los campos requeridos.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('https://yummy.soudevteam.com/movilregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: name,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                    direccion,
                    telefono,
                    vehiculo: vehiculo || null, // Solo se envía si se ha proporcionado
                    rol, // Asegúrate de que rol sea válido
                }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Response from server:', jsonResponse); // Muestra la respuesta completa del servidor
                Alert.alert('Éxito', 'Usuario registrado con éxito');
                resetFields();
                navigation.navigate('Repartidor');
            } else {
                const errorResponse = await response.json();
                console.error('Error response from server:', errorResponse);
                Alert.alert('Error', errorResponse.message || 'Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Connection error:', error);
            Alert.alert('Error de conexión', 'Hubo un problema al conectar con el servidor.');
        }
    };

    const resetFields = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setDireccion('');
        setTelefono('');
        setVehiculo('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de Vehículo (opcional: moto/bicicleta/ninguno)"
                value={vehiculo}
                onChangeText={setVehiculo}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RegisterScreen;
