/** @format */
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";

import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../assets/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import PrimaryButton from "../../Components/PrimaryButton";
const StudentEvents = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const eventData = async () => {
      const querySnapshot = await getDocs(collection(db, "eventDB"));
      const data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
      });
      setData(data);
    };
    eventData();
  }, []);

  const RenderItem = ({ item }) => {
    return (
      <View style={{ width: wp("90%"), height: hp("40%") }}>
        <View style={styles.coursesView}>
          <Text style={[styles.textStyle, { alignSelf: "center" }]}>Event</Text>
          <Text style={styles.textStyle}>Event Date : {item.eventDate}</Text>
          <Text style={styles.textStyle}>
            Event Description : {item.eventDescription}
          </Text>
        </View>
      </View>
    );
  };
  const KeyExtractor = (item) => {
    return item.eventDescription;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Today's Events</Text>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={KeyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StudentEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  coursesView: {
    top: hp("3%"),
    height: hp("30%"),
    borderRadius: 10,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
    justifyContent: "space-evenly",
    backgroundColor: Colors.background,
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
/*

      {
        student.map((ele)=>{
          return(
            <View style={{height:hp('80%'),width:wp('90%')}}>
              <View style={{ top: hp("3%") }}>
              <Text style={styles.textStyle}>Student ID: {ele.id}</Text>
              <Text style={styles.textStyle}>Student Name: {ele.name}</Text>
              <View style={styles.coursesView}>
              <Text style={[styles.textStyle,{alignSelf:'center'}]}>Courses</Text>
              <Text style={styles.textStyle}>{ele.Courses.Computer}</Text>
              <Text style={styles.textStyle}>{ele.Courses.Maths}</Text>
              <Text style={styles.textStyle}>{ele.Courses.Urdu}</Text>
              <Text style={styles.textStyle}>{ele.Courses.Eng}</Text>
        </View>
        <View style={styles.coursesView}>
              <Text style={[styles.textStyle,{alignSelf:'center'}]}>Grades</Text>
              <Text style={styles.textStyle}>{ele.Courses.Computer} : {ele.Grades.Computer}</Text>
              <Text style={styles.textStyle}>{ele.Courses.Maths} : {ele.Grades.Maths}</Text>
              <Text style={styles.textStyle}>{ele.Courses.Urdu} : {ele.Grades.Urdu}</Text>
              <Text style={styles.textStyle}>{ele.Courses.Eng} : {ele.Grades.Eng}</Text>
        </View> 
        <View style={{ top: hp("5%") }}>
          <PrimaryButton
          height={hp('10%')}
            title={"Close"}
            iconColor={Colors.background}
            onPress={() => navigation.navigate("StudentInfo")}
          />
        </View> 
        </View> 
       </View>
          )
        })
      }
*/
