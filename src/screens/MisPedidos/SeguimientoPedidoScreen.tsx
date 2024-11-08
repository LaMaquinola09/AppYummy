import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";

interface Pedido {
  cliente_id: number;
  id: number;
  estado: string;
  fecha_pedido: string;
  restaurante: { nombre: string };
  latitud: number | null; // Asegúrate de permitir null en caso de valores faltantes
  longitud: number | null;
}

function SeguimientoPedidoScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(parseInt(storedUserId));
      }
    } catch (error) {
      console.error("Error al obtener el ID del usuario:", error);
    }
  };

  const fetchPedidos = async () => {
    try {
      const response = await fetch("https://yummy.soudevteam.com/reppedidos");
      const data = await response.json();

      if (userId !== null) {
        const pedidosCliente = data.pedidos.filter(
          (pedido: Pedido) => pedido.cliente_id === userId
        );
        setPedidos(pedidosCliente);
      }
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchUserId();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchPedidos();
      const interval = setInterval(() => {
        fetchPedidos();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  const openModal = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPedido(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : pedidos.length === 0 ? (
        <Text style={styles.noOrdersText}>
          No tienes pedidos en este momento.
        </Text>
      ) : (
        pedidos.map((pedido) => (
          <TouchableOpacity key={pedido.id} onPress={() => openModal(pedido)}>
            <View style={styles.pedidoCard}>
              <Text>Pedido ID: {pedido.id}</Text>
              <Text>Estado: {pedido.estado}</Text>
              <Text>Restaurante: {pedido.restaurante.nombre}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedPedido && (
            <MapView
              style={{ flex: 1, height: 300 }}
              initialRegion={{
                latitude: selectedPedido.latitud ?? 16.7531, // Ocosingo
                longitude: selectedPedido.longitud ?? -92.0654, // Ocosingo
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {selectedPedido.latitud && selectedPedido.longitud && (
                <Marker
                  coordinate={{
                    latitude: selectedPedido.latitud,
                    longitude: selectedPedido.longitud,
                  }}
                  title="Ubicación del pedido"
                />
              )}
            </MapView>
          )}
          <Button title="Cerrar" onPress={closeModal} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  pedidoCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  noOrdersText: {
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SeguimientoPedidoScreen;
