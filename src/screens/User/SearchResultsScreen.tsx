import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, Button, TouchableOpacity, Image } from 'react-native';
import {Icon} from 'react-native-vector-icons/FontAwesome';

export default function SearchResultsScreen({ route } : { route:any }) {
    const { query } = route.params;
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ejecuta la búsqueda inicial con el valor de query
        if (query) {
          handleSearch(query);
        }
      }, [query]);

    const handleSearch = (searchQuery) => {
        fetch(`https://yummy.soudevteam.com/search?query=${encodeURIComponent(searchQuery)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Convierte la respuesta a JSON
          })
          .then(data => {
            console.log(data); // Para verificar la respuesta
            setRestaurants(data); // Guardamos los resultados en el estado
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
      };
  
    return (
        <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar comida, restaurantes..."
          placeholderTextColor="#FFF"
          value={query == searchQuery ? query : searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
          <Icon name="search" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {restaurants.map(restaurant => (
          <TouchableOpacity key={restaurant.restaurante_id} style={styles.restaurantCard}>
            {loading && <ActivityIndicator size="large" color="#ff6f00" />}
            <Image 
              source={{ uri: `https://yummy.soudevteam.com/searchimage/${restaurant.id}` }} 
              style={styles.categoryImageLogo} 
              onLoadEnd={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
            <View style={styles.containerRestauranteDetails2}>
              <Text style={styles.restaurantName}>{restaurant.nombre_producto}</Text>
              <Text style={styles.restaurantName}>${restaurant.precio}</Text>
            </View>
            <View style={styles.containerRestauranteDetails}>
              <Text style={styles.restaurantDetailsRestaurante}>Restaurante: </Text>
              <Text style={styles.restaurantDetails}>{restaurant.restaurante_nombre+'\n'}</Text>
            </View>
            <Text style={styles.restaurantDetails}>{restaurant.restaurante_direccion}</Text>
          </TouchableOpacity>
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
      textAlign: 'center'
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
      padding: 10,
      borderRadius: 15,
      marginVertical: 8,
      marginHorizontal: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 9 },
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    restaurantDetails: {
      color: '#777',
      fontSize: 14,
      paddingTop: 3,
    },
    categoryImageLogo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      borderRadius: 15,
      marginBottom: 5
    },
    restaurantDetailsRestaurante: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    containerRestauranteDetails: {
      margin: 0,
      padding: 0,
      height: 22,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap-reverse',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
    },
    containerRestauranteDetails2:{
      margin: 0,
      marginBottom: 7,
      padding: 0,
      height: 24,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap-reverse',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
  });