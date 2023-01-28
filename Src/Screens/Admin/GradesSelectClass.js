/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { async } from "@firebase/util";
import { TouchableOpacity } from "react-native-gesture-handler";
import Classes from "./ClassesArray";

const GradesSelectClass = ({ navigation }) => {
  const [subject, setSubject] = useState({});
  const [teacher, setTeacher] = useState({});
  const [selectedClass, setSelectedClass] = useState();
  const [numTextInputs, setNumTextInputs] = useState(0);

  const Data = [
    {
      id: 0,
      name: "Kg",
      value: "classkg",
      mode: "",
    },
    {
      id: 1,
      name: "Somophore",
      value: "classOne",
      mode: "outline",
    },
    {
      id: 2,
      name: "Class Two",
      value: "classTwo",
      mode: "outline",
    },
    {
      id: 3,
      name: "Class Three",
      value: "classThree",
      mode: "",
    },
    {
      id: 4,
      name: "Class Four",
      value: "classFour",
      mode: "",
    },
    {
      id: 5,
      name: "Class Five",
      value: "classFive",
      mode: "outline",
    },
    {
      id: 6,
      name: "Class Six",
      value: "classSix",
      mode: "outline",
    },
    {
      id: 7,
      name: "Class Seven",
      value: "classSeven",
      mode: "",
    },
    {
      id: 8,
      name: "Class Eight",
      value: "classEight",
      mode: "",
    },
    {
      id: 9,
      name: "Class Nine",
      value: "classNinth",
      mode: "outline",
    },
    {
      id: 10,
      name: "Class Tenth",
      value: "classTenth",
      mode: "outline",
    },
    {
      id: 11,
      name: "Class First Year",
      value: "classFirstYear",
      mode: "",
    },
    {
      id: 12,
      name: "Class Second Year",
      value: "classSecondYear",
      mode: "",
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />
      <View style={{ padding: 10, margin: 5, alignSelf: "center" }}>
        <Text style={[styles.textStyle, { fontSize: 25, textAlign: "center" }]}>
          Please Select A Class
        </Text>
        <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={Classes}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.subView}>
                <PrimaryButton
                  button={item.mode}
                  onPress={() => {
                    navigation.navigate("GradesScreen", {
                      value: item.value,
                      title: item.name,
                    });
                  }}
                  title={item.name}
                  height={hp("20%")}
                  width={wp("40%")}
                />
              </View>
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
};

export default GradesSelectClass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    backgroundColor: Colors.background,
    overflow: "hidden",
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  subView: {
    margin: 5,
    top: hp("3%"),
    height: hp("20%"),
    justifyContent: "center",
    width: wp("40%"),
  },
  textInputStl: {
    width: wp("45%"),
    borderWidth: 2,
    padding: 5,
    borderColor: Colors.secondary,
    borderRadius: 16,
    height: hp("7%"),
  },

  textInputMainView: {
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    top: hp("3%"),
  },

  inputView: {
    width: wp("100%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 200,
    height: 120,
    top: hp("1%"),
  },
});
