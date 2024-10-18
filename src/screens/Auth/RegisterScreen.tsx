import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [direccion, setDireccion] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [phone, setPhone] = useState('');
    const [zone, setZone] = useState('');

    const route = useRoute<RouteProp<RootStackParamList, 'Register'>>();
    const userType = route.params.userType;

    // Cambiar el título del encabezado en función del tipo de usuario
    useEffect(() => {
        const title = userType === 'repartidor' ? 'Registrarse como Repartidor' : 'Registrarse como Usuario';
        navigation.setOptions({ title });
    }, [userType, navigation]);

    const handleRegister = () => {
        console.log('Registering with', email, password, userType);
        
        // Aquí puedes agregar la lógica para registrar al usuario en tu base de datos
        if (userType === 'repartidor') {
            console.log('Vehicle Type:', vehicleType);
            console.log('Zone:', zone);
            // Validar y enviar datos del repartidor
        } else {
            console.log('Delivery Address:', direccion);
            // Validar y enviar datos del consumidor
        }
        
        // Reiniciar campos tras el registro (opcional)
        resetFields();
    };

    const resetFields = () => {
        setEmail('');
        setPassword('');
        setName('');
        setDireccion('');
        setVehicleType('');
        setPhone('');
        setZone('');
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
                autoCapitalize="none" // Para que el email no se capitalice
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
                placeholder="Teléfono"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad" // Tipo de teclado para teléfono
            />

            {userType === 'repartidor' ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de Vehículo"
                        value={vehicleType}
                        onChangeText={setVehicleType}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Zona"
                        value={zone}
                        onChangeText={setZone}
                    />
                </>
            ) : (
                <TextInput
                    style={styles.input}
                    placeholder="Dirección de Entrega"
                    value={direccion}
                    onChangeText={setDireccion}
                />
            )}

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
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 250,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
