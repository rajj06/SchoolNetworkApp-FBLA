/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { async } from "@firebase/util";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-elements/dist/helpers";
import { colors } from "react-native-elements";

const GradesScreen = ({ navigation, route }) => {
  const { value, title } = route.params;
  console.log(value);
  const [term, setTerm] = useState("");
  const [teacher, setTeacher] = useState({});
  const [selectedClass, setSelectedClass] = useState();
  const [numTextInputs, setNumTextInputs] = useState(0);
  const [b, setB] = useState([]);
  const [students, setStudents] = useState([]);
  const [grade, setGrade] = useState({});
  const [loading, setLoading] = useState(false);
  const getClassSubjects = () => {
    const dbref = doc(db, value, "Subjects");
    getDoc(dbref).then((doc) => {
      const d = Object.values(doc.data());
      setB(d[0]);
      // setSubject()
      console.log(b);
    });
  };
  useEffect(() => {
    getStudentsInClass();
    getClassSubjects();
  }, []);

  const deleteField = (index) => {
    if (index <= b.length) {
      setNumTextInputs((val) => val - (index - (index - 1)));
    }
  };

  const getStudentsInClass = () => {
    const dbref = collection(db, "Students");
    const q = query(dbref, where("className", "==", value));
    getDocs(q).then((docsnap) => {
      docsnap.docs.map((doc) => {
        const d = [];
        d.push(doc.data());
        setStudents(d);
      });
    });
  };
  const onChangeText = (index, text) => {
    setTeacher((values) => ({
      ...values,
      [index]: text,
    }));
  };
  const onChangeGrade = (index, text) => {
    setGrade((values) => ({
      ...values,
      [index]: text,
    }));
  };
  const submitGrades = () => {
    if (term == "") {
      setLoading(false);
      return alert("Enter A Term");
    } else if (selectedClass == undefined || "") {
      return alert("Select A Student Please");
    } else {
      const finalArray = b.map((item, idx) => {
        return item + " " + grade[idx] + " ";
      });
      console.log(finalArray);
      const collectionName = "Results" + value;
      const dbref = collection(db, collectionName);
      addDoc(dbref, {
        term,
        studentId: selectedClass,
        results: finalArray,
      }).then(() => {
        setLoading(false);
        alert("Results Posted");
      });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          style={[styles.Image, { alignSelf: "center" }]}
          source={require("../../../assets/images/logo.png")}
        />
        <Text style={[styles.textStyle, { textAlign: "center", fontSize: 15 }]}>
          These Courses Are Pre Stored For {title} You Can't Change Or Modify
        </Text>
        <TextInput
          placeholder={"Differentiate Results Into i.e, Test FinalTerm MidTerm"}
          style={[
            styles.textInputStl,
            {
              alignSelf: "center",
              width: wp("90%"),
              margin: 10,
              marginBottom: 20,
            },
          ]}
          value={term}
          onChangeText={(value) => setTerm(value)}
        />
        {!students && Alert.alert("Students Not Found Please Try Again")}
        {students && (
          <View
            style={{
              overflow: "hidden",
              borderRadius: 16,
              width: wp("95%"),
              height: hp("12%"),
              alignSelf: "center",
              borderColor: Colors.secondary,
            }}
          >
            <Picker
              selectedValue={selectedClass}
              style={{
                marginTop: 10,
                height: hp("7%"),
                backgroundColor: Colors.secondary,
                borderWidth: 1,
              }}
              placeholder={"Please Select A Class First"}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedClass(itemValue)
              }
              mode={"dropdown"}
            >
              <Picker.Item label="Select A Student" value="" />
              {students.map((item) => {
                console.log(item);
                return (
                  <Picker.Item
                    label={item.fullName}
                    key={item.uid}
                    value={item.uid}
                  />
                );
              })}
            </Picker>
          </View>
        )}

        <View style={styles.textInputMainView}>
          {loading && (
            <ActivityIndicator color={Colors.secondary} size={"large"} />
          )}
          <ScrollView style={{ flex: 1 }}>
            {[...Array(numTextInputs).keys()].map((key, index) => {
              const ind = b[index];
              return (
                <View
                  style={{
                    height: hp("15%"),
                    flexDirection: "row",
                    width: wp("100%"),
                    paddingTop: 10,
                    justifyContent: "space-evenly",
                  }}
                >
                  <TextInput
                    placeholder={"Subject Name"}
                    style={[styles.textInputStl, { color: "black" }]}
                    value={ind}
                    editable={false}
                  />
                  <TextInput
                    placeholder={"Grade"}
                    style={styles.textInputStl}
                    onChangeText={(value) => onChangeGrade(index, value)}
                  />
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingBottom: hp("8%"),
              top: hp("2%"),
              width: wp("100%"),
            }}
          >
            <PrimaryButton
              button={"Solid"}
              onPress={() => {
                const val = numTextInputs + 1;
                if (val > b.length) {
                  alert("Courses Not Found Please Upload Courses First!");
                } else {
                  setNumTextInputs((numTextInputs) => numTextInputs + 1);
                }
              }}
              title="Add Grades"
              width={wp("40")}
            />
            <PrimaryButton
              button={"outline"}
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "This Will Only Delete Last Field",
                  [
                    {
                      text: "Okay",
                      onPress: () => {
                        if (numTextInputs == 0) {
                          return alert("You Reached End");
                        } else {
                          deleteField(numTextInputs);
                        }
                      },
                      style: "yes",
                    },
                    { text: "No" },
                  ],
                  { cancelable: false }
                );
              }}
              title="Delete"
              width={wp("40")}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ bottom: hp("2%") }}>
        <PrimaryButton
          title={"Post Grades"}
          iconColor={Colors.background}
          onPress={() => {
            Alert.alert(
              "Upload Grades",
              "These Grades Will Be Submitted",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    setLoading(true);
                    submitGrades();
                  },
                  style: "yes",
                },
                { text: "No" },
              ],
              { cancelable: false }
            );
          }}
        />
      </View>
    </View>
  );
};

export default GradesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    overflow: "hidden",
  },
  subView: {
    alignItems: "center",
    flexDirection: "row",
    width: wp("100%"),
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignContent: "center",
  },
  textInputStl: {
    width: wp("45%"),
    borderWidth: 2,
    padding: 5,
    borderColor: Colors.secondary,
    borderRadius: 16,
    height: hp("7%"),
  },

  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
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
