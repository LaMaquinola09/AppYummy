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
        navigation.setOptions({ title: 'Inicio' });
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
        {/* Sección para "Pedido Sugerido" */}
        <View style={styles.suggestedOrders}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Pedido Sugerido</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Ver Todo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.suggestedCardContainer}>
              {/* Producto 1: Pizza Margherita */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/pizza.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Pizza Margherita</Text>
                  <Text style={styles.productDescription}>Deliciosa pizza con salsa de tomate y queso mozzarella</Text>
                  <Text style={styles.productSKU}>SKU: 001</Text>
                  <Text style={styles.productPrice}>$150.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

              {/* Producto 2: Pasta Alfredo */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/sopapasta.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Pasta Alfredo</Text>
                  <Text style={styles.productDescription}>Pasta con salsa cremosa de queso parmesano y ajo.</Text>
                  <Text style={styles.productSKU}>SKU: 002</Text>
                  <Text style={styles.productPrice}>$120.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

              {/* Producto 3: Ensalada César */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/salad.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Ensalada César</Text>
                  <Text style={styles.productDescription}>Crujiente lechuga con aderezo César y crutones.</Text>
                  <Text style={styles.productSKU}>SKU: 003</Text>
                  <Text style={styles.productPrice}>$90.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

              {/* Producto 4: Tacos al Pastor */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/tacos.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Tacos al Pastor</Text>
                  <Text style={styles.productDescription}>Tacos de cerdo marinado con piña y cebolla.</Text>
                  <Text style={styles.productSKU}>SKU: 004</Text>
                  <Text style={styles.productPrice}>$75.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

              {/* Producto 5: Helado de Vainilla */}
              <View style={styles.bestSellerCard}>
              <Image source={require('../../../assets/Pastel.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Helado de Vainilla</Text>
                  <Text style={styles.productDescription}>Suave helado de vainilla con trocitos de chocolate.</Text>
                  <Text style={styles.productSKU}>SKU: 005</Text>
                  <Text style={styles.productPrice}>$50.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

            </View>
          </ScrollView>
        </View>


        {/* Sección para "Lo Más Vendido Cerca de Ti" */}
        <View style={styles.bestSellers}>
          <Text style={styles.sectionTitle}>Lo Más Vendido Cerca de Ti</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.bestSellerCardContainer}>
              {/* Primer producto: Café */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/cafe.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Café Americano</Text>
                  <Text style={styles.productDescription}>Taza de café filtrado, fuerte y aromático</Text>
                  <Text style={styles.productSKU}>SKU: 101</Text>
                  <Text style={styles.productPrice}>$50.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

              {/* Segundo producto: Pastel */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/pastelchocolate.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Pastel de Chocolate</Text>
                  <Text style={styles.productDescription}>Delicioso pastel de chocolate con crema</Text>
                  <Text style={styles.productSKU}>SKU: 102</Text>
                  <Text style={styles.productPrice}>$80.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>
              {/* Tercer producto: Camarones */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/camarones.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Camarones al Ajillo</Text>
                  <Text style={styles.productDescription}>Camarones frescos salteados en salsa de ajo</Text>
                  <Text style={styles.productSKU}>SKU: 103</Text>
                  <Text style={styles.productPrice}>$200.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

            </View>
          </ScrollView>
        </View>




        {/* Sección para "Promociones" */}
        <View style={styles.bestSellers}>
          <Text style={styles.sectionTitle}>Promociones</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.bestSellerCardContainer}>

              {/* Primer producto: Pizza */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/pizza.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Pizza Margherita</Text>
                  <Text style={styles.productDescription}>Deliciosa pizza con salsa de tomate y queso mozzarella</Text>
                  <Text style={styles.productSKU}>SKU: 001</Text>
                  <Text style={styles.productPrice}>$150.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>
              {/* Segundo producto: Pasta */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/pastacarbonara.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Pasta Carbonara</Text>
                  <Text style={styles.productDescription}>Pasta con salsa cremosa de huevo, queso y panceta</Text>
                  <Text style={styles.productSKU}>SKU: 002</Text>
                  <Text style={styles.productPrice}>$130.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

              {/* Tercer producto: Ensalada */}
              <View style={styles.bestSellerCard}>
                <Image source={require('../../../assets/salad.jpg')} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Ensalada César</Text>
                  <Text style={styles.productDescription}>Crujiente lechuga con pollo, queso parmesano y aderezo César</Text>
                  <Text style={styles.productSKU}>SKU: 003</Text>
                  <Text style={styles.productPrice}>$100.00</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}><Text>-</Text></TouchableOpacity>
                    <Text>1</Text>
                    <TouchableOpacity style={styles.quantityButton}><Text>+</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}><Text style={styles.buttonText}>Agregar al Carrito</Text></TouchableOpacity>
                </View>
              </View>

            </View>
          </ScrollView>
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
    fontSize: 20,
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
    marginBottom: 5,
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
    width: 50,
    height: 50,
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
  suggestedOrders: {
    padding: 20,
    backgroundColor: '#E7E4E8',
    borderRadius: 10,
    marginBottom: 15,
  },
  suggestedCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
  productSKU: {
    fontSize: 12,
    color: '#888',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  updateButton: {
    backgroundColor: '#4fc3f7',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bestSellers: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
  },
  bestSellerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginRight: 40,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  addToCartButton: {
    backgroundColor: '#ffa726',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  bestSellerCardContainer: {
    flexDirection: 'row',
  },
  estilocategorias: {
    padding: 10,
    alignItems: 'center',
  },
  Cardcategorias: {
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    padding: 20,
    width: '100%',
    marginBottom: 15,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  categoriesSection: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  categoryCardContainer: {
    flexDirection: 'row',
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesContainer: {
    paddingVertical: 20,
    backgroundColor: '#F9F9F9',
  },
  categoriesCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestedCardContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 5,


  },

  headerContainer: {
    flexDirection: 'row', // Asegura que los elementos estén en fila
    justifyContent: 'space-between', // Espacio entre el título y el botón
    alignItems: 'center', // Centra verticalmente los elementos
  },

  seeAllButton: {
    backgroundColor: '#FF822A', // Color del botón "Ver Todo"
    padding: 5,
    borderRadius: 5,
  },
  seeAllText: {
    color: '#fff',
    fontWeight: 'bold',
  },


});
