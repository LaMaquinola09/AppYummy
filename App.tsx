import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Asegúrate de tener esta librería instalada
import LoginScreen from "./src/screens/Auth/LoginScreen";
import HomeAdmin from "./src/screens/admin/HomeAdmin";
import HomeScreen from "./src/screens/User/Home";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";
import CourierHomeScreen from "./src/screens/Courier/CourierHomeScreen";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import WelcomeScreen from "./src/screens/Auth/WelcomeScreen";
import SearchResultsScreen from "./src/screens/User/SearchResultsScreen"; // Pantalla de resultados de búsqueda

import AboutScreen from "./src/screens/acercade/AboutScreen";
import RepartidorScreen from "./src/screens/Repartidor/RepartidorScreen";
import OrderScreen from "./src/screens/User/OrderScreen";
import ProfileScreen from "./src/screens/perfil/ProfileScreen";
import PedidosScreen from "./src/screens/MisPedidos/PedidiosScreen";
import PedidoDetalleScreen from "./src/screens/MisPedidos/DetallesScreen";
import SeguimientoPedidoScreen from "./src/screens/MisPedidos/SeguimientoPedidoScreen";
import CartScreen from "./src/screens/User/CartScreen";
import { useNavigation } from "@react-navigation/native";
import { StripeProvider } from '@stripe/stripe-react-native';
import WebView from "react-native-webview";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function ValidationScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    const validateUser = async () => {
      const userType = await getUserType(); // Función asíncrona
      if (userType === "admin") {
        navigation.replace("InicioA");
      } else if (userType === "usuario") {
        navigation.replace("Inicio");
      } else if (userType === "repartidor") {
        navigation.replace("Repartidor");
      }
    };
    validateUser();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff6f00" />
    </View>
  );
}
function WebViewScreen() {
  return (
    <WebView
      source={{ uri: 'https://yummy.soudevteam.com/forgot-password' }} // La URL que deseas cargar
      style={{ flex: 1 }}
    />
  );
}
async function getUserType(): Promise<string> {
  // Aquí define tu lógica para determinar el tipo de usuario
  // Puede ser de Firebase Auth, AsyncStorage, API, etc.
  // Simulamos que el usuario es un administrador
  return new Promise((resolve) => {
    setTimeout(() => {
      const userType = "admin"; // Simulación: Cambia esto según tus pruebas
      resolve(userType);
    }, 1000);});
}
// Componente personalizado para el encabezado
function CustomHeader() {
  const navigation = useNavigation(); // Obtiene el objeto navigation del contexto
  return (
    <View style={styles.headerContainer}>
      

      {/* Icono de Carrito */}
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.reset({index:0, routes:[{name:'Cart'}]})}>
        <Ionicons name="cart-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// Drawer para las vistas con menú de hamburguesa
function DrawerNavigator() {
  const [userRole, setUserRole] = useState<string | null>(null); // Inicializa con null
  const [userFirstName, setUserFirstName] = useState<string | null>("");

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem("usertipo");
      const nombreC = await AsyncStorage.getItem("userName");
      const nombreF = nombreC ? nombreC.split(" ") : [];
      setUserFirstName(nombreF[0] || "");
      setUserRole(role || ""); // Si no se encuentra el rol, establece un valor por defecto
    };
    fetchUserRole();
  }, []);

  // Muestra un indicador de carga mientras userRole es null
  if (userRole === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff6f00" />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={userRole === "cliente" ? "Inicio" : "Pedidos"} // Usa userRole aquí
      screenOptions={{
        drawerType: "slide",
        drawerActiveTintColor: "#ff6f00",
        drawerInactiveTintColor: "#000000",
        drawerStyle: {
          backgroundColor: "#fff",
          width: 240,
        },
        headerStyle: {
          backgroundColor: "#ff6f00",
        },
        headerTintColor: "#fff",
        headerRight: (props) => <CustomHeader />,
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ headerTitle: "Inicio" }}
      />
      <Drawer.Screen name="WebViewScreen" component={WebViewScreen} />
      <Drawer.Screen
        name="Pedidos"
        component={PedidosScreen}
        options={{
          headerShown: true,
          headerTitle: "Lista de Pedidos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Historial de pedidos"
        component={OrderScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="lock-clock" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mis Pedidos"
        component={SeguimientoPedidoScreen}
        options={{
          headerShown: true,
          headerTitle: "Mis Pedidos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="repart"
        component={RepartidorScreen}
        options={{
          headerShown: true,
          headerTitle: "Bienvenido " + userFirstName,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ title: "Resultados de Búsqueda" }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Carrito de Pedido", headerRight: undefined}}
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
        options={{ headerShown: true, title: "Bienvenido a YUMMY" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="Repartidor"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Acercade"
        component={AboutScreen}
        options={{
          headerShown: true,
          title: "Acerca de YUMMY",
          headerStyle: {
            backgroundColor: "#FA6C34", // Color de fondo del encabezado (amarillo)
          },
          headerTintColor: "#fff", // Color del texto del encabezado (negro)
          headerTitleStyle: {
            fontWeight: "bold", // Opcional: para hacer el título en negrita
          },
        }}
      />

      <Stack.Screen
        name="Mi Perfil"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: "Mi Perfil",
          headerStyle: {
            backgroundColor: "#FA6C34", // Color de fondo del encabezado (amarillo)
          },
          headerTintColor: "#fff", // Color del texto del encabezado (negro)
          headerTitleStyle: {
            fontWeight: "bold", // Opcional: para hacer el título en negrita
          },
        }}
      />

      <Stack.Screen
        name="DetallePedido"
        component={PedidoDetalleScreen}
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
    <StripeProvider
        publishableKey="pk_live_51Q4IE1Gl0IBGSgAJDuSXtxUKFLH9ZduvS35LPkV9WjvSiwsMuRQ0cMjfxSSGHetMszAcG07RGYKIHperls8YSI5l00YLqPJ7hI" // Reemplaza con tu clave de publicación
    >
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
    </StripeProvider>
    
  );
}

// Estilos
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ff6f00",
    paddingHorizontal: -45,
    paddingVertical: 9,
    width: "102%",
  },

  searchBar: {
    flex: 1,
    backgroundColor: "#ff8c00",
    padding: 5,
    borderRadius: 25,
    color: "white",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    textAlign: "center",
    marginHorizontal: 8,
  },
  iconButton: {
    paddingHorizontal: 1,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});
