import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, Button, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from "axios";

export default function CartScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingI, setLoadingI] = useState(true);
    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        getCart();
    }, []);

    const enviarCarrito = async (carrito:any) => {
        try {
          // Obtén la ID del cliente desde AsyncStorage
          const clienteID = await AsyncStorage.getItem("userID");
          const direccion = await AsyncStorage.getItem("userDireccion");
      
          // Obtener restaurante_id del primer producto en el carrito
          const restauranteID = carrito.length > 0 ? carrito[0].restaurante_id : null;
            
      
          // Preparar datos para el pedido
          const pedidoData = {
            cliente_id: parseInt(clienteID),
            restaurante_id: parseInt(restauranteID),
            direccion_entrega_id: direccion, // Dirección del cliente
            estado: "pendiente",
            metodo_pago_id: 2,
            items: carrito.map((producto) => ({
              menu_item_id: producto.id,
              cantidad: producto.cantidad,
              precio_total: producto.precio * producto.cantidad,
            })),
          };
          console.log(pedidoData)
      
          // Enviar datos al backend
          const csrfResponse = await fetch('https://yummy.soudevteam.com/csrf-token', {
            method: 'GET',
        });
        const { csrf_token } = await csrfResponse.json();
        const response = await fetch('https://yummy.soudevteam.com/mkpedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token
            },
            body: JSON.stringify(pedidoData), // Monto en pesos (ejemplo: $500 MXN)
        });
      
          if (response.status === 201) {
            Alert.alert("Pedido enviado con éxito:", response.data);
          } else {
            console.error("Error al enviar el pedido:", response.status);
          }
        } catch (error) {
          Alert.alert("Error al procesar el pedido:", error);
        }
      };


    const fetchPaymentSheetParams = async () => {
        const total = products.reduce((accumulator, product) => accumulator + product.precio * product.cantidad, 0);
        // Obtener el token CSRF
        const csrfResponse = await fetch('https://yummy.soudevteam.com/csrf-token', {
            method: 'GET',
        });
        const { csrf_token } = await csrfResponse.json();
        const response = await fetch('https://yummy.soudevteam.com/checkoutM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token
            },
            body: JSON.stringify({ amount: total }), // Monto en pesos (ejemplo: $500 MXN)
        });

        const { paymentIntent, ephemeralKey, customer } = await response.json();
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: paymentIntent,
            customerEphemeralKeySecret: ephemeralKey,
            customerId: customer,
            merchantDisplayName: 'Yummy', // Opcional
        });

        if (error) {
            Alert.alert('Error', error.message);
        }
    };

    const openPaymentSheet = async () => {
        
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            setIsProcessing(false);
            await enviarCarrito(products);
            await AsyncStorage.removeItem('cart');
            const navigation = useNavigation();
            navigation.reset({index:0, routes:[{name:'Inicio'}]})
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        await initializePaymentSheet();
        await openPaymentSheet();
    };

    // Agrupa productos duplicados y suma sus cantidades
    const groupProducts = (cart) => {
        const grouped = cart.reduce((acc, product) => {
            const existing = acc.find(item => item.id === product.id);
            if (existing) {
                existing.cantidad += 1; // Incrementa cantidad si ya existe
            } else {
                acc.push({ ...product, cantidad: 1 }); // Agrega nuevo producto con cantidad 1
            }
            return acc;
        }, []);
        return grouped;
    };

    const getCart = async () => {
        try {
            const cart = await AsyncStorage.getItem('cart');
            const parsedCart = cart ? JSON.parse(cart) : [];

            if (parsedCart.length === 0) {
                Alert.alert(
                    'Carrito vacío',
                    'El carrito de pedidos aún no tiene nada, agrega platillos para proceder con la compra.',
                    [{ text: 'Aceptar', onPress: () => setLoading(false) }]
                );
            } else {
                const groupedProducts = groupProducts(parsedCart);
                setProducts(groupedProducts);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        }
    };

    const delFromCart = async (product) => {
        try {
            const updatedCart = products.map(item => {
                if (item.id === product.id) {
                    // Disminuir cantidad si es mayor a 1
                    return { ...item, cantidad: item.cantidad - 1 };
                }
                return item; // Devolver el producto sin cambios
            }).filter(item => item.cantidad > 0); // Filtrar productos con cantidad > 0
    
            // Guardar en AsyncStorage
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    
            // Actualizar el estado de los productos directamente
            setProducts(updatedCart);
    
            // Mostrar alerta si el carrito está vacío
            if (updatedCart.length === 0) {
                Alert.alert('Carrito vacío', 'Se han eliminado todos los productos.');
            }
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            {loading && <ActivityIndicator size="large" color="#ff6f00" />}
            {!loading && products.length === 0 && <Text style={styles.productLess}>No hay productos en el carrito</Text>}
            {!loading && products.length > 0 && <Text style={styles.productLess}>Restaurante: {products[0].restaurantName}</Text>}
            {!loading &&
                products.map((product) => (
                    <View key={product.id} style={styles.productCard}>
                        {loadingI && <ActivityIndicator size="large" color="#ff6f00" />}
                            <Image
                                source={{ uri: product.imagen }}
                                style={styles.categoryImageLogo}
                                onLoadEnd={() => setLoadingI(false)}
                                onError={() => setLoadingI(false)}
                            />
                            <TouchableOpacity
                            style={styles.delButton}
                            onPress={() => delFromCart(product)}
                        >
                            <Text style={styles.addButtonText}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.productName}>{product.nombre}</Text>
                            <Text style={styles.productPrice}>
                                ${product.precio} x {product.cantidad} = ${product.precio * product.cantidad}
                            </Text>
                        </View>
                        
                    </View>
                ))
            }
            {/* {restaurants.map((restaurant) => (
                        <View key={restaurant.key} style={styles.restaurantCard}>
                            {loadingI && <ActivityIndicator size="large" color="#ff6f00" />}
                            <Image
                                source={{ uri: restaurant.imagen }}
                                style={styles.categoryImageLogo}
                                onLoadEnd={() => setLoadingI(false)}
                                onError={() => setLoadingI(false)}
                            />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.restaurantName}>{restaurant.nombre}</Text>
                                <Text style={styles.restaurantPrice}>${restaurant.precio}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.delButton}
                                onPress={() => delFromCart(restaurant)}
                            >
                                <Text style={styles.addButtonText}>-</Text>
                            </TouchableOpacity>
                        </View>
                    ))} */}
                    {!loading && products.length > 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Button title={isProcessing ? "Procesando..." : "Pagar"} disabled={isProcessing} onPress={handlePayment} /></View>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ff9d00',
        color: '#ff6600',
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginBottom: 15,
        textAlign: 'center',
        width: '70%',
    },
    searchButton: {
        backgroundColor: '#ff8c00',
        padding: 15,
        borderRadius: 25,
        marginBottom: 15,
        marginLeft: 10,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        alignItems:'flex-start'
    },
    categoryImageLogo: {
        width: '60%',
        height: 100,
        resizeMode: 'contain',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        flexWrap: 'wrap',
    },
    productLess: {
        marginVertical: 20,
        marginHorizontal: '5%',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        flexWrap: 'wrap',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff6f00',
    },
    productDetails: {
        color: '#777',
        fontSize: 14,
        marginBottom: 5,
    },
    addButton: {
        backgroundColor: '#ff6f00',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    delButton: {
        backgroundColor: '#ff0000',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
