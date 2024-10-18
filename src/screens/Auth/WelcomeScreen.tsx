import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleNavigation = (userType: 'repartidor' | 'consumidor') => {
    navigation.navigate('Register', { userType });
  };

  const OptionButton = ({ imageSource, text, userType }: { imageSource: any; text: string; userType: 'repartidor' | 'consumidor' }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleNavigation(userType)}
    >
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Entregas Rápidas!</Text>
      <Text style={styles.subtitle}>Nos gustaría saber más sobre cómo podemos ayudarte</Text>

      <OptionButton
        imageSource={require('../../../assets/LogoPNG.png')}
        text="¿Te gustaría unirte como repartidor?"
        userType="repartidor"
      />

      <Text style={styles.orText}>ó</Text>

      <OptionButton
        imageSource={require('../../../assets/perfil.png')}
        text="¿Estás buscando recibir comida a domicilio?"
        userType="consumidor"
      />
    </View>
  );
};

// Estilos
const colors = {
  background: '#EB9016',
  text: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  optionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
  orText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
