/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [myemailadresss, setMyEmailAdress] = useState("");
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.replace("AdminStack");
  //     }
  //   });
  // }, []);
  const forgetPassword = () => {
    if (email != "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert("Password Reset Email has been Sent  Successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      Alert.alert("Please Enter a Email Address to Forget a Password");
    }
  };
  const login = async () => {
    // setIsLoading(true);
    console.log(email);
    if (email != "" && password != "") {
      try {
        const docref = collection(db, "SchoolFaculty");
        const q = query(
          docref,
          where("email", "==", email.toLocaleLowerCase())
        );
        getDocs(q).then((snap) => {
          const l = snap.docs.map((doc) => {
            console.log(doc.data());
          }).length;
          console.log(l);
          if (l == 1) {
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                AsyncStorage.setItem("userType", "Admin");
              })
              .catch((error) => {
                alert("Wrong Email Or Password");
              });
          } else {
            alert("No Registered User With Given Email");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Please Enter Email and Password");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ bottom: hp("10%") }}>
        <Text style={[styles.textStyle, { fontSize: 30, alignSelf: "center" }]}>
          Admin
        </Text>
      </View>
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
            secureTextEntry={true}
            borderRadius={16}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <TouchableOpacity onPress={() => forgetPassword()}>
          <Text
            style={{ bottom: hp("1.5%"), fontWeight: "bold", color: "#0b37d6" }}
          >
            Forget Password
          </Text>
        </TouchableOpacity>
        <View style={{ top: hp("3%") }}>
          {/* {isLoading ? ( */}
          <PrimaryButton
            title={"Sign In"}
            iconColor={Colors.background}
            onPress={() => {
              login();
            }}
          />
          {/* // ) : (
          //   <ActivityIndicator size="large" color={Colors.secondary} />
          // )} */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              top: hp("3%"),
            }}
          >
            <Text style={[styles.textStyle, { fontSize: 15 }]}>
              Not Registered ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AdminSignUpScreen");
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: 15, color: Colors.secondary },
                ]}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminLoginScreen;

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
  titleText: {
    fontSize: 30,
    alignSelf: "center",
    color: Colors.secondary,
    margin: 10,
    justifyContent: "center",

    fontWeight: "bold",
  },
});
