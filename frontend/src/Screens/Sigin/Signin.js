import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";






  export  function Signin({ navigation, onSignIn  }) {
   

    const handleSignin = () => {
      onSignIn(); 
      navigation.navigate(navigationStrings.TABROUTES); 
    };
  
 
  const [notvisible, setNotVisible] = useState(true);


  return (
   
    <ScrollView style={styles.container}>
     
      <View style={styles.view1}>
        <Image source={imagePath.logo} style={styles.imgStyle} />
        <Text style={styles.loginTextStyle}>Login</Text>
      </View>
      <View style={styles.view2}>
        <CustomizedTextInput
          label="Email Address"
          placeholder="Enter your email"
          keyboardType="email-address"
          inputStyle={{ marginBottom: moderateVerticalScale(28) }}
        />

        <CustomizedTextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={notvisible}
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
        <CustomizedButton btnText="Login" onPress={handleSignin} />
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
export default Signin