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
const ParentScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [StudentName, setStudentName] = useState("");
  console.log("user =", user);
  useEffect(() => {
    const profileData = async () => {
      const docRef = doc(db, "Parents", auth.currentUser.uid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data().fullName);
        setStudentName(docSnap.data().studentName);
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
          height: hp("4%"),
        }}
      >
        {user ? (
          <Text
            style={{
              fontSize: 25,
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
          <View
            style={{
              flexDirection: "row",
              width: wp("90%"),
              justifyContent: "space-between",
              top: hp("1%"),
            }}
          >
            <PrimaryButton
              title={"School Events"}
              height={hp("20%")}
              width={wp("40%")}
              fontSize={22}
              iconColor={Colors.background}
              onPress={() => navigation.navigate("StudentEvents")}
            />

            <PrimaryButton
              title={"Student Details"}
              height={hp("20%")}
              width={wp("40%")}
              fontSize={22}
              button={"outline"}
              iconColor={Colors.background}
              onPress={() =>
                navigation.navigate("StudentDetailsForm", {
                  StudentName,
                  user,
                })
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: wp("90%"),
              justifyContent: "space-between",
              top: hp("5%"),
            }}
          >
            <View>
              <PrimaryButton
                title={"Parent Teacher Communication"}
                height={hp("20%")}
                width={wp("40%")}
                button={"outline"}
                fontSize={22}
                iconColor={Colors.background}
                onPress={() => navigation.navigate("CommunicateScreen")}
              />
            </View>
            <View>
              <PrimaryButton
                title={"Check Photos"}
                height={hp("20%")}
                width={wp("40%")}
                fontSize={22}
                iconColor={Colors.background}
                onPress={() => navigation.navigate("RecievedImages")}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ParentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  secondView: {
    height: hp("50%"),
    justifyContent: "space-evenly",
    padding: 5,
  },
  Image: {
    margin: 10,
    width: 150,
    height: 100,
  },
});
