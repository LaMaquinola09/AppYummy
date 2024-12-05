import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, Button, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchResultsScreen({ route }: { route: any }) {
    const { query } = route.params;
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            handleSearch(query);
        }
    }, [query]);

    const handleSearch = (searchQuery: any) => {
        fetch(`https://yummy.soudevteam.com/search?query=${encodeURIComponent(searchQuery)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setRestaurants(data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos:', error);
            });
    };

    const addToCart = async (item: any) => {
      try {
          const cart = await AsyncStorage.getItem('cart');
          const parsedCart = cart ? JSON.parse(cart) : [];
          // Verificar si todos los elementos tienen el mismo restaurante_id
          const sameRestaurant = parsedCart.every(cartItem => cartItem.restaurante_id === item.restaurante_id);
  
          if (parsedCart.length === 0 || sameRestaurant) {
              parsedCart.push({
                  id: item.id,
                  key: parsedCart.length +1,
                  nombre: item.nombre_producto,
                  precio: item.precio,
                  restaurante_id: item.restaurante_id,
                  imagen: `https://yummy.soudevteam.com/searchimage/${item.id}`,
                  restaurantName: item.restaurante_nombre
              });
              await AsyncStorage.setItem('cart', JSON.stringify(parsedCart));
              Alert.alert('Éxito', 'El platillo se agregó al carrito.');
          } else {
              Alert.alert(
                  'Error',
                  'Solo puedes agregar platillos del mismo restaurante al carrito.'
              );
          }
      } catch (error) {
          console.error('Error al agregar al carrito:', error);
      }
  };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Buscar comida, restaurantes..."
                    placeholderTextColor="#FFF"
                    value={query == searchQuery ? query : searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={() => {
                        handleSearch(searchQuery);
                    }}
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
                    <Icon name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {restaurants.map((restaurant) => (
                    <View key={restaurant.restaurante_id} style={styles.restaurantCard}>
                        {loading && <ActivityIndicator size="large" color="#ff6f00" />}
                        <Image
                            source={{ uri: `https://yummy.soudevteam.com/searchimage/${restaurant.id}` }}
                            style={styles.categoryImageLogo}
                            onLoadEnd={() => setLoading(false)}
                            onError={() => setLoading(false)}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.restaurantName}>{restaurant.nombre_producto}</Text>
                            <Text style={styles.restaurantPrice}>${restaurant.precio}</Text>
                        </View>
                        <Text style={styles.restaurantDetails}>Restaurante: {restaurant.restaurante_nombre}</Text>
                        <Text style={styles.restaurantDetails}>{restaurant.restaurante_direccion}</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => addToCart(restaurant)}
                        >
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
    restaurantCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
        alignItems:'center'
    },
    categoryImageLogo: {
        width: '60%',
        height: 150,
        borderRadius: 15,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        flexWrap: 'wrap',
    },
    restaurantPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff6f00',
    },
    restaurantDetails: {
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
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
