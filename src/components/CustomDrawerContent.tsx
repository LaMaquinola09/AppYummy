import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener esta librería instalada

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null); // Estado para el avatar del usuario

  useEffect(() => {
    const getUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName'); // Cambia 'userName' si usas otra clave
        const avatar = await AsyncStorage.getItem('userAvatar'); // Cambia 'userAvatar' si usas otra clave
        setUserName(name);
        setUserAvatar(avatar); // Almacena el avatar
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Asegúrate de usar la clave correcta
      await AsyncStorage.removeItem('userName'); // Opcional: también puedes eliminar el nombre al cerrar sesión
      await AsyncStorage.removeItem('userAvatar'); // Opcional: también puedes eliminar el avatar al cerrar sesión
      props.navigation.navigate('Login'); // Cambia 'Login' por el nombre de tu pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
    }
  };

  const handleAbout = () => {
    props.navigation.navigate('Acercade');
  };


  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      {/* Encabezado del Drawer */}
      <View style={styles.header}>
        {/* Avatar del usuario */}
        <TouchableOpacity style={styles.profileContainer} onPress={() => console.log('Navegar al perfil')}>
          {userAvatar ? (
            <Image
              source={{ uri: userAvatar }} // Muestra el avatar del usuario
              style={styles.avatar}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={60} color="#fff" style={styles.avatar} /> // Ícono predeterminado
          )}
          <View>
            <Text style={styles.userName}>{userName || 'Usuario'}</Text>
            <Text style={styles.userProfile}>Mi perfil {'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.separator} />

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Información adicional</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAbout} style={styles.aboutButton}>
        <Ionicons name="information-circle-outline" size={28} color="#142738" style={styles.icon} />
        <Text style={styles.aboutButtonText}>Acerca de Yummy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={28} color="#fff" style={styles.icon} />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff6f00', // Color naranja
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
    marginTop: 285,
    flexDirection: 'row', // Para alinear el ícono y el texto en la misma fila
    alignItems: 'center', // Centra verticalmente
    backgroundColor: '#ff6f00',
    padding: 12,
    borderRadius: 0,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10, // Espacio entre el ícono y el texto
  },
  icon: {
    marginRight: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  aboutButton: {
    flexDirection: 'row', // Alinea el ícono y el texto en una fila
    alignItems: 'center', // Centra verticalmente
    padding: 10,
  },
  aboutButtonText: {
    color: '#142738',
    fontWeight: 'bold',
    marginLeft: 8, // Espacio entre el ícono y el texto
  },

  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6f00',
    borderRadius: 5, // Añadir un borde redondeado
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',


  },
});
