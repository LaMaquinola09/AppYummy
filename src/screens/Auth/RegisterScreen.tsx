import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList } from "../../navigation/types";

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [vehiculo, setVehiculo] = useState("ninguno");
  const [loading, setLoading] = useState(false); // Estado de carga

  const route = useRoute<RouteProp<RootStackParamList, "Register">>();
  const tipo = route.params?.rol ?? "cliente";

  useEffect(() => {
    navigation.setOptions({ title: "Registro" });
  }, [navigation]);

  const handleRegister = async () => {
    if (!name || !email || !password || !direccion || !telefono) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "El formato del correo electrónico no es válido.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true); // Activar el estado de carga

    try {
      const response = await fetch(
        "https://yummy.soudevteam.com/apimovilregister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nombre: name,
            email,
            password,
            password_confirmation: confirmPassword,
            direccion,
            telefono,
            vehiculo: vehiculo || null,
            tipo,
          }),
        }
      );

      setLoading(false); // Desactivar el estado de carga

      if (response.ok) {
        const jsonResponse = await response.json();
        Alert.alert("Éxito", "Usuario registrado con éxito");
        resetFields();
        navigation.navigate("Repartidor");
      } else {
        const errorResponse = await response.json();
        Alert.alert(
          "Error",
          errorResponse.message || "Error al registrar el usuario"
        );
      }
    } catch (error) {
      setLoading(false); // Desactivar el estado de carga
      Alert.alert(
        "Error de conexión",
        "Hubo un problema al conectar con el servidor."
      );
    }
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setDireccion("");
    setTelefono("");
    setVehiculo("ninguno");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      {/* Componente Picker para el tipo de vehículo */}
      {tipo === "repartidor" && ( // Mostrar solo si el tipo es 'repartidor'
        <>
          <Text style={styles.label}>Tipo de Vehículo</Text>
          <Picker
            selectedValue={vehiculo}
            style={styles.picker}
            onValueChange={(itemValue) => setVehiculo(itemValue)}
          >
            <Picker.Item label="Ninguno" value="ninguno" />
            <Picker.Item label="Moto" value="moto" />
            <Picker.Item label="Bicicleta" value="bicicleta" />
          </Picker>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterScreen;
