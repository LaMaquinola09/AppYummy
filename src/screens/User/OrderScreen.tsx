import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const clienteID = await AsyncStorage.getItem('userID'); 
            
            if (clienteID) {
                const response = await axios.get(`https://yummy.soudevteam.com/orders/${clienteID}`);
                setOrders(response.data);
            } else {
                console.log("Usuario o token no encontrados en almacenamiento.");
            }
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#ff6f00" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de pedidos</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <Text style={styles.orderTitle}>Pedido ID: {item.id}</Text>
                        <Text style={styles.restaurantName}>Restaurante: {item.restaurante.nombre}</Text>
                        <Text style={styles.orderText}>Dirección: {item.restaurante.direccion}</Text>
                        <Text style={styles.orderText}>Teléfono: {item.restaurante.telefono}</Text>
                        <Text style={styles.sectionTitle}>Productos</Text>
                        {item.productos.map((product) => (
                            <View key={product.id} style={styles.productItem}>
                                <Text style={styles.productName}>Nombre: {product.nombre_producto}</Text>
                                <Text style={styles.productDescription}>Descripción: {product.descripcion}</Text>
                                <Text style={styles.productDescription}>Cantidad: {product.pivot.cantidad}</Text>
                                <Text style={styles.productPrice}>Precio: ${product.precio}</Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderColor: '#f0f0f0',
        borderWidth: 1,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ff6f00',
        marginBottom: 8,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    orderText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        marginTop: 12,
        marginBottom: 6,
    },
    productItem: {
        paddingVertical: 0,
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#777',
    },
    productDescription: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
    productPrice: {
        fontSize: 14,
        color: '#ff6f00',
        fontWeight: '500',
        marginTop: 2,
        // marginBottom: 4,
    },
});

export default OrdersScreen;
