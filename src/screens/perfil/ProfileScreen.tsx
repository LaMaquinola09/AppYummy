import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns'; // Importa la función de formato

const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userVehicle, setUserVehicle] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [membershipDate, setMembershipDate] = useState('05 marzo 2024');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        const phone = await AsyncStorage.getItem('userPhone');
        const direccion = await AsyncStorage.getItem('userDireccion');
        const vehiculo = await AsyncStorage.getItem('userVehiculo');
        const image = await AsyncStorage.getItem('userProfileImage');
        const createdAtValue = await AsyncStorage.getItem('userCreatedAt'); // Obtener la fecha de creación

        if (name) setUserName(name);
        if (email) setUserEmail(email);
        if (phone) setUserPhone(phone);
        if (direccion) setUserLocation(direccion);
        if (vehiculo) setUserVehicle(vehiculo);
        if (image) setProfileImage(image);

        // Formatear y establecer la fecha de creación
        if (createdAtValue) {
          const formattedDate = format(new Date(createdAtValue), 'dd MMMM yyyy'); // Formato deseado
          setCreatedAt(formattedDate);
        } else {
          setCreatedAt('Fecha no disponible'); // Manejo del caso en que no haya fecha
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#FF6F00', '#FF8E53']} style={styles.header}>
        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.defaultAvatar}>
              <Ionicons name="person-outline" size={50} color="#fff" />
            </View>
          )}
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userName || 'Nombre de Usuario'}</Text>
      </LinearGradient>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Información Personal</Text>
        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={20} color="gray" />
          <Text style={styles.infoText}>{userEmail || 'Email no disponible'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={20} color="gray" />
          <Text style={styles.infoText}>{userPhone || 'Teléfono no disponible'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={20} color="gray" />
          <Text style={styles.infoText}>{userLocation || 'Ubicación no disponible'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="star-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.infoText}>Miembro Yummy desde: {membershipDate}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.infoText}>Cuenta creada el: {createdAt}</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Estadísticas</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2k</Text>
            <Text style={styles.statLabel}>Amigos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Fotos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>89</Text>
            <Text style={styles.statLabel}>Comentarios</Text>
          </View>
        </View>
      </View>

      <Text style={styles.bio}>
        Este es el perfil de {userName || 'Usuario'}. Disfruto de la cocina, los viajes y explorar nuevas culturas a través de la gastronomía.
      </Text>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar Mensaje</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  icon: {
    marginRight: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FF8B2E',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ff6f00',
    marginBottom: 10,
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ff6f00',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', // Color de fondo del avatar
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff6f00',
    padding: 5,
    borderRadius: 5,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#666',
  },
  imageContainer: {
    position: 'relative',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  bio: {
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
    color: '#444',
  },
  button: {
    backgroundColor: '#ff6f00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
