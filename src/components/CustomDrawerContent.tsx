import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';


export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, backgroundColor:'#ff6f00' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Menú</Text>
      </View>
      {/* Lista predeterminada de elementos del Drawer */}
      <DrawerItemList {...props} />

      {/* Agregar un botón personalizado */}
      {/* <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: '#ff6f00' }}
        onPress={() => alert('Otra opción personalizada')}
      >
        <Text style={{ color: 'white' }}>Opción adicional</Text>
      </TouchableOpacity> */}
    </DrawerContentScrollView>
  );
}
