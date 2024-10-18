import React from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

const repartidor = {
  nombre: 'Juan Pérez',
  foto: 'https://example.com/juan.jpg', // URL de la imagen del repartidor
  entregasRealizadas: 120,
  balance: 850.50,
  estado: 'Online',
  pedidosActivos: [
    {
      id: 1,
      restaurante: 'Tacos El Pastor',
      direccionCliente: 'Calle 10 #23, Colonia Centro',
      horaEntrega: '14:30',
    },
    {
      id: 2,
      restaurante: 'Pizzería Napoli',
      direccionCliente: 'Avenida Reforma #45, Colonia Roma',
      horaEntrega: '15:00',
    },
  ],
};

export default function RepartidorScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Sección de perfil del repartidor */}
      <View style={styles.perfilContainer}>
        <Image source={{ uri: repartidor.foto }} style={styles.fotoPerfil} />
        <View style={styles.infoPerfil}>
          <Text style={styles.nombre}>{repartidor.nombre}</Text>
          <Text style={styles.estado}>{repartidor.estado}</Text>
          <Text>Entregas Realizadas: {repartidor.entregasRealizadas}</Text>
          <Text>Balance: ${repartidor.balance.toFixed(2)}</Text>
        </View>
      </View>

      {/* Mapa Interactivo */}
      {/* <View style={styles.mapaContainer}>
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: 19.432608,
            longitude: -99.133209,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Ejemplo de ubicación actual del repartidor */}
          {/* <Marker
            coordinate={{ latitude: 19.432608, longitude: -99.133209 }}
            title="Tu ubicación"
          />
        </MapView>
      </View> */}

      {/* Pedidos Activos */}
      <View style={styles.pedidosContainer}>
        <Text style={styles.sectionTitle}>Pedidos Activos</Text>
        <FlatList
          data={repartidor.pedidosActivos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedidoItem}>
              <Text style={styles.pedidoTexto}>Restaurante: {item.restaurante}</Text>
              <Text style={styles.pedidoTexto}>Dirección del Cliente: {item.direccionCliente}</Text>
              <Text style={styles.pedidoTexto}>Hora de Entrega: {item.horaEntrega}</Text>
              <Button title="Ver Detalles" onPress={() => {/* Manejar navegación a detalles del pedido */}} />
            </View>
          )}
        />
      </View>

      {/* Botones de Acciones Rápidas */}
      <View style={styles.accionesContainer}>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Aceptar Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Cambiar Disponibilidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Solicitar Retiro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  perfilContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    alignItems: 'center',
  },
  fotoPerfil: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  infoPerfil: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  estado: {
    color: 'green',
    marginBottom: 5,
  },
  mapaContainer: {
    height: 250,
    marginVertical: 10,
  },
  mapa: {
    ...StyleSheet.absoluteFillObject,
  },
  pedidosContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pedidoItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  pedidoTexto: {
    fontSize: 16,
    marginBottom: 5,
  },
  accionesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  boton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
