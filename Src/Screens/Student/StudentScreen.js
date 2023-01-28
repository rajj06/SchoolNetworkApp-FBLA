/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
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
const StudentScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [ClassName, setClassName] = useState(null);
  console.log("user =", user);
  useEffect(() => {
    const profileData = async () => {
      const docRef = doc(db, "Students", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data().fullName);
        const studentclass = docSnap.data().className;
        setClassName(docSnap.data().className);
        AsyncStorage.setItem("studentclass", studentclass).then(() => {
          AsyncStorage.setItem("studentName", docSnap.data().fullName);
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
          height: hp("4%"),
          marginHorizontal: 10,
          margin: 10,
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.secondView}>
            <View
              style={{
                flexDirection: "row",
                elevation: 10,
                width: wp("90%"),
                justifyContent: "space-between",
                top: hp("1%"),
              }}
            >
              <View>
                <PrimaryButton
                  title={"Today's Events"}
                  height={hp("20%")}
                  width={wp("40%")}
                  fontSize={22}
                  iconColor={Colors.background}
                  onPress={() => navigation.navigate("StudentEvents")}
                />
              </View>
              <View>
                <PrimaryButton
                  title={"Send Photos"}
                  height={hp("20%")}
                  width={wp("40%")}
                  fontSize={22}
                  button={"outline"}
                  iconColor={Colors.background}
                  onPress={() => navigation.navigate("SendPhotosScreen")}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: wp("90%"),
                justifyContent: "space-between",
                top: hp("3%"),
              }}
            >
              <View>
                <PrimaryButton
                  title={"Groups"}
                  height={hp("20%")}
                  width={wp("40%")}
                  fontSize={22}
                  button={"outline"}
                  iconColor={Colors.background}
                  onPress={() =>
                    navigation.navigate("JoinGroups", {
                      ClassName,
                      user,
                    })
                  }
                />
              </View>
              <View>
                <PrimaryButton
                  title={"My Info"}
                  height={hp("20%")}
                  width={wp("40%")}
                  fontSize={22}
                  iconColor={Colors.background}
                  onPress={() =>
                    navigation.navigate("StudentDetailsForm", {
                      ClassName,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  secondView: {
    height: hp("60%"),
    justifyContent: "space-evenly",
    padding: 5,
  },
  Image: {
    margin: 10,
    width: 150,
    height: 100,
  },
});
