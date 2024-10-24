import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useFonts } from 'expo-font';

// Define el tipo de la navegación para evitar errores
type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Acercade'>;

const AboutScreen = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();

  const [fontsLoaded] = useFonts({
    Montserrat: require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
  });
  
  // Si las fuentes no están cargadas, mostrar un indicador de carga
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000fff" /> 
      </View>
    );
  }

  const handlePrivacy = () => {
    navigation.navigate('Acercade'); // Ajusta la navegación según tus rutas
  };

  const handleTerms = () => {
    navigation.navigate('Acercade');
  };

  const handleAccessibility = () => {
    navigation.navigate('Acercade');
  };

  const handleRateApp = () => {
    // Navegar a una función para calificar la app en la tienda
    console.log('Rate app');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contenido central */}
      <View style={styles.content}>
        <Image
          source={require('../../../assets/LogoBlack.png')} // Ajusta la ruta de la imagen
          style={styles.logo}
        />
        <Text style={styles.appName}>Yummy para Android</Text>
        <Text style={styles.version}>1.1</Text>
        <Text style={styles.description}>
          Yummy es una aplicación que te permite disfrutar de deliciosas comidas y descubrir nuevos restaurantes.
          Copyright © 2024 Yummy Inc. or its affiliates.
        </Text>
        <Text style={styles.address}>
          Dirección de la empresa, Barrio Norte , Ocosingo, Chiapas
        </Text>
      </View>

      {/* Enlaces en la parte inferior */}
      <View style={styles.links}>
        <TouchableOpacity onPress={handlePrivacy}>
          <Text style={styles.linkText}>Cómo cuidamos tu privacidad</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTerms}>
          <Text style={styles.linkText}>Términos y Condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAccessibility}>
          <Text style={styles.linkText}>Accesibilidad</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para calificar */}
      <TouchableOpacity style={styles.rateButton} onPress={handleRateApp}>
        <Text style={styles.rateButtonText}>Calificar en Play Store</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold', // Usar la variante Bold
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
    lineHeight: 21, // 1.5 * 14
    fontFamily: 'Montserrat', // Usar la variante Regular
    marginBottom: 20,
  },
  address: {
    textAlign: 'center',
    color: '#333',
    fontSize: 12,
    marginBottom: 20,
  },
  links: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#0066CC',
    paddingVertical: 10,
    textAlign: 'center',
  },
  rateButton: {
    backgroundColor: '#fc913a', // Azul para el botón
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  rateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AboutScreen;
