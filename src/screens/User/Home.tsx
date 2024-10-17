import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Iconos para los botones
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>YUMMY</Text>
        <Ionicons name="notifications-outline" size={28} color="white" />
      </View>

      {/* Saludo y barra de búsqueda */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hola, ¿Qué se te antoja hoy?</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar comida, restaurantes..."
          placeholderTextColor="#FFF"
        />
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
            {/* Añadir más categorías */}
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
          {/* Más restaurantes */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ff6f00',
    paddingTop: 50,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  greeting: {
    padding: 20,
    backgroundColor: '#ff6f00',
  },
  greetingText: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  categories: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    marginRight: 20,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
  },
  offers: {
    padding: 20,
  },
  recommended: {
    padding: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    marginBottom: 20,
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
  },
  restaurantDetails: {
    color: '#777',
  },
});
