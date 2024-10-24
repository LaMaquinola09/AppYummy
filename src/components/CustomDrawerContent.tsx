import React, { useEffect, useState } from 'react'; 
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName'); // Cambia 'userName' si usas otra clave
        setUserName(name);
      } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error);
      }
    };

    getUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Asegúrate de usar la clave correcta
      await AsyncStorage.removeItem('userName'); // Opcional: también puedes eliminar el nombre al cerrar sesión
      props.navigation.navigate('Login'); // Cambia 'Login' por el nombre de tu pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      {/* Encabezado del Drawer */}
      <View style={styles.header}>
        {/* Avatar del usuario */}
        <TouchableOpacity style={styles.profileContainer} onPress={() => console.log('Navegar al perfil')}>
          <Image
            source={require('../../assets/icon.png')} // Reemplaza con la URL real del avatar del usuario
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{userName || 'Usuario'}</Text> 
            <Text style={styles.userProfile}>Mi perfil {'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Lista predeterminada de elementos del Drawer */}
      <DrawerItemList {...props} />

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Ejemplo de un botón personalizado (opcional) */}
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: '#ff6f00' }}
        onPress={() => alert('Otra opción personalizada')}
      >
        <Text style={{ color: 'white' }}>Opción adicional</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff6f00', // Color amarillo
    paddingVertical: 40, // Aumenta el tamaño del Header
    paddingHorizontal: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userProfile: {
    fontSize: 14,
    color: '#fff',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff6347', // Color para el botón de cerrar sesión
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
