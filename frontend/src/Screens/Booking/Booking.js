// Import necessary components and styles
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles"; // Import styles as default

// Define the Booking component
export default function Booking() {
  // Define state to manage the active tab
  const [activeTab, setActiveTab] = useState("ongoing");

  // Function to handle tab press
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  // Sample data for ongoing and history tabs
  const data = {
    ongoing: [
      {
        id: 1,
        name: "Ongoing Task 1",
        description: "Description for Task 1",
        image: require("../../assets/images/nailsalon.png"),
        location: "Location 1",
        appointmentDate: "2024-05-01",
        appointmentTime: "10:00 AM",
      },
      {
        id: 2,
        name: "Ongoing Task 2",
        description: "Description for Task w",
        image: require("../../assets/images/makeup.png"),
        location: "Location 1",
        appointmentDate: "2024-05-01",
        appointmentTime: "10:00 AM",
      },
      {
        id: 3,
        name: "Ongoing Task 1",
        description: "Description for Task 3",
        image: require("../../assets/images/mic.png"),
        location: "Location 1",
        appointmentDate: "2024-05-01",
        appointmentTime: "10:00 AM",
      },
      {
        id: 4,
        name: "Ongoing Task 1",
        description: "Description for Task 1",
        image: require("../../assets/images/hairsalon.png"),
        location: "Location 1",
        appointmentDate: "2024-05-01",
        appointmentTime: "10:00 AM",
      },
    ],
    history: [
      { id: 1, name: "History Task 1", description: "Description for Task 1" },
      { id: 2, name: "History Task 2", description: "Description for Task 2" },
      // Add more history tasks as needed
    ],
  };

  // Return the JSX structure
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <View>
          <Text style={styles.textHeading}>Booking</Text>
          <Text style={styles.textSubheading}>See Your Upcoming Booking</Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "ongoing" && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress("ongoing")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "ongoing" && styles.activeTabButtonText,
              ]}
            >
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "history" && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress("history")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "history" && styles.activeTabButtonText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={[styles.contentContainer, { height: 600 }]}
        data={activeTab === "ongoing" ? data.ongoing : data.history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.itemTextName}>{item.name}</Text>
              <View style={styles.locationContainer}>
                <Icon
                  name="map-marker"
                  size={20}
                  color="grey"
                  style={styles.locationIcon}
                />
                <Text style={styles.LocationitemText}>{item.location}</Text>
              </View>
              <Text style={styles.itemTextAppointment}>
                {item.appointmentDate} at {item.appointmentTime}
              </Text>
              <View style={styles.buttonView}>
                <View>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTextD}>Get Direction</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.butttonSpace}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTextC}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
