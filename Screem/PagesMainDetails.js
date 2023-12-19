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
  const { photo, name, email, description, login } = route.params;

  const handleEdit = async(id) => {
    try {
      const promesa = await updateDoc(doc(db, "UserNew", id));
      Alert.alert("Se ah eliminado correctamente..");
      navigation.navigate("AñadirUsuarios");
    } catch (error) {
      Alert.alert("cargando datos");
      navigation.navigate("AñadirUsuarios");
    }
  };

  const handleDelete = async ( userId) => {
    try {
        // Construye la referencia al documento que deseas eliminar
        const iddocumen= d28F63TufjmuX4DcuKV9
        const userRef = doc(db, "UserNew", userId);

        // Elimina el documento
       try {
        await deleteDoc(userRef);
        console.log("Documento eliminado con éxito");
        
       } catch (error) {
        Alert.alert("FALLIDO");
        console.log("FALLIDO DELETE:::!!", error)
        
       }
    
       
        console.log("idlogin: ", userId)
        navigation.navigate("PaginaPrincipal");


    } catch (error) {
      Alert.alert("FALLIDO");
      console.log("FALLIDO DELETE:::!!")
      
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.userImage} />
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
      <Text style={styles.userEmail}>{description}</Text>
      <Text style={styles.userEmail}>hola{login}</Text>

      <TouchableOpacity style={styles.button} onPress={()=>handleEdit(login)}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleDelete(login)}
      >
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
