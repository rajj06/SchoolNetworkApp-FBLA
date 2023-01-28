/** @format */

import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />
      <View style={{ bottom: hp("8%") }}>
        <Text style={styles.textStyle}>Sign In</Text>
      </View>
      <View style={styles.textInputMainView}>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Email Address"}
            placeholder={"xyz@gamail.com"}
            borderWidth={2}
            borderRadius={16}
            // value={fullName}
            // onChangeText={(value) => setFullName(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInputCom
            text={"Password"}
            placeholder={"*******"}
            borderWidth={2}
            borderRadius={16}
            // value={userName}
            // onChangeText={(value) => setUserName(value)}
          />
        </View>

        <View style={{ top: hp("3%") }}>
          <PrimaryButton
            title={"Sign In"}
            iconColor={Colors.background}
            onPress={() => navigation.navigate("AdminStack")}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  textInputMainView: {
    width: wp("88%"),
    height: hp("30%"),
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    width: wp("100%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 180,
    height: 120,
    bottom: hp("10%"),
  },
});
