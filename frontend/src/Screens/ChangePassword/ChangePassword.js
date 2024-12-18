import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";
import { API_URL } from "../../../ipconfig";

export default function ChangePassword({ navigation,route }) {
  const [notvisible, setNotVisible] = useState(true);
  const [notvisible1, setNotVisible1] = useState(true);
  const {email} = route.params;
  
  // States to store the password values
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      try {
        const response = await fetch(`${API_URL}/auth/changePassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, email }), // Ensure both newPassword and email are sent
        });
  
        const data = await response.json();
  
        if (response.ok && data.success) {
          // If password change is successful
          Alert.alert("Success", "Password changed successfully!");
          navigation.navigate(navigationStrings.SIGNIN); // Navigate to sign-in page
        } else {
          // If there was an issue with the password change
          Alert.alert("Error", data.message || "Failed to change password.");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        Alert.alert("Error", "Unable to change password. Please try again later.");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.mainTextStyle}>Change Your Password</Text>
      </View>
      <View style={styles.view2}>
        {/* New Password Input */}
        <CustomizedTextInput
          placeholder="Enter new password"
          secureTextEntry={notvisible}
          rightIcon={notvisible ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible(!notvisible)}
          value={newPassword}
          onChangeText={setNewPassword} // Update new password state
        />
        
        {/* Confirm Password Input */}
        <CustomizedTextInput
          placeholder="Confirm your password"
          secureTextEntry={notvisible1}
          rightIcon={notvisible1 ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible1(!notvisible1)}
          value={confirmPassword}
          onChangeText={setConfirmPassword} // Update confirm password state
        />

        {/* Change Password Button */}
        <CustomizedButton
          btnText="Change Password"
          btnStyle={{ marginTop: moderateVerticalScale(20) }}
          onPress={handleChangePassword} // Trigger password comparison
        />
      </View>
    </ScrollView>
  );
}
