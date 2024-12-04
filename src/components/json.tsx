import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import restaurantData from '../../assets/restaurants.json'; // Ensure path is correct

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setRestaurants(restaurantData);
    setFilteredRestaurants(restaurantData);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filteredData = restaurants.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
          (item.city && item.city.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredRestaurants(filteredData);
    }
  };

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>📍 {item.address}</Text>
      <Text style={styles.details}>📞 {item.phone_number}</Text>
      <Text style={styles.details}>🌐 {item.website}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Total Restaurants: {filteredRestaurants.length} / {restaurants.length}
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or city..."
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      />

      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRestaurant}
        ListEmptyComponent={
          <Text style={styles.noResults}>No restaurants found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#495057',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ced4da',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  details: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 20,
  },
});

export default HomeScreen;
