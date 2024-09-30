import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";
import { OtpInput } from "react-native-otp-entry";

export default function CodeVerification({ navigation }) {
  const [notvisible, setNotVisible] = useState(true);

  const submissionCheck = () => {
    setIsSubmit(true);
    navigation.navigate(navigationStrings.CHANGEPASSWORD);
  };
  return (
    <ScrollView>
      <View style={styles.view1}>
        <Text style={styles.verifyTextStyle}>Verify OTP</Text>
      </View>
      <View style={styles.view2}>
        <OtpInput numberOfDigits={4} />

        <CustomizedButton
          btnText="Submit"
          btnStyle={{ marginTop: moderateVerticalScale(40) }}
          onPress={() => {
            navigation.navigate(navigationStrings.CHANGEPASSWORD);
          }}
        />
      </View>
      <View style={styles.bottomView}>
        <Text>Don't receive the code?</Text>
        <TouchableOpacity onPress={() => alert("code resent")}>
          <Text>Resend</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
