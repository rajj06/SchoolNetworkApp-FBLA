/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
// import { firebase } from "../../../firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";
// import { getAuth, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../../firebase.config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
// import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AdminSignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const signup = async (email, password, userName, fullName) => {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       alert("User Register");
  //       // firebase
  //       //   .auth()
  //       //   .currentUser()
  //       //   .sendEmailVerification({
  //       //     handleCodeInApp: true,
  //       //     URL: "https://school-network-app.firebaseapp.com",
  //       //   })
  //       //   .then(() => {
  //       //     alert("Please Verify Your Email");
  //       //   })
  //       //   .catch((error) => {
  //       //     alert(error.message);
  //       //   })
  //       // .then(() => {
  //       //   firebase
  //       //     .fireStore()
  //       //     .collection("adminPannel")
  //       //     .doc(firebase.auth().currentUser.uid)
  //       //     .set({
  //       //       email,
  //       //       password,
  //       //       fullName,
  //       //       userName,
  //       //     });
  //       // });
  //     });
  // };
  const signup = async () => {
    const auth = getAuth();
    // setIsLoading(true);
    if (
      email != "" &&
      password != "" &&
      fullName != "" &&
      designation != "" &&
      confirmPassword != ""
    ) {
      // const docRef = await addDoc(collection(db, "schoolFaculty"), {
      //   email,
      //   password,
      //   userName,
      //   fullName,
      // });
      // console.log("Document written with ID: ", docRef.id);
      // sendEmailVerification(auth.currentUser).then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          AsyncStorage.setItem("userType", "Admin").then(() => {
            console.log("here i'm", userCredential.user.uid);
            setDoc(
              doc(db, "SchoolFaculty", "" + userCredential.user.uid),

              {
                uid: userCredential.user.uid,
                fullName,
                email: email.toLocaleLowerCase(),
                designation
              }
            );
            ToastAndroid.show('Your Account Successfully Created',ToastAndroid.SHORT)
         
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
      // Alert.alert("Email Sent");
      // });
    } else {
      alert("Sorry, Please Enter All Data");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ bottom: hp("30%") }}>
        <Text style={[styles.textStyle, { fontSize: 30, alignSelf: "center" }]}>
          School Faculty
        </Text>
        <Text style={[styles.textStyle, { fontSize: 25 }]}>Create Account</Text>
      </View>

      <View style={styles.textInputMainView}>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Full Name"}
            placeholder={"Enter Your Full Name"}
            borderWidth={2}
            borderRadius={16}
            value={fullName}
            onChangeText={(value) => setFullName(value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Designation"}
            placeholder={"Enter Your Designation"}
            borderWidth={2}
            borderRadius={16}
            value={designation}
            onChangeText={(value) => setDesignation(value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInputCom
            text={"Email Address"}
            placeholder={"Enter Your Email Address"}
            borderWidth={2}
            borderRadius={16}
            value={email}
            keyboardType={"email-address"}
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
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInputCom
            text={"Confirm Password"}
            placeholder={"*******"}
            borderWidth={2}
            borderRadius={16}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </View>

        <View style={{ top: hp("5%") }}>
          {/* {!isLoading ? ( */}
          <PrimaryButton
            title={"Sign Up"}
            iconColor={Colors.background}
            onPress={() => signup()}
            // onPress={() => navigation.navigate("LoginScreen")}
          />
          {/* // ) : (
          //   <ActivityIndicator size="large" color={Colors.secondary} />
          // )} */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              top: hp("1%"),
            }}
          >
            <Text style={[styles.textStyle, { fontSize: 15 }]}>
              Already Registered ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: 15, color: Colors.secondary },
                ]}
              >
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminSignUpScreen;

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
    height: hp("10%"),
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
  titleText: {
    fontSize: 30,
    alignSelf: "center",
    color: Colors.secondary,
    margin: 10,
    justifyContent: "center",

    fontWeight: "bold",
  },
});
