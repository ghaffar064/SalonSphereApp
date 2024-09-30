import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Button, Alert } from 'react-native';
import imagePath from '../../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

export default function ServiceProvider({ selectedServices, onNextStep }) {
  const [selectedStylists, setSelectedStylists] = useState({}); // State to store selected stylists
  const [activeServices, setActiveServices] = useState(Object.keys(selectedServices)); // State to track active services

  // Filter out services with null values
  const filteredServices = Object.fromEntries(
    Object.entries(selectedServices).filter(([, value]) => value !== null)
  );

  const selectedServiceEntries = Object.entries(filteredServices);

  const handleStylistSelect = (serviceType, stylist) => {
    setSelectedStylists((prev) => ({
      ...prev,
      [serviceType]: stylist, // Store selected stylist for the service type
    }));
  };

  const handleServiceToggle = (serviceType) => {
    if (activeServices.includes(serviceType)) {
      // If the service is already active, remove it
      setActiveServices((prev) => prev.filter((service) => service !== serviceType));
      // Also remove the stylist selection for this service
      setSelectedStylists((prev) => {
        const { [serviceType]: _, ...rest } = prev; // Remove stylist for the service
        return rest; // Return the rest of the stylists
      });
    } else {
      // Add the service back
      setActiveServices((prev) => [...prev, serviceType]);
    }
  };

  const handleNextStep = () => {
    const unselectedServices = selectedServiceEntries.filter(
      ([serviceType]) => !selectedStylists[serviceType]
    );

    if (unselectedServices.length > 0) {
      const serviceNames = unselectedServices.map(([serviceType]) => serviceType).join(', ');
      Alert.alert(
        'Select Stylists',
        `Please select a stylist for: ${serviceNames}`,
        [{ text: 'OK' }]
      );
    } else {
      onNextStep(selectedStylists); // Pass the selected stylists to the next step
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      showsVerticalScrollIndicator={false} 
    >
      <Text style={styles.heading}>Select a Service Provider</Text>

      {selectedServiceEntries.length > 0 ? (
        selectedServiceEntries.map(([serviceType, serviceDetails], index) => {
          // Ensure serviceDetails is valid before rendering
          if (!serviceDetails || !serviceDetails.optionStylist) {
            return null; // Skip rendering if serviceDetails is null or empty
          }

          return (
            <View key={index} style={styles.serviceContainer}>
              <TouchableOpacity onPress={() => handleServiceToggle(serviceType)}>
                <Text style={[styles.subheading, { textDecorationLine: activeServices.includes(serviceType) ? 'none' : 'line-through' }]}>
                  {serviceType}
                </Text>
              </TouchableOpacity>

              {activeServices.includes(serviceType) && (
                <FlatList
                  data={serviceDetails.optionStylist}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={[styles.card, selectedStylists[serviceType]?.id === item.id ? styles.selectedCard : null]} 
                      onPress={() => handleStylistSelect(serviceType, item)} 
                    >
                      <Image
                        style={styles.image}
                        source={imagePath.hairsalon}
                      />
                      <Text style={styles.stylistName}>{item.name}</Text>
                      <Text style={styles.stylistDetail}>ID: {item.id}</Text>
                      <Text style={styles.stylistDetail}>Expertise: {item.expertise}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContent} 
                />
              )}
            </View>
          );
        })
      ) : (
        <Text style={styles.noServiceText}>No service selected</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNextStep} color="#2a9d8f" /> 
      </View>

      <View style={styles.bottomSpace} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#666',
  },
  serviceContainer: {
    marginBottom: 0,
  },
  card: {
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 8,
    padding: 25,
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 3,
    width: (width / 2) - 20,
  },
  selectedCard: {
    borderColor: '#2a9d8f', // Change border color when selected
    borderWidth: 2, // Make border thicker when selected
  },
  image: {
    height: moderateVerticalScale(100),
    width: moderateScale(100),
    marginBottom: 10,
  },
  stylistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: 8,
  },
  stylistDetail: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
    textAlign: 'center',
  },
  noServiceText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20, 
  },
  buttonContainer: {
    marginTop: 20, // Add some space above the button
    zIndex: 1, // Ensure the button is above other elements
  },
  bottomSpace: {
    height: 220,
  },
});
