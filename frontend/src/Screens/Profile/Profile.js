// Import necessary components and styles
import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import navigationStrings from "../../constants/navigationStrings";
import styles from "./styles"; // Import styles as default

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <View>
          <Text style={styles.textHeading}>Profile</Text>
        </View>

        <View>
          <View style={styles.profileImageContainer}>
            {/* Circular profile image */}
            <View style={styles.profileImageWrapper}>
              <Image
                source={require("../../assets/images/sk.png")}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileTextView}>
              <Text style={styles.profileTextName}>Shahbaz</Text>
              <Text style={styles.profileTextEmail}>Shahbaz@gmail.com</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.additionalTextContainer}>
        <TouchableOpacity
          style={styles.additionalTextView}
          onPress={() => {
            navigation.navigate(navigationStrings.MYACCONT);
          }}
        >
          <Icon name="user" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>My Account</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => console.log("Chat clicked")}
        >
          <Icon name="comment" size={25} style={styles.ChatIcon} />
          <Text style={styles.additionalText}>Chat</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {/* 2nd container start from here */}
      <View style={styles.additionalText2ndContainer}>
        <TouchableOpacity
          style={styles.additionalTextView}
          onPress={() => console.log("My Favorite clicked")}
        >
          <Icon name="heart-o" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>Favorite</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => console.log("Language clicked")}
        >
          <Icon name="language" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>Language</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => console.log("Notification Setting")}
        >
          <Icon name="bell-o" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>Notification Setting</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => console.log("Invite Friends clicked")}
        >
          <Icon name="user-plus" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>Invite Friends</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => console.log("Your Coupon clicked")}
        >
          <Icon name="ticket" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>Your Coupon</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => console.log("Terms Of Services clicked")}
        >
          <Icon name="file-text-o" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>Terms Of Services</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => console.log("Help And Support clicked")}
        >
          <Icon name="question-circle-o" size={25} style={styles.ProfileIcon} />
          <Text style={styles.additionalText}>Help And Support</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
