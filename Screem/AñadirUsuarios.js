// AddCard.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
// En la parte superior de tu archivo
import { v4 as uuidv4 } from "uuid";

const AddCard = ({ navigation, route }) => {
  const { onCardAdded } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [address, setAddress] = useState(""); // Nuevo campo de dirección
  const [phoneNumber, setPhoneNumber] = useState(""); // Nuevo campo de número de teléfono

  const handleSave = () => {
    const newCard = {
      id: uuidv4(),
      name,
      email,
      photoUrl,
      address, // Nuevo campo de dirección
      phoneNumber, // Nuevo campo de número de teléfono
    };

    // Llamamos a la función onCardAdded para agregar la nueva tarjeta al componente principal
    onCardAdded(newCard);

    // Navegar de nuevo a la pantalla principal después de guardar
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
      />

      <Text>Correo:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo"
      />

      <Text>URL de la foto:</Text>
      <TextInput
        style={styles.input}
        value={photoUrl}
        onChangeText={setPhotoUrl}
        placeholder="URL de la foto"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default AddCard;
