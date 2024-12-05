import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Producto {
  id: number;
  nombre_producto: string;
  pivot: {
    pedido_id: number;
    menu_item_id: number;
    cantidad: number;
    precio_total: string;
  };
}

interface Pedido {
  id: number;
  cliente_id: number;
  restaurante_id: number;
  repartidor_id: number | null;
  direccion_entrega_id: number;
  estado: string;
  fecha_pedido: string;
  metodo_pago_id: number;
  cliente: { id: number; nombre: string };
  restaurante: { id: number; nombre: string };
  metodo_pago: { id: number; nombre: string };
  productos: Producto[];
}

function PedidosScreen() {
  const [activeTab, setActiveTab] = useState("enCamino");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

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
      setPedidos(data.pedidos);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
    fetchPedidos();
    const interval = setInterval(() => {
      fetchPedidos();
    }, 1000); // Actualización cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = pedidos.filter((order) => {
    if (!userId) return false;

    if (activeTab === "enCamino") {
      return (
        [
          "pendiente",
          "en_camino",
          "pedido_recibido",
          "preparando_pedido",
        ].includes(order.estado) && order.cliente_id === userId
      );
    } else if (activeTab === "historial") {
      return (
        ["entregado", "cancelado"].includes(order.estado) &&
        order.cliente_id === userId
      );
    }
    return false;
  });

  const handleViewDetails = (order: Pedido) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "enCamino" && styles.activeTab]}
          onPress={() => setActiveTab("enCamino")}
        >
          <Text style={styles.tabText}>En Camino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "historial" && styles.activeTab]}
          onPress={() => setActiveTab("historial")}
        >
          <Text style={styles.tabText}>Historial</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Pedidos */}
      <ScrollView style={styles.ordersList}>
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderLabel}>Pedido #{order.id}</Text>
              <Text style={styles.orderText}>
                Fecha: {new Date(order.fecha_pedido).toLocaleDateString()}
              </Text>
              <Text style={styles.orderText}>Estado: {order.estado}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleViewDetails(order)}
              style={styles.detailsButton}
            >
              <Text style={styles.linkText}>Ver Detalle</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal para detalles del pedido */}
      {selectedOrder && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Detalle del Pedido #{selectedOrder.id}
            </Text>
            <Text>Cliente: {selectedOrder.cliente.nombre}</Text>
            <Text>Restaurante: {selectedOrder.restaurante.nombre}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  tabs: { flexDirection: "row", marginBottom: 16 },
  tab: { flex: 1, padding: 10, alignItems: "center", borderBottomWidth: 2 },
  activeTab: { borderBottomColor: "#007AFF" },
  tabText: { fontSize: 16 },
  ordersList: { flex: 1 },
  orderCard: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  orderHeader: { flexDirection: "row", justifyContent: "space-between" },
  orderLabel: { fontWeight: "bold" },
  orderText: { color: "#555" },
  detailsButton: { marginTop: 8 },
  linkText: { color: "#007AFF" },
  modalContainer: { flex: 1, justifyContent: "center", padding: 16 },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  closeButton: { marginTop: 8 },
  closeButtonText: { color: "#007AFF" },
});

export default PedidosScreen;
