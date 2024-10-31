import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, FlatList, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient'; // Para añadir un efecto de degradado
import { RootStackParamList } from '../../navigation/types';
// import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const route = useRoute<RouteProp<RootStackParamList, 'Register'>>();
    const tipo = route.params?.rol ?? 'cliente';

    useEffect(() => {
        navigation.setOptions({ title: 'Registro' });
    }, [navigation]);

  const handleSearch = (searchQuery) => {
    navigation.navigate('SearchResults', { query: searchQuery });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#ff6f00', '#ff6f00']}
        style={styles.header}>
        <Text style={styles.logoText}>YUMMY</Text>
        <Image source={require('../../../assets/LogoPNG.png')} 
        style={styles.categoryImageLogo} 
        />
      </LinearGradient>

      {/* Saludo y barra de búsqueda */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hola, ¿Qué se te antoja hoy?</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar comida, restaurantes..."
          placeholderTextColor="#FFF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Categorías de comida */}
        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Explora por Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.category}>
              <Image source={require('../../../assets/pizza.jpg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Pizza</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
              <Image source={require('../../../assets/tacos.jpg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Tacos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
              <Image source={require('../../../assets/sushi.jpg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Sushi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
              <Image source={require('../../../assets/salad.jpg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Ensaladas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
              <Image source={require('../../../assets/postre.jpg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Postres</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Ofertas */}
        <View style={styles.offers}>
          <Text style={styles.sectionTitle}>Ofertas del día</Text>
          {/* Aquí iría un slider con imágenes promocionales */}
        </View>

        {/* Restaurantes recomendados */}
        <View style={styles.recommended}>
          <Text style={styles.sectionTitle}>Restaurantes Recomendados</Text>
          <TouchableOpacity style={styles.restaurantCard}>
            <Image source={require('../../../assets/salad.jpg')} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>Sushi House</Text>
              <Text style={styles.restaurantDetails}>Sushi • 4.8 ⭐</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    paddingTop: 5,
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  greeting: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: '#ff6f00',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  greetingText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  },
  searchBar: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 25,
    color: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    textAlign: 'center'
  },
  searchButton: {
    backgroundColor: '#ff6f00',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categories: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  category: {
    marginRight: 20,
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  categoryImageLogo: {
    width: 80,
    height: 80,
  },
  categoryImage: {
    width: 80,
    height: 80,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  offers: {
    padding: 20,
  },
  recommended: {
    padding: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  restaurantInfo: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  restaurantDetails: {
    color: '#777',
    fontSize: 14,
    marginBottom: 3,
  },
});
