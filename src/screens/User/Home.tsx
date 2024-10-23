import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient'; // Para añadir un efecto de degradado

const { width: screenWidth } = Dimensions.get('window');

// Agregar descripciones a los elementos del carrusel
const carouselData = [
  { title: 'Pizza', description: 'Deliciosa pizza de pepperoni.', image: require('../../../assets/pizza.jpg') },
  { title: 'Tacos', description: 'Tacos suaves con carne asada.', image: require('../../../assets/tacos.jpg') },
  { title: 'Sushi', description: 'Fresco sushi de atún.', image: require('../../../assets/sushi.jpg') },
  { title: 'Ensaladas', description: 'Ensalada de frutas refrescante.', image: require('../../../assets/salad.jpg') },
  { title: 'Postres', description: 'Postres caseros deliciosos.', image: require('../../../assets/postre.jpg') },
];

export default function HomeScreen() {
  const carouselRef = useRef<Carousel<any>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCarouselItem = ({ item }: { item: { title: string; description: string; image: any } }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
          style={styles.textContainer}
        >
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselDescription}>{item.description}</Text>
        </LinearGradient>
      </View>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(activeIndex);
    }
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={carouselData}
            renderItem={renderCarouselItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            inactiveSlideOpacity={0}
            loop={true}
            vertical={false}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>

        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Explora por Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {carouselData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.category}>
                <Image source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.offers}>
          <Text style={styles.sectionTitle}>Ofertas del día</Text>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  carouselContainer: {
    height: 230,
    marginBottom: 20,
  },
  carouselItem: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#ff8c00',
    borderRadius: 10,
  
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  carouselDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  categories: {
    padding: 13,
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
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
    textAlign: 'center',
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
  },
  restaurantDetails: {
    color: '#777',
  },
});
