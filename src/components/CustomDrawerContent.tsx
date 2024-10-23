import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        {/* Logo de la App */}
        <Image
          source={require('../../assets/LogoPNG.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Título "Menú" */}
        <Text style={styles.menuTitle}>YUMMY</Text>
      </View>

      {/* Lista predeterminada de elementos del Drawer */}
      <DrawerItemList {...props} />

      {/* Ejemplo de un botón personalizado (opcional) */}
      {/* <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: '#ff6f00' }}
        onPress={() => alert('Otra opción personalizada')}
      >
        <Text style={{ color: 'white' }}>Opción adicional</Text>
      </TouchableOpacity> */}
    </DrawerContentScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6f00',
    padding: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10, // Ajustar para acercar el logo al texto "Menú"
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
