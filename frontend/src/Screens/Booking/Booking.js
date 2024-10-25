import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { BookingContext } from '../../contextApi/BookingContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Booking() {
  const { bookings } = useContext(BookingContext); // Access bookings from context
  const [activeTab, setActiveTab] = useState('ongoing'); // Manage active tab

  const handleTabPress = (tab) => setActiveTab(tab); // Tab switching logic
  console.log(bookings)

  const renderBookingItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image || require('../../assets/images/nailsalon.png')} style={styles.image} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.itemTextName}>{item.salonName}</Text>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={20} color="grey" style={styles.locationIcon} />
          <Text style={styles.LocationitemText}>{item.selectedStylist?.name || 'No stylist'}</Text>
        </View>
        <Text style={styles.itemTextAppointment}>
          {item.selectedDate} at {item.selectedTime}
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextD}>Get Direction</Text>
          </TouchableOpacity>
          <View style={styles.butttonSpace}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTextC}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.textHeading}>Booking</Text>
        <Text style={styles.textSubheading}>See Your Upcoming Booking</Text>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'ongoing' && styles.activeTabButton]}
            onPress={() => handleTabPress('ongoing')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'ongoing' && styles.activeTabButtonText]}>
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
            onPress={() => handleTabPress('history')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'history' && styles.activeTabButtonText]}>
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList to Render Bookings */}
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
