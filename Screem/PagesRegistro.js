import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PagesRegistro = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>pantalla de registro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PagesRegistro;