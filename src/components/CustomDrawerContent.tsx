import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const avatar = await AsyncStorage.getItem('userAvatar');
        const role = await AsyncStorage.getItem('usertipo');
        setUserName(name);
        setUserAvatar(avatar);
        setUserRole(role);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      props.navigation.reset({index:0, routes:[{name:'Login'}]});
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
    }
  };

  const handleAbout = () => {
    props.navigation.navigate('Acercade');
  };

  const handleProfile = () => {
    props.navigation.navigate('Mi Perfil');
  };

  // Filtrar pantallas según el rol del usuario
  const filteredScreens = [
    { name: 'Admin', label: 'Inicio', icon: "home-outline", roles: ['admin'] },
    { name: 'Inicio', label: 'Inicio', icon: "home-outline", roles: ['cliente'] },
    { name: 'Repartidor', label: 'Repartidor', icon: "bicycle-outline", roles: ['repartidor'] },
    { name: 'Pedidos', label: 'Lista de Pedidos', icon: "cart-outline", roles: ['repartidor'] },
    { name: 'Historial de pedidos', label: 'Historial de pedidos', icon: "time-outline", roles: ['cliente'] },
    { name: 'Mis Pedidos', label: 'Mis Pedidos', icon: "list-outline", roles: ['cliente'] },
    { name: 'Mi Perfil', label: 'Perfil', icon: "person-outline", roles: ['cliente', 'admin', 'repartidor'] },
    { name: 'WebViewScreen', label: 'Recuperar contraseña', icon: "lock-closed-outline", roles: ['cliente', 'admin', 'repartidor'] },
  ];

  const screensToShow = filteredScreens.filter((screen) => screen.roles.includes(userRole || ''));

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      {/* Encabezado del Drawer */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileContainer} onPress={handleProfile}>
          {userAvatar ? (
            <Image
              source={{ uri: userAvatar }}
              style={styles.avatar}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={55} color="#fff" style={styles.avatar} />
          )}
          <View>
            <Text style={styles.userName}>{userName || 'Usuario'}</Text>
            <Text style={styles.userProfile}>Mi perfil {'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      

      {/* Renderizar las pantallas filtradas */}
      {screensToShow.map((screen) => (
        <TouchableOpacity
          key={screen.name}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate(screen.name)}
        >
          <Ionicons name={screen.icon} size={25}/>
          <Text style={styles.drawerItemText}>{screen.label}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.separator} />

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
    backgroundColor: '#ff6f00',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 10,
    marginBottom: 10
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
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  aboutButtonText: {
    color: '#142738',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6f00',
    padding: 12,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});
