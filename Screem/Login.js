import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  // Estados para guardar información del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Guardamos en una variable la condición que tiene que cumplir el input CORREO
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Introduce un correo electrónico válido');
    } else if (!password) {
      Alert.alert('Error', 'Introduce una contraseña');
    } else {
      // Aquí puedes realizar acciones adicionales, como iniciar sesión
      navigation.navigate('PaginaPrincipal');
      console.log('Iniciar sesión:', email, password);
      // Limpia los datos del formulario después de iniciar sesión
      setEmail('');
      setPassword('');
    }
  };

  const handleRegister = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Introduce un correo electrónico válido');
    } else if (!password) {
      Alert.alert('Error', 'Introduce una contraseña');
    } else {
      // Aquí puedes realizar acciones adicionales, como registrar al usuario
      navigation.navigate('PaginaPrincipal');
      console.log('Registrarse:', email, password);
      // Limpia los datos del formulario después de registrarse
      setEmail('');
      setPassword('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <ImageBackground
        source={require('../Imagenes/LogoUDI.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Bienvenido a mi app</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: 250,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;

