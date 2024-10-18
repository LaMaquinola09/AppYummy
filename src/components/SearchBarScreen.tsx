// SearchBar.js
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar comida, restaurantes..."
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: '#ff6f00', // Color de fondo de la barra de búsqueda
  },
  searchBar: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 25,
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchBar;
