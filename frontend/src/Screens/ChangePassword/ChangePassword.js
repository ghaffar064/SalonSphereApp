import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";

export default function ChangePassword({ navigation }) {
  const [notvisible, setNotVisible] = useState(true);
  const [notvisible1, setNotVisible1] = useState(true);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.mainTextStyle}>Change Your Password</Text>
      </View>
      <View style={styles.view2}>
        <CustomizedTextInput
          placeholder="Enter new password"
          secureTextEntry={notvisible}
          rightIcon={notvisible ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible(!notvisible)}
        />
        <CustomizedTextInput
          placeholder="Confirm your password"
          secureTextEntry={notvisible1}
          rightIcon={notvisible1 ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible1(!notvisible1)}
        />

        <CustomizedButton
          btnText="Change Password"
          btnStyle={{ marginTop: moderateVerticalScale(20) }}
          onPress={() => {
            navigation.navigate(navigationStrings.SIGNIN);
          }}
        />
      </View>
    </ScrollView>
  );
}
