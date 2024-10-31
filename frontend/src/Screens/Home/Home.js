import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,

} from 'react-native';

import axios from 'axios';
import { moderateScale, moderateVerticalScale, } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import GetLocation from '../../components/GetLocation';
import SearchBar from '../../components/SearchBar';
import color from '../../constants/color';
import { BellIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavorites } from '../../contextApi/FavouriteContext'; // Import Favorites context

export default function Home({
  navigation,
  permissionStatus,
  setPermissionStatus,
  location,
  setLocation,
  address,
  setAddress,
  allSalons,
  categories
}) {


  

  
  const { favorites } = useFavorites(); 
 
  
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

 

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('auth');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.user.first_name);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

 

  const handleCategorySelect = (category) => {
    const filtered = allSalons.filter((salon) =>
      salon.salonType.includes(category)
    );
    navigation.navigate(navigationStrings.CATEGORIES, {
      category: {
        name: category,
        data: filtered,
        placeholder: `Search for ${category}`,
      },
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      key={item.name}
      onPress={() => handleCategorySelect(item.name)}
    >
      <Image source={item.imagePath} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFavoriteSalon = ({ item }) => (
   <TouchableOpacity
  //  activeOpacity={1}
   onPress={() =>
    navigation.navigate(navigationStrings.SHOP, { item })
    
  }
 
   >
     <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.cardContent}>
       
        <Text style={styles.categories}>
          {Array.isArray(item.salonType) ? item.salonType.join(', ') : 'No category'}
        </Text>
        <Text style={styles.salonName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <StarIcon size={16} color="orange" />
          <Text style={styles.rating}>{item.reviews?.averageRating || 'N/A'}</Text>
          <Text style={styles.reviews}>({item.reviews?.totalReviews || 0})</Text>
        </View>
      </View>
    </View>
   </TouchableOpacity>
  );
  

  if (loading) {
    return <View style={{flex:1,backgroundColor:'white'}}></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
        
          <View style={styles.headerContent}>
            <Text style={styles.userText}>Hello, {userName}</Text>
            {loading?<ActivityIndicator size="large" color="#0000ff"/>:
              <GetLocation
              permissionStatus={permissionStatus}
              setPermissionStatus={setPermissionStatus}
              location={location}
              setLocation={setLocation}
              address={address}
              setAddress={setAddress}
            />
            
            }
          </View>
          
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.NOTIFICATION)}
          >
            <BellIcon size={30} color={color.background} fill={color.foreground} />
          </TouchableOpacity>
        </View>

        <SearchBar placeholder="Search for services" />
       
        <Image source={imagePath.promo} style={styles.banner} />

        <Text style={styles.sectionTitle}>What do you want to do?</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.categoriesContainer}
        />

        <Text style={styles.sectionTitle}>Your Favourites</Text>
        {favorites.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 10 }}>
            No favourites added yet.
          </Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteSalon}
            keyExtractor={(item, index) => item._id || item.salonId || index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}

        <Text style={styles.sectionTitle}>Featured Salons</Text>
        <FlatList
          data={allSalons}
          renderItem={renderFavoriteSalon}
          keyExtractor={(item) => item._id || item.salonId.toString()}
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
    justifyContent: 'space-between',
    backgroundColor: color.background,
    padding: moderateScale(28),
    borderBottomEndRadius: moderateScale(80),
  },
  headerContent: { flexDirection: 'column' },
  userText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  banner: { width: '100%', height: 150, resizeMode: 'cover', marginVertical: 15 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  categoriesContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  categoryButton: { alignItems: 'center', margin: 10 },
  categoryImage: { width: 60, height: 60, marginBottom: 5 },
  categoryText: { textAlign: 'center', fontSize: 14 },
  listContainer: { paddingHorizontal: 16, padding: 10 },
  card: {
   
    borderRadius: 10,
    marginRight: 5,
    width:'100%',
    width: 200, 
    height: 220, 
    elevation: 2,
    backgroundColor: 'white',
    
  },
  image: { width: '100%', height: 120 },
  favoriteIcon: { position: 'absolute', top: 10, right: 10 },
  cardContent: { padding: 10 },
  categories: { fontSize: 12, color: '#888', marginBottom: 4 },
  salonName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { marginLeft: 4, fontSize: 14, color: '#333' },
  reviews: { marginLeft: 4, fontSize: 14, color: '#888' },
});
