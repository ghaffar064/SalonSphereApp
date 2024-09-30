import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";

export default function ForgotPassword({ navigation }) {
  const [notvisible, setNotVisible] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  function submissionCheck() {
    setIsSubmit(true);
    navigation.navigate(navigationStrings.CODEVERIFICATION);
  }
  return (
    <ScrollView>
      <View style={styles.view1}>
        <Text style={styles.forgotTextStyle}>Forgot Password</Text>
      </View>
      <View style={styles.view2}>
        <CustomizedTextInput
          placeholder="Enter email"
          keyboardType="email-address"
          inputStyle={{ marginBottom: moderateVerticalScale(20) }}
        />

        <CustomizedButton btnText="Submit" onPress={submissionCheck} />
      </View>
      <View style={styles.bottomView}>
        {isSubmit ? (
          <Text style={{ color: "red" }}>
            We have sent you verification code on your email address
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}
