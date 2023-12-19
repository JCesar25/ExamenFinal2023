import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";

import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { storage, database, db } from "../Firebase/FirebaseConnexion";
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { SelectList } from "react-native-dropdown-select-list";

const AditarUSer = ({ navigation, route }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [urlphoto, seturlphoto] = useState("");

  const [photo, setPhoto] = useState(null);

  const [description, setDescription] = useState("");
  const [apiEmails, setApiEmails] = useState([]);
  const [url, seturl] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [IDfirebase, setIDfirebase] = useState("");

  // Función para convertir una URI a base64
  const uriToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error al convertir URI a base64:", error);
      throw error;
    }
  };

  const handleSave2 = async (uri) => {
    try {
      console.log("editado correctamente");
    } catch (error) {
      console.log("error save 2", error);
    }
  };
  const handleCameraPress = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesita permiso para acceder a la cámara.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhoto(result);
        console.log("Respuesta de la imagen tomada", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al abrir la cámara:", error);
    }
  };

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesita permiso para acceder a la galería.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhoto(result);
        console.log("Respuesta de la imagen capturada", result);
      }
    } catch (error) {
      console.error("Error al abrir la galería:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {photo && (
          <Image
            source={{ uri: photo.assets[0].uri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        )}

        <Text>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={first}
          onChangeText={setFirst}
          placeholder="Nombre"
        />
        <Text>Apellido:</Text>
        <TextInput
          style={styles.input}
          value={last}
          onChangeText={setLast}
          placeholder="Apellido"
        />

        <Text>Correo:</Text>
        <SelectList
          setSelected={(val) => setSelectedEmail(val)} // Aquí, val será el valor del correo electrónico directamente
          data={apiEmails}
        />
        <Text>Correo seleccionado: {selectedEmail || "Ninguno"}</Text>

        <Text>Descripción:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
        />

        <TouchableOpacity style={styles.iconButton} onPress={handleCameraPress}>
          <AntDesign name="camerao" size={24} color="white" />
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>Seleccionar de Galería</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSave2(photo.assets[0].uri)}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 16,
  },
});

export default AditarUSer;
