import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface Producto {
  id: number;
  nombre_producto: string;
  pivot: {
    cantidad: number;
    precio_total: string;
  };
}

interface Pedido {
  id: number;
  cliente: { nombre: string };
  restaurante: { nombre: string };
  direccion_entrega: { calle: string; ciudad: string };
  metodo_pago: { nombre: string };
  fecha_pedido: string;
  productos: Producto[];
}

const PedidoDetalleScreen = ({ route }: any) => {
  const { pedidoId } = route.params; // Recibimos el id del pedido
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidoDetails = async () => {
      try {
        const response = await fetch(
          `https://yummy.soudevteam.com/api/pedidos/${pedidoId}`
        );
        const data = await response.json();
        setPedido(data.pedido);
      } catch (error) {
        console.error("Error al obtener los detalles del pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidoDetails();
  }, [pedidoId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!pedido) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron detalles para este pedido.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles del Pedido</Text>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.detailText}>{pedido.cliente.nombre}</Text>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Restaurante:</Text>
        <Text style={styles.detailText}>{pedido.restaurante.nombre}</Text>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Dirección de Entrega:</Text>
        <Text style={styles.detailText}>
          {pedido.direccion_entrega.calle}, {pedido.direccion_entrega.ciudad}
        </Text>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Método de Pago:</Text>
        <Text style={styles.detailText}>{pedido.metodo_pago.nombre}</Text>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Fecha del Pedido:</Text>
        <Text style={styles.detailText}>
          {new Date(pedido.fecha_pedido).toLocaleString()}
        </Text>
      </View>

      <Text style={styles.title}>Productos del Pedido</Text>
      {pedido.productos.length > 0 ? (
        pedido.productos.map((producto) => (
          <View key={producto.id} style={styles.productItem}>
            <Text style={styles.productName}>{producto.nombre_producto}</Text>
            <Text style={styles.productDetails}>
              Cantidad: {producto.pivot.cantidad} | Precio Total: $
              {producto.pivot.precio_total}
            </Text>
          </View>
        ))
      ) : (
        <Text>No hay productos en este pedido.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  detailSection: {
    marginVertical: 8,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDetails: {
    fontSize: 14,
    color: "#555",
  },
});

export default PedidoDetalleScreen;
