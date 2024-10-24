import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Signin({ navigation, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notvisible, setNotVisible] = useState(true);




  const handleSignin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });
  
      if (response.status === 200) {
        console.log("Login successful:", response.data);
  
        // Store user data (name, token, etc.) in AsyncStorage
        await AsyncStorage.setItem("auth", JSON.stringify(response.data));
  
        // Call the onSignIn function if needed
        onSignIn();
  
        // Navigate based on user role
        const userRole = response.data.user.role;
        if (userRole === 1) {
          setTimeout(() => {
            Alert.alert("Please sign in with web as you are admin");
          }, 2000);
        } else if (userRole === 2) {
          setTimeout(() => {
            Alert.alert("Please sign in with web as you have registered as Salon");
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.navigate(navigationStrings.TABROUTES);
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.view1}>
        <Image source={imagePath.logo} style={styles.imgStyle} />
        <Text style={styles.loginTextStyle}>Login</Text>
      </View>
      <View style={styles.view2}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <CustomizedTextInput
          label="Email Address"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputStyle={{ marginBottom: moderateVerticalScale(28) }}
        />

        <CustomizedTextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={notvisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
          rightIcon={notvisible ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible(!notvisible)}
        />
        <TouchableOpacity
          style={styles.forgotPasswordStyle}
          onPress={() => {
            navigation.navigate(navigationStrings.FORGOTPASSWORD);
          }}
        >
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CustomizedButton btnText="Login" onPress={handleSignin} />
        )}
      </View>
      <View style={styles.bottomView}>
        <Text>Not a member?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.SIGNUP);
          }}
        >
          <Text>Join Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Signin;
