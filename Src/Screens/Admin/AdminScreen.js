/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import PrimaryButton from "../../Components/PrimaryButton";
import { Colors } from "../../../assets/theme";
import { signOut } from "firebase/auth";
// import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [data, setData] = useState("");
  console.log("user =", user);
  useEffect(() => {
    const profileData = async () => {
      const docRef = doc(db, "SchoolFaculty", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setData(docSnap.data());
        console.log(data);
        AsyncStorage.setItem("adminName", docSnap.data().fullName).then(() => {
          setUser(docSnap.data().fullName);
        });
      }
    };
    profileData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Entypo
            name="log-out"
            size={30}
            color={Colors.secondary}
            onPress={() => decide()}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const decide = () => {
    Alert.alert(
      "Log Out",
      "Are You Sure!",
      [
        {
          text: "Yes",
          onPress: () => logOut(),
          style: "yes",
        },
        { text: "No" },
      ],
      { cancelable: false }
    );
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        AsyncStorage.removeItem("userType").then(() => {
          navigation.replace("WelcomeScreen");
          ToastAndroid.show("Logged Out", ToastAndroid.SHORT);
        });
      })
      .catch((error) => {});
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: wp("90"),
          height: hp("5%"),
          bottom: hp("6%"),
        }}
      >
        {user ? (
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: Colors.secondary,
              alignSelf: "center",
            }}
          >
            Welcome {user.substring(0, 20)}!
          </Text>
        ) : (
          <View>
            <ActivityIndicator size={"small"} color={Colors.secondary} />
          </View>
        )}
      </View>
      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />
      {user && (
        <View style={styles.secondView}>
          <View style={styles.subView}>
            <PrimaryButton
              title={"Event"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              iconColor={Colors.background}
              onPress={() => navigation.navigate("EventScreen")}
            />

            <PrimaryButton
              title={"Send Photos"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              button={"outline"}
              iconColor={Colors.background}
              onPress={() =>
                navigation.navigate("SendPhotos", {
                  data,
                })
              }
            />
          </View>
          <View style={[styles.subView, { top: hp("5%") }]}>
            <PrimaryButton
              title={"Groups"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              button={"outline"}
              iconColor={Colors.background}
              onPress={() => navigation.navigate("Groups")}
            />
            <PrimaryButton
              title={"Student Info"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              iconColor={Colors.background}
              onPress={() => navigation.navigate("StudentInfo")}
            />
          </View>
          <View style={[styles.subView, { top: hp("8%") }]}>
            <PrimaryButton
              title={"Parent Teacher Communication"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              // button={"outline"}
              iconColor={Colors.background}
              onPress={() =>
                navigation.navigate("RecievedCommunication", {
                  mydata: data,
                })
              }
            />

            <PrimaryButton
              title={"Courses"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              button={"outline"}
              iconColor={Colors.background}
              onPress={() => navigation.navigate("CoursesScreen")}
            />
          </View>
          <View style={[styles.subView, { top: hp("10%") }]}>
            <PrimaryButton
              title={"Grades"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              button={"outline"}
              iconColor={Colors.background}
              onPress={() => navigation.navigate("GradesSelectClass")}
            />
            <PrimaryButton
              title={"Uploaded Images"}
              height={hp("12%")}
              width={wp("45%")}
              fontSize={22}
              iconColor={Colors.background}
              onPress={() => navigation.navigate("UploadedImages")}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  secondView: {
    bottom: hp("7%"),
  },
  Image: {
    width: 150,
    height: 100,
    bottom: hp("5%"),
  },
  subView: {
    flexDirection: "row",
    top: hp("2%"),
    justifyContent: "space-evenly",
    width: wp("100%"),
  },
});
