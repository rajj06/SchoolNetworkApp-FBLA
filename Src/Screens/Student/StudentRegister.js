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
  SafeAreaView,
  Platform,
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
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
// import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Classes from "../Admin/ClassesArray";
const StudentSignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedClass, setSelectedClass] = useState();

  const signup = async () => {
    const auth = getAuth();
    // setIsLoading(true);
    if (
      email != "" &&
      password != "" &&
      fullName != "" &&
      guardianName != "" &&
      confirmPassword != "" &&
      selectedClass !== ""
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          AsyncStorage.setItem("userType", "Student").then(() => {
            console.log("here i'm", userCredential.user.uid);

            setDoc(
              doc(db, "Students", "" + userCredential.user.uid),

              {
                uid: userCredential.user.uid,
                guardianName,
                fullName,
                email: email.toLowerCase(),
                className: selectedClass,
              }
            );
            alert("Your Account Successfully Created");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    } else {
      alert("Sorry, Please Enter All Data");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ bottom: hp("38%") }}>
          <Text
            style={[styles.textStyle, { fontSize: 30, alignSelf: "center" }]}
          >
            Student
          </Text>
          <Text style={[styles.textStyle, { fontSize: 25 }]}>
            Create Account
          </Text>
        </View>

        <View style={styles.textInputMainView}>
          <View style={styles.inputView}>
            <TextInputCom
              text={"Student Name"}
              placeholder={"Enter Your Name"}
              borderWidth={2}
              borderRadius={16}
              value={fullName}
              onChangeText={(value) => setFullName(value)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInputCom
              text={"Parent/Guardian Name"}
              placeholder={"Please Enter Your Father/Guardian Name"}
              borderWidth={2}
              borderRadius={16}
              value={guardianName}
              onChangeText={(value) => setGuardianName(value)}
            />
          </View>
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

          {Platform.IOS === "ios" ? (
            <View
              style={{
                top: hp("3%"),
                bottom: hp("3%"),
                height: hp("6%"),
                paddingBottom: hp("5%"),
              }}
            >
              <Text style={[styles.textStyle, { fontSize: 16 }]}>Class</Text>
              <View
                style={{
                  overflow: "hidden",
                  borderRadius: 16,
                  width: wp("80%"),
                  borderWidth: 2,
                  borderColor: Colors.secondary,
                  top: hp("1%"),
                  bottom: hp("3%"),

                  //  backgroundColor:'grey'
                }}
              >
                <Picker
                  selectedValue={selectedClass}
                  placeholder={"Please Select A Class First"}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedClass(itemValue)
                  }
                  mode={"dialog"}
                >
                  <Picker.Item label="Select Your Class" value="" />

                  {Classes.map((item) => {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.value}
                        key={item.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          ) : (
            <View
              style={{
                top: hp("3%"),
                bottom: hp("3%"),
                height: hp("12%"),
              }}
            >
              <Text style={[styles.textStyle, { fontSize: 16 }]}>Class</Text>
              <View
                style={{
                  overflow: "hidden",
                  borderRadius: 16,
                  width: wp("80%"),
                  borderWidth: 2,
                  borderColor: Colors.secondary,
                  top: hp("1%"),
                  bottom: hp("3%"),
                  height: hp("7%"),
                  //  backgroundColor:'grey'
                }}
              >
                <Picker
                  selectedValue={selectedClass}
                  placeholder={"Please Select A Class First"}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedClass(itemValue)
                  }
                  mode={"dialog"}
                >
                  <Picker.Item label="Select Your Class" value="" />

                  {Classes.map((item) => {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.value}
                        key={item.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          )}

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
    </SafeAreaView>
  );
};

export default StudentSignUpScreen;

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
    bottom: hp("5%"),
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
