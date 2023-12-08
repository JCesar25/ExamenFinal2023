// UserDetails.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UserDetails = ({ route }) => {
  const { photo, name, email } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.userImage} />
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  },
});

export default UserDetails;
