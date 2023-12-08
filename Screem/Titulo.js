import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StaticHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Personal administrativo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width:"100%",
    height:"auto",
    backgroundColor: 'green',
    padding: 10,
    margin:0,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StaticHeader;
