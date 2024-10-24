import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons  } from '@expo/vector-icons'; // Asegúrate de tener esta librería instalada
import LoginScreen from './src/screens/Auth/LoginScreen';
import HomeScreen from './src/screens/User/Home';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import CourierHomeScreen from './src/screens/Courier/CourierHomeScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen';
import RepartidorScreen from './src/screens/Repartidor/RepartidorScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Componente personalizado para el encabezado
function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* Logo de la app */}
      {/* <Image source={require('./assets/LogoPNG.png')} style={styles.logo} /> */}

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar comida, restaurantes..."
        placeholderTextColor="#FFF"
      />

      {/* Icono de Notificaciones */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Icono de Carrito */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="cart-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// Drawer para las vistas con menú de hamburguesa
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "slide",
        drawerActiveTintColor: '#000000',
        drawerInactiveTintColor: '#000000',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
          paddingTop: 0,
        },
        headerStyle: {
          backgroundColor: '#ff6f00',
        },
        headerTintColor: '#fff',
        headerTitle: () => <CustomHeader />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mis pedidos"
        component={CourierHomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Repartidor"
        component={CourierHomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bicycle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Crea el Stack dentro de una pantalla del Drawer
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: true, title: 'Bienvenido a YUMMY' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="Repartidor"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />





      <Stack.Screen
        name="MainDrawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ff6f00',
    paddingHorizontal: -45,
    paddingVertical: 9,
    width: '102%',
  },

  searchBar: {
    flex: 1,
    backgroundColor: '#ff8c00',
    padding: 5,
    borderRadius: 25,
    color: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    textAlign: 'center',
    marginHorizontal: 8,
  },
  iconButton: {
    paddingHorizontal: 1,
  },
});
