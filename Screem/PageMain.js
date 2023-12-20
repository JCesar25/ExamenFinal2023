// Importa las librerías necesarias y los componentes
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
import { Ionicons } from "@expo/vector-icons";
import Titulo from "./Titulo";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConnexion";

// Define el componente UserList
const UserList = ({ navigation, route }) => {


  
  // Estados para usuarios, tarjetas y el estado combinado

  const [users, setUsers] = useState([]);

  const [dbnew, setDbNew] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [IDFirebase, setIDFirebase] = useState("");

  // Función para cargar usuarios desde la API al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para cargar usuarios desde la API
  const fetchData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=5");
      setUsers(response.data.results);

      const q = query(collection(db, "UserNew"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userNewArray = [];

        querySnapshot.forEach((doc) => {
          
          const userData = doc.data();
          
          const NameFirst = doc.data().name.first;
          const NameLast = doc.data().name.last;
          const email= doc.data().email;
          const urlFoto = doc.data().picture;
          const descripcion1 = doc.data().description;
          const loginUuid= doc.data().login.uuid;
          const obejto ={
            id:doc.id,
            login:{uuid: loginUuid},
            name:{first:NameFirst, last:NameLast},
            picture:urlFoto,
            email:email,
            descripcion:descripcion1
   

        }
        
         ;
          console.log(" documento :   ", doc.data().picture)

          console.log(" userNOmbnre :   ",  NameFirst )
          console.log(" userApellido :   ", NameLast)
          console.log(" correo :   ",  email)
          console.log(" descripcion :   ", descripcion1)
          console.log(" usurl foto :   ", urlFoto)

         
          console.log(" OBEJTO :   ", obejto)

          userNewArray.push(obejto)
        });

        setDbNew(userNewArray);
        console.log("usuarios de la base de datos1111: ", userNewArray);

        // Combina los datos de usuarios y tarjetas
        /* const combined = [...userNewArray, ...response.data.results];
        setCombinedData(combined); */
      });
    
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "No se pudo obtener la lista de usuarios.");
    }
  };

  // Función para navegar a los detalles de un usuario desde la API
  const navigateToUserDetails = (user) => {
    try {
      navigation.navigate("PaginaDeDetalles", {
        id:user.id,
        photo: user.picture.medium,
        first: user.name.first,
        last:user.name.last,
        email: user.email,
        description: user.descripcion,
        login: user.login.uuid,
      });
    } catch (error) {
      console.log("error en la navegacion Detalle");
    }
  };

  // Renderizar tarjetas de usuarios desde la API
  const renderUserCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToUserDetails(item)}
    >
      <Image source={{ uri: item.picture.medium }} style={styles.userImage} />
     
      <Text style={styles.userEmail}>{item.name.first}</Text>
      <Text style={styles.userEmail}>{item.name.last}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userEmail}>{item.descripcion}</Text>
      <Text style={styles.userEmail}>{item.login.uuid}</Text>
      <Text style={styles.userEmail}>{item.id}</Text>
    </TouchableOpacity>
  );

  // Función para cerrar sesión

  const handleLogout = () => {
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

  // Renderizar el componente
  return (
    <View style={styles.container}>
      <Titulo />
      {/* Renderizar lista de usuarios desde la API */}
      <FlatList
        data={dbnew}
        keyExtractor={(user) => user.login.uuid}
        renderItem={renderUserCard}
        showsVerticalScrollIndicator={false}
      />

      {/* Menú inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("AñadirUsuarios")}
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

// Estilos del componente
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
    width: 120,
    height: 120,
    borderRadius: 60,
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
    width: "100%",
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
    marginLeft: 10,
  },
});

// Exportar el componente
export default UserList;
