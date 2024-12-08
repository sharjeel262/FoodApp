import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', title: 'Food delivery', image: require('./assets/images/res.png') },
  { id: '2', title: 'Take Away', image: require('./assets/images/takeaway.jpeg') },
  { id: '3', title: 'Mart', image: require('./assets/images/groc.webp') },
  { id: '4', title: 'Discounts', image: require('./assets/images/discount.webp') }
];
const cuisine = [
  { id: '1', title: 'Fast Food', image: require('./assets/images/fast.jpg') },
  { id: '2', title: 'Paratha', image: require('./assets/images/pratha.jpg') },
  { id: '3', title: 'Sweets', image: require('./assets/images/sweets.jpeg') },
  { id: '4', title: 'Pakistani', image: require('./assets/images/paki.jpg') }
];

const restaurants = [
  { id: '1', name: 'Cheezious', image: require('./assets/images/cheezious.jpeg'), deliveryTime: '30 min' },
  { id: '2', name: 'Savour Foods', image: require('./assets/images/svvv.webp'), deliveryTime: '30 min' },
  { id: '3', name: 'Subway - Lahore', image: require('./assets/images/sub.png'), deliveryTime: '30 min' },
];

export default function HomePage() {
  const navigation = useNavigation();

  const handleNavigateToJsonPage = () => {
    navigation.navigate('JsonPage'); // Navigate to JsonPage
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );

  const renderCuisineItem = ({ item }) => (
    <View style={styles.cuisineItem}>
      <Image source={item.image} style={styles.cuisineImage} />
      <Text style={styles.cuisineText}>{item.title}</Text>
    </View>
  );

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}
    >
      <Image source={item.image} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{ marginTop: 28 }}>
        {/* Button to navigate to JSON Page */}
        <View style={styles.topBar}>
          <Ionicons name="menu" size={30} color="#6A4F28" />
          <Text style={styles.topBarText}>Home</Text>
          <View style={styles.topBarIcons}>
            <Ionicons name="heart-outline" size={24} color="#6A4F28" />
            <Ionicons name="cart-outline" size={24} color="#6A4F28" style={styles.cartIcon} />
          </View>
        </View>

        <Text style={styles.greeting}>Good Evening, Sharjeel</Text>
        <Text style={styles.restaurantCount}>What's for dinner? There are 567 restaurants in your area</Text>
        <Button title="All Restaurants" onPress={handleNavigateToJsonPage} color="#D4A200" />

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color="#6A4F28" />
          <TextInput placeholder="Search for shops & restaurants" style={styles.searchInput} />
        </View>

        {/* Category List */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        {/* Cuisine List */}
        <Text style={styles.sectionTitle}>Cuisine</Text>
        <FlatList
          data={cuisine}
          renderItem={renderCuisineItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cuisineList}
        />

        {/* Restaurant List */}
        <FlatList
          data={restaurants}
          scrollEnabled={false}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Text style={styles.sectionTitle}>Your Restaurants</Text>}
          style={styles.restaurantList}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: '#FFF8E1', // Soft yellow background
  },
  topBar: {
    backgroundColor: '#D4A200', // Darker yellow/golden for top bar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -31,
    marginBottom: 16,
    height: 60,
    borderRadius: 3,
    paddingHorizontal: 12,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A4F28', // Dark brown for text contrast
  },
  topBarIcons: {
    flexDirection: 'row',
  },
  cartIcon: {
    marginLeft: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A4F28', // Dark brown for text
  },
  restaurantCount: {
    color: 'gray',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEB3B', // Bright yellow for search bar
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D4A200', // Border color matching top bar
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: '#6A4F28', // Text color for input
  },
  categoryList: {
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 0,
  },
  categoryText: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A4F28', // Dark brown for text
  },
  cuisineList: {},
  cuisineItem: {
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 16,
  },
  cuisineImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  cuisineText: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A4F28', // Dark brown for text
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#6A4F28', // Dark brown for section titles
  },
  restaurantList: {},
  restaurantItem: {
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#FFF9C4', // Light yellow for card background
    borderRadius: 8,
    padding: 8,
  },
  restaurantImage: {
    flex: 1,
    width: 400,
    height: 140,
    resizeMode: 'stretch',
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 5,
    marginRight: 30,
    marginBottom: 10,
  },
  restaurantInfo: {
    flex: 1,
    padding: 2,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A4F28', // Dark brown for text
  },
  deliveryTime: {
    color: 'gray',
  },
});
