import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Importamos Ionicons

export default function HomeAdmin({ navigation }: { navigation: any }) {

  useEffect(() => {
    navigation.setOptions({ title: "Inicio" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Header con gradiente */}
      <LinearGradient colors={["#ff6f00", "#ff6f00"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.logoText}>YUMMY</Text>
          <Image
            source={require("../../../assets/LogoPNG.png")}
            style={styles.categoryImageLogo}
          />
        </View>
      </LinearGradient>

      {/* Dashboard */}
      <View style={styles.dashboard}>
        <View style={styles.card}>
          <Ionicons name="restaurant" size={30} color="#ff6f00" />
          <Text style={styles.cardTitle}>Restaurantes</Text>
          <Text style={styles.cardNumber}>25</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="people" size={30} color="#ff6f00" />
          <Text style={styles.cardTitle}>Clientes</Text>
          <Text style={styles.cardNumber}>100</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="bicycle" size={30} color="#ff6f00" />
          <Text style={styles.cardTitle}>Repartidores</Text>
          <Text style={styles.cardNumber}>15</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="cart" size={30} color="#ff6f00" />
          <Text style={styles.cardTitle}>Pedidos del día</Text>
          <Text style={styles.cardNumber}>50</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 20,
    paddingTop: 5,
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  categoryImageLogo: {
    width: 30,
    height: 30,
  },
  dashboard: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap", // Permite que las tarjetas se ajusten en múltiples filas
    justifyContent: "space-between",
  },
  card: {
    width: "45%", // Ocupa el 45% del ancho para dos columnas
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  cardNumber: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6f00",
  },
});
