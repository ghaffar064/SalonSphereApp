import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";


export default function Signup({ navigation }) {
  const [notvisible, setNotVisible] = useState(true);
  return (
    <ScrollView>
      <View style={styles.view1}>
        <Image source={imagePath.logo} style={styles.imgStyle} />
        <Text style={styles.signupTextStyle}>Register</Text>
      </View>
      <View style={styles.view2}>
        <CustomizedTextInput
          placeholder="Enter full name"
          inputStyle={{ marginBottom: moderateVerticalScale(10) }}
        />
        <CustomizedTextInput
          placeholder="Enter email"
          keyboardType="email-address"
          inputStyle={{ marginBottom: moderateVerticalScale(10) }}
        />
        <CustomizedTextInput
          placeholder="Enter Phone"
          keyboardType="numeric"
          inputStyle={{ marginBottom: moderateVerticalScale(10) }}
          leftIcon={imagePath.hideEye}
        />

        <CustomizedTextInput
          placeholder="Enter password"
          secureTextEntry={notvisible}
          rightIcon={notvisible ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible(!notvisible)}
          inputStyle={{ marginBottom: moderateVerticalScale(30) }}
        />

        <CustomizedButton btnText="Signup" onPress={() => alert("Register")} />
      </View>
      <View style={styles.bottomView}>
        <Text>Already a member?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.SIGNIN);
          }}
        >
          <Text>Signin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
