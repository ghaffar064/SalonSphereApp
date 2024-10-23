import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, FlatList, ScrollView,ActivityIndicator  } from 'react-native';
import axios from 'axios';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import GetLocation from '../../components/GetLocation';
import SearchBar from '../../components/SearchBar';
import color from '../../constants/color';
import { BellIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({ navigation, permissionStatus, setPermissionStatus, location, setLocation, address, setAddress }) {
  const [allSalons, setAllSalons] = useState([]);
  const categories = [
    { name: 'Hair Salon', imagePath: imagePath.hairsalon },
    { name: 'Nail Salon', imagePath: imagePath.nailsalon },
    { name: 'Home Service', imagePath: imagePath.homeservice },
    { name: 'Make Up', imagePath: imagePath.makeup },
    { name: 'Spa', imagePath: imagePath.spa },
  ];
  const selectedType = 'yourSelectedType'; 
  
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('auth');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.user.first_name); // Set the user's first name
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
 
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/salon/getSalons`, {
          params: {
            salonType: categories.map(category => category.name), // Modify according to your needs
            selectedType: selectedType // Send selectedType parameter
          }
        });
        console.log(response.data);
        setAllSalons(response.data); // Store all fetched salons
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
    };

    fetchSalons();
  }, [selectedType]); // Add selectedType to the dependency array if it changes dynamically

  const handleCategorySelect = (category) => {
    const filtered = allSalons.filter(salon => salon.salonType.includes(category));
    navigation.navigate(navigationStrings.CATEGORIES, {
      category: {
        name: category,
        data: filtered,
        placeholder: `Search for ${category}`,
      },
    });
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderCategory = (category) => (
    <TouchableOpacity
      style={styles.categoryButton}
      key={category.name}
      onPress={() => handleCategorySelect(category.name)}
    >
      <Image source={category.imagePath} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );

 
  const salons = [
    {
      id: '1',
      name: 'Looks Salon',
      categories: 'Hair . Nails . Facial',
      location: 'Johar town, Lahore',
      rating: 4.8,
      reviews: '3.1k',
      imageUrl: 'https://example.com/looks_salon.jpg', // Replace with actual image URL
    },
    {
      id: '2',
      name: 'Plush Beauty Lounge',
      categories: 'Hair . Facial . 2+',
      location: 'PIA Housing, Lahore',
      rating: 4.7,
      reviews: '2.7k',
      imageUrl: 'https://example.com/plush_beauty.jpg', // Replace with actual image URL
    },
    {
      id: '3',
      name: 'Plush Beauty Lounge',
      categories: 'Hair . Facial . 2+',
      location: 'PIA Housing, Lahore',
      rating: 4.7,
      reviews: '2.7k',
      imageUrl: 'https://example.com/plush_beauty.jpg', // Replace with actual image URL
    },
    {
      id: '4',
      name: 'Plush Beauty Lounge',
      categories: 'Hair . Facial . 2+',
      location: 'PIA Housing, Lahore',
      rating: 4.7,
      reviews: '2.7k',
      imageUrl: 'https://example.com/plush_beauty.jpg', // Replace with actual image URL
    },
    // Add more salon data as needed
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
          <Text style={styles.userText}>Hello, {userName}</Text>
            <GetLocation permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus} location={location} setLocation={setLocation} address={address} setAddress={setAddress} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.NOTIFICATION)}>
            <BellIcon size={30} color={color.background} fill={color.foreground} />
          </TouchableOpacity>
        </View>
        <SearchBar placeholder="Search for services" />
        
        {/* Promotional Banner */}
        <Image source={imagePath.promo} style={styles.banner} />

        {/* Categories */}
        <Text style={styles.sectionTitle}>What do you want to do?</Text>
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCategory(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.categoriesContainer}
        />

        {/* Followed Salons */}
        <Text style={styles.sectionTitle}>Your Favourites</Text>
        <FlatList
      data={salons}
      renderItem={({ item }) => <SalonCard salon={item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />

        {/* Featured Salons */}
        <Text style={styles.sectionTitle}>Featured Salons</Text>
        <FlatList
      data={salons}
      renderItem={({ item }) => <SalonCard salon={item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row',  
    justifyContent: "space-between",
    backgroundColor: color.background,
    padding: moderateScale(28),
    borderBottomEndRadius: moderateScale(80),
  },
  headerContent: { flexDirection: 'column' },
  userText: { fontSize: 16, fontWeight: 'bold',color:'white' },
  banner: { width: '100%', height: 150, resizeMode: 'cover', marginVertical: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 20 },
  categoriesContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  categoryButton: { alignItems: 'center', margin: 10 },
  categoryImage: { width: 60, height: 60, marginBottom: 5 },
  categoryText: { textAlign: 'center', fontSize: 14 },
  salonItem: { margin: 10 },
  salonImage: { width: 100, height: 100, borderRadius: 10 },
  salonName: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  salonLocation: { fontSize: 12, color: 'gray' },
  listContainer: {
    paddingHorizontal: 16,
    padding:10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 16,
    width: 200,
    overflow: 'hidden',
    elevation: 3,
    
  },
  image: {
    width: '100%',
    height: 120,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardContent: {
    padding: 10,
  },
  categories: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  salonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  reviews: {
    marginLeft: 4,
    fontSize: 14,
    color: '#888',
  },
});
const SalonCard = ({ salon }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: salon.imageUrl }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteIcon}>
      <HeartIcon size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.categories}>{salon.categories}</Text>
        <Text style={styles.salonName}>{salon.name}</Text>
        <Text style={styles.location}>{salon.location}</Text>
        <View style={styles.ratingContainer}>
        <StarIcon size={16} color="orange" />
          <Text style={styles.rating}>{salon.rating}</Text>
          <Text style={styles.reviews}>({salon.reviews})</Text>
        </View>
      </View>
    </View>
  );
};