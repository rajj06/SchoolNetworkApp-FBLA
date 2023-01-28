/** @format */

import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import { collection, addDoc } from "firebase/firestore";
const EventScreen = ({ navigation }) => {
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const submitEvent = async () => {
    if (eventDate != "" && eventDescription != "") {
      const docRef = await addDoc(collection(db, "eventDB"), {
        uid: auth.currentUser.uid,
        eventDate,
        eventDescription,
      });
      console.log("data", docRef);
      alert("Your Event Successfully Submitted");
      navigation.replace("AdminStack");
    } else {
      Alert.alert("Please Provide all Data");
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />

      <View style={styles.textInputMainView}>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Event Date"}
            placeholder={"01/01/2023"}
            borderWidth={2}
            borderRadius={16}
            value={eventDate}
            onChangeText={(value) => setEventDate(value)}
          />
        </View>

        <View style={[styles.inputView, { top: hp("3%") }]}>
          <TextInputCom
            text={"Event Description"}
            placeholder={"Describe Your Event"}
            borderWidth={2}
            padding={5}
            height={hp("16%")}
            textAlignVertical={"top"}
            borderRadius={16}
            value={eventDescription}
            onChangeText={(value) => setEventDescription(value)}
          />
        </View>

        <View style={{ top: hp("8%") }}>
          <PrimaryButton
            title={"Post"}
            iconColor={Colors.background}
            onPress={() => submitEvent()}
            // onPress={()=>{navigation.navigate('AdminScreen')}}
          />
        </View>
      </View>
    </View>
  );
};

export default EventScreen;

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
    bottom: hp("10%"),
  },

  inputView: {
    width: wp("100%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 250,
    height: 150,
    bottom: hp("20%"),
  },
});
