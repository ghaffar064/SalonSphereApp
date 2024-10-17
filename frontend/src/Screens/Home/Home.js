import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import GetLocation from '../../components/GetLocation';
import SearchBar from '../../components/SearchBar';
import color from '../../constants/color';
import { BellIcon } from 'react-native-heroicons/outline';

export default function Home({ navigation, permissionStatus, setPermissionStatus, location, setLocation, address, setAddress }) {
  const [allSalons, setAllSalons] = useState([]);
  const categories = [
    { name: 'Hair Salon', imagePath: imagePath.hairsalon },
    { name: 'Nail Salon', imagePath: imagePath.nailsalon },
    { name: 'Home Service', imagePath: imagePath.homeservice },
    { name: 'Make Up', imagePath: imagePath.makeup },
    { name: 'Spa', imagePath: imagePath.spa },
  ];
  const selectedType = 'yourSelectedType'; // Replace with the actual selected type logic

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get('http://192.168.100.11:3500/api/salon/getSalons', {
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

  const renderSalonItem = ({ item }) => (
    <View style={styles.salonItem}>
      <Image source={imagePath.salonpic} style={styles.salonImage} />
      <Text style={styles.salonName}>{item.name}</Text>
      <Text style={styles.salonLocation}>{item.address}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.userText}>Hello, Faiqa</Text>
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
        <Text style={styles.sectionTitle}>Salons you follow</Text>
        <FlatList horizontal data={allSalons.filter(salon => salon.followed)} renderItem={renderSalonItem} showsHorizontalScrollIndicator={false} />

        {/* Featured Salons */}
        <Text style={styles.sectionTitle}>Featured Salons</Text>
        <FlatList horizontal data={allSalons.filter(salon => salon.featured)} renderItem={renderSalonItem} showsHorizontalScrollIndicator={false} />
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
  userText: { fontSize: 18, fontWeight: 'bold' },
  banner: { width: '100%', height: 150, resizeMode: 'cover', marginVertical: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 20 },
  categoriesContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  categoryButton: { alignItems: 'center', margin: 10 },
  categoryImage: { width: 60, height: 60, marginBottom: 5 },
  categoryText: { textAlign: 'center', fontSize: 14 },
  salonItem: { margin: 10 },
  salonImage: { width: 100, height: 100, borderRadius: 10 },
  salonName: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  salonLocation: { fontSize: 12, color: 'gray' }
});
