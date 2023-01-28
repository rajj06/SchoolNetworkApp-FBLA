/** @format */

import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Welcome To</Text>
      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />
      <View>
        <PrimaryButton
          title={"Admin Account"}
          iconColor={Colors.background}
          onPress={() => navigation.navigate("AdminStack")}
        />
      </View>
      <Text style={{ top: "1.5%", fontSize: 20, fontWeight: "bold" }}>OR</Text>
      <View style={{ top: hp("3%") }}>
        <PrimaryButton
          button={"outline"}
          title={"Student Account"}
          iconColor={Colors.background}
          onPress={() => navigation.navigate("StudentStack")}
        />
      </View>
      <Text style={{ top: "3.5%", fontSize: 20, fontWeight: "bold" }}>OR</Text>
      <View style={{ top: hp("5%") }}>
        <PrimaryButton
          title={"Parent Account"}
          iconColor={Colors.background}
          onPress={() => navigation.navigate("ParentStack")}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  Image: {
    width: wp("50%"),
    height: hp("30%"),
  },
  textStyle: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
