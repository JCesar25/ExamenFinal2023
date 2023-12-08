// UserList.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Titulo from "./Titulo";
import AñadirUsuarios from "./AñadirUsuarios"
import { v4 as uuidv4 } from "uuid";




const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchUsers();
    
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=5");
      setUsers(response.data.results);
      console.log("datos traido de la API" , response.data.results)
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "No se pudo obtener la lista de usuarios.");
    }
  };

  const handleCardAdded = (newCard) => {
    // Agregar la nueva tarjeta a la lista de tarjetas
    setCards([...cards, newCard]);
  };



  const navigateToUserDetails = (user) => {
    // Navegar a la siguiente pantalla pasando las propiedades de la foto, nombre y correo
    navigation.navigate("PaginaDeDetalles", {
      photo: user.picture.large,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
    });
  };
  const navigateToUserDetails2 = (user) => {
    // Navegar a la siguiente pantalla pasando las propiedades de la foto, nombre y correo
    navigation.navigate("PaginaDeDetalles", {
    
      name: user.name,
      email: user.email,
    });
  };

  const renderUserCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToUserDetails(item)}
    >
      <Image source={{ uri: item.picture.medium }} style={styles.userImage} />
      <Text
        style={styles.userName}
      >{`${item.name.first} ${item.name.last}`}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );
  const renderUserCard2 = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToUserDetails2(item)}
    >
     
      <Text
        style={styles.userName}
      >{item.name} </Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // Mostrar un mensaje de confirmación antes de cerrar sesión
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar Sesión",
          onPress: () => {
            // Navegar al componente de login y resetear el stack para limpiar el historial
            navigation.reset({
              index: 0,
              routes: [{ name: "Inicio de Seccion" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Titulo />
      <FlatList
        data={users}
        keyExtractor={(user) => user.login.uuid}
        renderItem={renderUserCard}
        showsVerticalScrollIndicator={false}
      />
       <FlatList
        data={cards}
        keyExtractor={(card) => card.id}
        renderItem={renderUserCard2}
        showsVerticalScrollIndicator={false}
      />
          
        
      

      {/* Menú inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('AñadirUsuarios', { onCardAdded: handleCardAdded })}
        >
          <Ionicons name="add-circle-outline" size={44} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => console.log("Detalles")}
        >
          <Ionicons name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  userImage: {
    width: 120, // Ajusta el ancho de la imagen según tus preferencias
    height: 120, // Ajusta la altura de la imagen según tus preferencias
    borderRadius: 60, // Ajusta el radio de borde según tus preferencias
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "blue",
    paddingVertical: 10,
  },
  menuButton: {
    flex: 1,
    alignItems: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginLeft: 10, // Ajusta el margen según tus preferencias
  },
});

export default UserList;
