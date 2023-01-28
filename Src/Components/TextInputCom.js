/** @format */

import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Colors } from "../../assets/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const textInput = ({
  numLines,
  placeholder,
  key,
  text,
  value,
  onChangeText,
  height,
  width,
  textAlignVertical,
  backgroundColor,
  borderWidth,
  borderRadius,
  keyboardType,
  padding,
  secureTextEntry,
  multiline,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.secondView}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        key={key}
        multiline={multiline}
        numberOfLines={numLines ? numLines : 2}
        placeholderTextColor={Colors.lightText}
        style={[
          styles.textInput,
          { height: height ? height : hp("7%") },
          { width: width ? width : wp("82%") },
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : Colors.background,
          },
          { borderWidth: borderWidth ? borderWidth : null },
          { borderRadius: borderRadius ? borderRadius : 7 },
          { padding: padding ? padding : 0 },
        ]}
        secureTextEntry={secureTextEntry}
        //    secureTextEntry={SecureTextEntry}
        value={value}
        onChangeText={onChangeText}
        textAlignVertical={textAlignVertical}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default textInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.transparent,
  },
  secondView: {
    bottom: hp("1%"),
  },
  textInput: {
    paddingLeft: wp("5%"),
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
    borderRadius: 7,
  },
  textStyle: {
    fontSize: 15,
    color: Colors.titleColor,
    fontWeight: "bold",
  },
});
