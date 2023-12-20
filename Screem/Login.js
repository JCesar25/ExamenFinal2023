import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase/FirebaseConnexion"; // Importa el módulo de autenticación de Firebase
import {
 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const WelcomeScreen = ({ navigation }) => {
  // Estados para guardar información del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("inicio de seccion exitoso");
        const user = userCredential.user;
        console.log({user});
        Alert.alert("inicio de seccion exitosoo",)
        navigation.navigate("PaginaPrincipal");
      })
      .catch((error) => {
        console.log("error inicio de seccion:", error.code);
        Alert.alert("error inicio de seccion 1 asiendo comin:", error.code)
      });
  };

  const handleRegister = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("cuenta creada exitosoOOOGIT sdsdsdsA");
        const user = userCredential.user;
        console.log(user);
        Alert.alert("se a registrado exitosamentedsdsdsdsd")
        navigation.navigate("PaginaPrincipal");
     
      })
      .catch((error) => {
        console.log("error al registrar tu cuenta subiendo a git el nuevo cambioo:", error);
        
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <ImageBackground
        source={require("../Imagenes/LogoUDI.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Bienvenido a mi app UDI</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: 250,
    color: "white",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default WelcomeScreen;
