import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import restaurantData from '../../assets/restaurants.json';

type Restaurant = {
  name: string;
  address: string;
  phone_number: string;
  website: string;
  city?: string;
};

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setRestaurants(restaurantData);
    setFilteredRestaurants(restaurantData);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filteredData = restaurants.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.city?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filteredData);
    }
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const renderRestaurant = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleRestaurantPress(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>
        📍
        <Text style={styles.link}>{item.address}</Text>
      </Text>
      <Text style={styles.details}>
        📞
        <Text style={styles.link}>{item.phone_number}</Text>
      </Text>
      <Text style={styles.details}>
        🌐
        <Text style={styles.link}>{item.website}</Text>
      </Text>
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
        onChangeText={handleSearch}
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
    backgroundColor: '#FFF8E1',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#D4A200',
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#FFEB3B',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D4A200',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#FFF9C4',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D4A200',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6A4F28',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#6A4F28',
    marginTop: 4,
  },
  link: {
    color: '#D4A200',
    textDecorationLine: 'underline',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 20,
  },
});

export default HomeScreen;
