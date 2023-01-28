/** @format */

import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import Colors from "../../assets/theme/Colors";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from "react-native-elements";
import Icon from "@expo/vector-icons/AntDesign";
const PrimaryButton = ({
  onPress,
  icon,
  style,
  title,
  button,
  width,
  iconName,
  right,
  height,
  iconType,
  iconColor,
  fontSize,
  margin
}) => {
  return (
    <View>
      {button == "outline" ? (
        <Button
          onPress={onPress}
          title={title}
          type="outline"
          buttonStyle={{
            width: width ? width : hp("30%"),
            height: height ? height : hp("7%"),
            right: right,
            alignSelf: "center",
            borderRadius: 10,
            borderWidth: 3,
            borderColor: Colors.secondary,
          }}
          titleStyle={[
            styles.titleStyle,
            { color: Colors.secondary, fontSize: fontSize ? fontSize : 22 },
          ]}
          icon={
            <Icon
              name={iconName}
              size={15}
              color={Colors.textColor}
              style={{ paddingRight: 5 }}
            />
          }
        />
      ) : (
        <Button
          onPress={onPress}
          title={title}
          buttonStyle={{
            width: width ? width : hp("30%"),
            height: height ? height : hp("7%"),
            margin: margin? margin: 0,
            right: right,
            
            alignSelf: "center",
            borderRadius: 10,
            backgroundColor: Colors.secondary,
          }}
          titleStyle={[
            styles.titleStyle,
            { fontSize: fontSize ? fontSize : 22 },
          ]}
          icon={
            <Icon
              name={iconName}
              size={15}
              color={Colors.textColor}
              style={{ paddingRight: 5 }}
            />
          }
        />
      )}
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  titleStyle: {
    // fontSize: 22,
    fontWeight: "bold",
    color: Colors.background,
  },
});
