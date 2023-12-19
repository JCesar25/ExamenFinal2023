// UserDetails.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConnexion";

const UserDetails = ({ route, navigation }) => {
  const { photo,  email, description, login, id ,first,last} = route.params;

  const handleEdit = async (id) => {
    try {
      console.log("boton funcionando correctamente")
      navigation.navigate("Editar");
    } catch (error) {
      Alert.alert("cargando datos");
      navigation.navigate("AñadirUsuarios");
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Construye la referencia al documento que deseas eliminar
      const userRef = doc(db, "UserNew", userId);

      // Elimina el documento
      await deleteDoc(userRef);
      navigation.navigate("PaginaPrincipal")

      console.log("Documento eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.userImage} />
    
      <Text style={styles.userName}>name:{first}</Text>
      <Text style={styles.userName}>last :{last}</Text>
      <Text style={styles.userEmail}>{email}</Text>
      <Text style={styles.userEmail}>{description}</Text>
      <Text style={styles.userEmail}>ID DE FIREBASE : {id}</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleEdit(login)}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => deleteUser(id)}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
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
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default UserDetails;
