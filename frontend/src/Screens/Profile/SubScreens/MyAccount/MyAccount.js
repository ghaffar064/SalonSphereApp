import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./Styles";

export default function MyAccount() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <View style={styles.profileImageContainer}>
          {/* Circular profile image */}
          <View style={styles.profileImageWrapper}>
            <Image
              source={require("../../../../assets/images/sk.png")}
              style={styles.profileImage}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="camera" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.additionalTextContainer}>
        <Text style={styles.additionalText}>Full Name</Text>
        <View style={styles.additionalTextSubContainer}>
          <Text style={styles.additionalSubText}>Shahbaz</Text>
        </View>
      </View>
      <View style={styles.additional2ndTextContainer}>
        <Text style={styles.additionalText}>Email Id</Text>
        <View style={styles.additionalTextSubContainer}>
          <Text style={styles.additionalSubText}>Shahbaz@gmail.com</Text>
        </View>
      </View>
      <View style={styles.additional3rdTextContainer}>
        <Text style={styles.additionalText}>Phone Number</Text>
        <View style={styles.additionalTextSubContainer}>
          <Text style={styles.additionalSubText}>+923447572425</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bigButton}>
        <Text style={styles.bigButtonText}>Update</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
