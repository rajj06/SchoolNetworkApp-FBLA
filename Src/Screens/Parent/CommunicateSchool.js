/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { getAdditionalUserInfo } from "firebase/auth";
const CommunicateScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const id = auth.currentUser.uid;
    setUserId(id);
    getUserDetails();
    console.log(userId);
  }, [userId]);

  const getUserDetails = () => {
    // const id= auth.currentUser.uid;
    //   setUserId(id)
    //   console.log(userId)
    const docref = collection(db, "Parents");
    getDocs(query(docref, where("uid", "==", userId))).then((docsnap) => {
      docsnap.docs.map((doc) => {
        console.log(doc.data());
        setName(doc.data().fullName);
        setStudentName(doc.data().studentName);
        console.log("student" + studentName + " " + name);
      });
    });
  };

  const sendMessage = async () => {
    if (name) {
      const date = new Date().toDateString();
      console.log(date);
      addDoc(collection(db, "ParentTeacherCommunication"), {
        message,
        sendDate: date,
        recievedDate: "",
        recieverName: "",
        reply: "",
        status: "unread",
        parentName: name,
        parentId: userId,
      }).then(() => {
        setLoading(false);
        setMessage("");
        ToastAndroid.show("Message Sent", ToastAndroid.SHORT);
      });
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />

      <View style={styles.textInputMainView}>
        {loading && (
          <ActivityIndicator size={"small"} color={Colors.secondary} />
        )}
        <View style={[styles.inputView, { top: hp("3%") }]}>
          <TextInputCom
            numLines={5}
            multiline={true}
            text={"Message"}
            placeholder={"Enter Your Message"}
            borderWidth={2}
            padding={5}
            height={hp("12%")}
            textAlignVertical={"top"}
            borderRadius={16}
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
        </View>

        <View style={{ top: hp("8%") }}>
          <PrimaryButton
            title={"Send"}
            iconColor={Colors.background}
            onPress={() => {
              setLoading(true);
              sendMessage();
            }}
          />

          <View
            style={{
              top: hp("2%"),
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RecievedCommunication");
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: 20, color: Colors.secondary },
                ]}
              >
                View Recieved Response
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommunicateScreen;

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
