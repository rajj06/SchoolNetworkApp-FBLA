/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
// import { auth } from "../../../firebase";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   const handleSignup = async () => {
  //   try {
  //     if (fullName.length > 0 && userName.length > 0) {
  //       const response = await auth().createUserWithEmailAndPassword(
  //         fullName,
  //         userName,
  //       );

  //       const userData = {
  //         id: response.user.uid,
  //         fullName: fullName,
  //         userName: userName,
  //       };

  //       await firestore()
  //         .collection('users')
  //         .doc(response.user.uid)
  //         .set(userData);

  //       // await auth().currentUser.sendEmailVerification();

  //       await auth().signOut();

  //       alert('Please Verify YOur Email Check Out Link In Your Inbox');

  //       navigation.navigate('MainStack');
  //     } else {
  //       alert('Please Enter All Data');
  //     }
  //   } catch (err) {
  //     console.log(err);

  //     // setMessage(err.message);
  //   }
  // };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password, fullName, userName)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <View style={{ bottom: hp("25%") }}>
        <Text style={[styles.textStyle, { fontSize: 25 }]}>Create Account</Text>
      </View>

      <View style={styles.textInputMainView}>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Full Name"}
            placeholder={"Muhammad Saqib Naeem"}
            borderWidth={2}
            borderRadius={16}
            value={fullName}
            onChangeText={(value) => setFullName(value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputCom
            text={"UserName"}
            placeholder={"@saqibnaeem"}
            borderWidth={2}
            borderRadius={16}
            value={userName}
            onChangeText={(value) => setUserName(value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Email Address"}
            placeholder={"xyz@gamail.com"}
            borderWidth={2}
            borderRadius={16}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Password"}
            placeholder={"*******"}
            borderWidth={2}
            borderRadius={16}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInputCom
            text={"Confirm Password"}
            placeholder={"*******"}
            borderWidth={2}
            borderRadius={16}
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </View>

        <View style={{ top: hp("5%") }}>
          <PrimaryButton
            title={"Sign Up"}
            iconColor={Colors.background}
            onPress={handleSignUp}
            // onPress={() => navigation.navigate("LoginScreen")}
          />
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    width: wp("100%"),
    top: hp("3%"),
    bottom: hp("3%"),
    height: hp("12%"),
    justifyContent: "center",
    alignItems: "center",
  },
});
