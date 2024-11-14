import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps"; // Importamos MapView
import Geocoding from "react-native-geocoding"; // Importamos Geocoding

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
  const [coordinate, setCoordinate] = useState({
    latitude: 16.903125255770178, // Ocosingo, Chiapas
    longitude: -92.08894194182706, // Ocosingo, Chiapas
  });

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userID");
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

      // Filtrar pedidos por cliente_id
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

  // Manejar el cambio de posición del marcador cuando se arrastra
  const handleMarkerDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoordinate({
      latitude,
      longitude,
    });
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
      }, 10000); // Actualización cada 10 segundos
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
            <View style={styles.pedidoContainer}>
              <Text style={styles.text}>
                Restaurante: {pedido.restaurante.nombre}
              </Text>
              <Text style={styles.text}>Fecha: {pedido.fecha_pedido}</Text>
              <Text style={styles.text}>Estado: {pedido.estado}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      {selectedPedido && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Detalles del Pedido #{selectedPedido.id}
              </Text>
              <Text style={styles.modalText}>
                Restaurante: {selectedPedido.restaurante.nombre}
              </Text>
              <Text style={styles.modalText}>
                Estado: {selectedPedido.estado}
              </Text>
              <Text style={styles.modalText}>
                Fecha: {selectedPedido.fecha_pedido}
              </Text>

              {/* Mapa con la ubicación del pedido */}
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 16.906959, // Latitud de Ocosingo, Chiapas
                  longitude: -92.093742, // Longitud de Ocosingo, Chiapas
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0921,
                }}
                region={{
                  latitude: selectedPedido.latitud ?? 16.903125255770178, // Usa Ocosingo si no hay latitud
                  longitude: selectedPedido.longitud ?? -92.08894194182706, // Usa Ocosingo si no hay longitud
                  latitudeDelta: 0.02122,
                  longitudeDelta: 0.02121,
                }}
              >
                {selectedPedido.latitud && selectedPedido.longitud && (
                  <Marker
                    coordinate={{
                      latitude: 16.906959,
                      longitude: -92.093742,
                    }}
                    title="Ubicación del Pedido"
                  />
                )}

                {/* Marcador fijo para Ocosingo */}
                <Marker
                  draggable={true}
                  coordinate={coordinate}
                  title="Tu pedido esta en camino"
                  description="Barrio Nuevo"
                  onDragEnd={handleMarkerDragEnd} // Maneja el evento de arrastre
                />
              </MapView>
              <Text>
                Latitud: {coordinate.latitude.toFixed(5)} | Longitud:{" "}
                {coordinate.longitude.toFixed(5)}
              </Text>

              <Button title="Cerrar" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  pedidoContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%", // Aumenta el tamaño del modal
    height: "80%", // Ajusta la altura del modal
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  map: {
    width: "100%", // Asegúrate de que el mapa ocupe todo el espacio disponible
    height: 300, // Ajusta el tamaño del mapa
    marginVertical: 20,
  },
});

export default SeguimientoPedidoScreen;
