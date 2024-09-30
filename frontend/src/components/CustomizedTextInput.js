import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";

export default function CustomizedTextInput({
  label,
  placeholder,
  onChangeText = () => {},
  inputStyle = {},
  rightIcon,
  leftIcon,
  onPressRight,
  ...props
}) {
  return (
    <View style={{ ...styles.inputStyle, ...inputStyle }}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.view1}>
        <TextInput
          placeholder={placeholder}
          onChange={onChangeText}
          style={styles.inlineStyle}
          {...props}
        />
        {rightIcon ? (
          <TouchableOpacity onPress={onPressRight}>
            <Image source={rightIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderRadius: moderateScale(5),
   
    
  },
  inlineStyle: {
    paddingVertical: moderateVerticalScale(8),
    fontSize: scale(16),
    width:'90%'
   
    
  },
  labelStyle: {
    fontSize: scale(14),
  },
  view1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
