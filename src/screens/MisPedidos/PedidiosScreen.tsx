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
  const [activeTab, setActiveTab] = useState("pendiente");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userID");
      const storedUserRole = await AsyncStorage.getItem("usertipo"); // Supongamos que también guardaste el rol

      if (storedUserId) {
        setUserId(parseInt(storedUserId));
        console.log("User ID:", storedUserId);
      } else {
        console.log("User ID not found");
      }

      if (storedUserRole) {
        console.log("User Role:", storedUserRole);
      } else {
        console.log("User Role not found");
      }
    } catch (error) {
      console.error("Error al obtener el ID del usuario o el rol:", error);
    }
  };
  const fetchPedidos = async () => {
    try {
      const response = await fetch("https://yummy.soudevteam.com/reppedidos");
      const data = await response.json();
      // Validar si data.pedidos existe y no está vacío
      if (data.pedidos && data.pedidos.length > 0) {
        setPedidos(data.pedidos);
      } else {
        console.log("No hay pedidos disponibles en la respuesta");
        setPedidos([]); // Opcional: limpiar la lista de pedidos en caso de respuesta vacía
      }
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

  // Función para manejar la asignación del repartidor
  const handleAssignDelivery = async (pedidoId: number) => {
    try {
      const response = await fetch(
        `https://yummy.soudevteam.com/reppedidos/assign/${pedidoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Repartidor asignado con éxito");
        fetchPedidos(); // Actualizar la lista de pedidos
      } else {
        const errorText = await response.text();
        console.error("Error de servidor:", errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error al asignar el repartidor:", error);
      alert(`Error: ${error}`);
    }
  };

  const filteredOrders = pedidos.filter((order) => {
    // Filtra según el estado activo y el usuario logueado
    if (!userId) {
      return false; // Si no hay un usuario logueado, no mostrar pedidos
    }

    if (activeTab === "pendiente") {
      return order.estado === "pendiente";
    } else if (activeTab === "enCamino") {
      return order.estado === "en_camino" && order.repartidor_id === userId;
    } else if (activeTab === "entregado") {
      return order.estado === "entregado" && order.repartidor_id === userId;
    }
    return false; // Si no se selecciona ningún estado, mostrar todos
  });

  const handleViewDetails = (order: Pedido) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  //Para terminar el proceso de entregas
  const handleMarkAsDelivered = async (pedidoId: number) => {
    try {
      const response = await fetch(
        `https://yummy.soudevteam.com/reppedidos/${pedidoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verificar si la respuesta es exitosa
      if (response.ok) {
        alert("Pedido marcado como entregado");
        // Llamar para actualizar la lista de pedidos
        fetchPedidos();
      } else {
        // Si no es una respuesta exitosa, mostrar el error
        const errorText = await response.text(); // Obtener el cuerpo de la respuesta como texto
        console.error("Error de servidor:", errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
      alert(`Error: ${error}`);
    }
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
          style={[styles.tab, activeTab === "pendiente" && styles.activeTab]}
          onPress={() => setActiveTab("pendiente")}
        >
          <Text style={styles.tabText}>Pendientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "enCamino" && styles.activeTab]}
          onPress={() => setActiveTab("enCamino")}
        >
          <Text style={styles.tabText}>En Camino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "entregado" && styles.activeTab]}
          onPress={() => setActiveTab("entregado")}
        >
          <Text style={styles.tabText}>Entregados</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Pedidos */}
      {/* <ScrollView style={styles.ordersList}>
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderLabel}>Realizado</Text>
                <Text style={styles.orderText}>
                  {new Date(order.fecha_pedido).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderLabel}>Pedido</Text>
                <Text style={styles.orderText}>{order.id}</Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderLabel}>Estatus</Text>
                <Text
                  style={[
                    styles.statusText,
                    order.estado === "en_camino" && styles.statusInProgress,
                  ]}
                >
                  {order.estado === "pendiente"
                    ? "Pendiente"
                    : order.estado === "en_camino"
                    ? "En Camino"
                    : "Entregado"}
                </Text>
              </View>
            </View>
            <View style={styles.orderDetails}>
              <Text>
                Cliente:{" "}
                <Text style={styles.boldText}>{order.cliente.nombre}</Text>
              </Text>
              <Text>
                Restaurante:{" "}
                <Text style={styles.boldText}>{order.restaurante.nombre}</Text>
              </Text>
              <Text>
                Método de Pago:{" "}
                <Text style={styles.boldText}>{order.metodo_pago.nombre}</Text>
              </Text>
            </View>
            <View style={styles.orderFooter}>
              <View style={styles.orderActions}>
                {order.estado === "pendiente" &&
                  (order.repartidor_id === null ||
                    order.repartidor_id === 0) && (
                    <TouchableOpacity
                      style={styles.assignButton}
                      onPress={() => handleAsignarRepartidor(order.id)}
                    >
                      <Text style={styles.buttonText}>Tomar Pedido</Text>
                    </TouchableOpacity>
                  )}
                <TouchableOpacity onPress={() => handleViewDetails(order)}>
                  <Text style={styles.linkText}>Ver detalle</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView> */}

      {/* Lista de Pedidos */}
      <ScrollView style={styles.ordersList}>
        {pedidos && pedidos.length > 0 ? (filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderLabel}>Realizado</Text>
                <Text style={styles.orderText}>
                  {new Date(order.fecha_pedido).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderLabel}>Pedido</Text>
                <Text style={styles.orderText}>{order.id}</Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderLabel}>Estatus</Text>
                <Text
                  style={[
                    styles.statusText,
                    order.estado === "en_camino" && styles.statusInProgress,
                    order.estado === "pendiente" && styles.statusPending,
                    order.estado === "entregado" && styles.statusDelivered,
                  ]}
                >
                  {order.estado === "pendiente"
                    ? "Pendiente"
                    : order.estado === "en_camino"
                    ? "En Camino"
                    : "Entregado"}
                </Text>
                {/* Mostrar mensaje según el estado del repartidor */}
                {order.repartidor_id && order.repartidor_id !== userId && (
                  <Text style={styles.assignedMessage}>
                    Este pedido ya tiene un repartidor asignado
                  </Text>
                )}
                {order.repartidor_id === userId && (
                  <Text style={styles.ownAssignmentMessage}>
                    Tú has tomado este pedido
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.orderDetails}>
              <Text>
                Cliente:{" "}
                <Text style={styles.boldText}>{order.cliente.nombre}</Text>
              </Text>
              <Text>
                Restaurante:{" "}
                <Text style={styles.boldText}>{order.restaurante.nombre}</Text>
              </Text>
              <Text>
                Método de Pago:{" "}
                <Text style={styles.boldText}>{order.metodo_pago.nombre}</Text>
              </Text>
            </View>
            <View style={styles.orderFooter}>
              <View style={styles.orderActions}>
                {/* Botón para marcar como entregado cuando el estado es "en_camino" */}
                {order.estado === "en_camino" && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleMarkAsDelivered(order.id)}
                  >
                    <Text style={styles.buttonText}>Marcar como entregado</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.buttonContainer}>
                  {order.estado === "pendiente" && !order.repartidor_id && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleAssignDelivery(order.id)}
                    >
                      <Text style={styles.buttonText}>Tomar Pedido</Text>
                    </TouchableOpacity>
                  )}

                  {/* Ver detalles del pedido */}
                  <TouchableOpacity
                    onPress={() => handleViewDetails(order)}
                    style={styles.detailsButton}
                  >
                    <Text style={styles.linkText}>Ver detalle</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))) : (<Text style={styles.noPedidosText}>No se encontraron pedidos</Text>)}
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
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalle del pedido</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                Estatus: {selectedOrder.estado}
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Volver a Pedir</Text>
              </TouchableOpacity>
            </View>

            {/* Contenedor de productos con scroll */}
            <ScrollView
              style={styles.productScroll}
              contentContainerStyle={styles.productScrollContent}
            >
              {selectedOrder.productos.map((producto) => (
                <View key={producto.id} style={styles.productItem}>
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>
                      {producto.nombre_producto}
                    </Text>
                    <Text style={styles.productQuantity}>
                      {producto.pivot.cantidad}{" "}
                      {producto.pivot.cantidad > 1 ? "Cajas" : "Caja"}
                    </Text>
                    <Text style={styles.productPrice}>
                      ${producto.pivot.precio_total}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Total: $
                {selectedOrder.productos
                  .reduce((sum, p) => sum + parseFloat(p.pivot.precio_total), 0)
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  noPedidosText: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row", // Alinea los botones en fila
    justifyContent: "space-between", // Espacio entre los botones
    marginTop: 10, // Espaciado superior
  },
  tabs: {
    flexDirection: "row",
    marginVertical: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#005BB5",
  },
  tabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  ordersList: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12, // Bordes más suaves
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Un poco de elevación para un efecto de profundidad
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderLabel: {
    fontWeight: "bold",
    color: "#555",
  },
  orderText: {
    color: "#333",
  },
  statusText: {
    fontWeight: "bold",
    color: "#FF5733", // Color general para el texto de estado
  },
  statusInProgress: {
    color: "#33A4FF", // Azul para "En Camino"
  },
  orderDetails: {
    marginBottom: 16,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assignButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  // Texto para el botón de detalles
  linkText: {
    color: "#007BFF", // Color azul para el enlace
    fontSize: 14,
    fontWeight: "500",
  },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },

  modalSubTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  productItem: {
    marginTop: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#e3fcef",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#000",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },

  actionButton: {
    backgroundColor: "#4CAF50", // Verde para acción positiva
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8, // Bordes redondeados
    marginBottom: 10, // Espaciado entre botones
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productScroll: {
    flex: 1,
  },
  productScrollContent: {
    padding: 16,
  },
  statusPending: {
    color: "#FFA500", // Naranja
  },
  ownAssignmentMessage: {
    color: "green",
    fontStyle: "italic",
    marginTop: 5,
  },
  statusDelivered: {
    color: "#32CD32", // Verde
  },

  assignedMessage: {
    color: "red", // O el color que prefieras
    fontSize: 12,
    marginTop: 4,
  },

  detailsButton: {
    backgroundColor: "#f1f1f1", // Color neutro para detalles
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd", // Borde gris
    marginTop: 8, // Espaciado superior
  },

  // Efecto hover (puede ser utilizado si se desea en la web, pero en móvil se manejaría con animaciones o eventos de touch)
  actionButtonActive: {
    transform: [{ scale: 0.98 }], // Escala más pequeña al presionar
  },
  detailsButtonActive: {
    transform: [{ scale: 0.98 }],
  },
});

export default PedidosScreen;
