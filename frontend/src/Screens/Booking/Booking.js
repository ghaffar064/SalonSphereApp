import React, { useContext, useState,useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { BookingContext } from '../../contextApi/BookingContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import styles from './styles';
import navigationStrings from '../../constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Booking({navigation}) {
  const { bookings } = useContext(BookingContext); // Access bookings from context
  const [activeTab, setActiveTab] = useState('ongoing'); // Manage active tab
   


  const handleTabPress = (tab) => setActiveTab(tab); // Tab switching logic

  const navigateToSalon = (item) => {
    console.log("from navigate to salon",item)
    navigation.navigate(navigationStrings.SHOP, { item }); // Navigate to salon details
  };

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToSalon(item.salon)}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image || require('../../assets/images/nailsalon.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.itemTextName}>{item.salonName}</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={20} color="grey" style={styles.locationIcon} />
            <Text style={styles.LocationitemText}>
              {item.selectedStylist?.name || 'No stylist'}
            </Text>
          </View>
          <Text style={styles.itemTextAppointment}>
            {item.selectedDate} at {item.selectedTime}
          </Text>

          {activeTab === 'ongoing' && (
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button}   onPress={() => GetDirectionPress(item)}>
                <Text style={styles.buttonTextD}>Get Direction</Text>
              </TouchableOpacity>
              <View style={styles.butttonSpace}>
                <TouchableOpacity style={styles.button} >
                  <Text style={styles.buttonTextC}  onPress={() => navigateToSalon(item.salon)}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  const GetDirectionPress = (item) => {
    const { location } = item.salon; // Access the salon's location
  
    const latitude = location.latitude;
    const longitude = location.longitude;
  
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  
    // If you want to open Google Maps with directions:
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err =>
      console.error('An error occurred while opening Google Maps:', err)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.textHeading}>Booking</Text>
        <Text style={styles.textSubheading}>See Your Upcoming Booking</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'ongoing' && styles.activeTabButton]}
            onPress={() => handleTabPress('ongoing')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'ongoing' && styles.activeTabButtonText,
              ]}
            >
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
            onPress={() => handleTabPress('history')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'history' && styles.activeTabButtonText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={[styles.contentContainer, { height: 600 }]}
        data={activeTab === 'ongoing' ? bookings.ongoing : bookings.history}
        keyExtractor={(item) => item.paymentIntentId}
        renderItem={renderBookingItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {activeTab === 'ongoing' ? 'ongoing' : 'history'} bookings available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
