/** @format */

import { FlatList, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../assets/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
const GroupDetailScreen = ({ navigation, route }) => {
  const Data = [
    {
      id: 1,
      name: "Science Group",
      checked: false,
      Grades: {
        Eng: "A",
        Maths: "B",
        Urdu: "B",
        Computer: "A",
      },
      Courses: {
        Eng: "Eng",
        Maths: "Maths",
        Urdu: "Urdu",
        Computer: "Computer",
      },
    },
    {
      id: 2,
      Grades: {
        Eng: "A",
        Maths: "B",
        Urdu: "B",
        Computer: "A",
      },
      Courses: {
        Eng: "Eng",
        Maths: "Maths",
        Urdu: "Urdu",
        Computer: "Computer",
      },
      name: "Saqib",
      checked: false,
    },
    {
      id: 3,
      name: "Ali",
      checked: false,
      Grades: {
        Eng: "A",
        Maths: "B",
        Urdu: "B",
        Computer: "A",
      },
      Courses: {
        Eng: "Eng",
        Maths: "Maths",
        Urdu: "Urdu",
        Computer: "Computer",
      },
    },
    {
      id: 4,
      name: "Ahmed",
      checked: false,
      Grades: {
        Eng: "A",
        Maths: "B",
        Urdu: "B",
        Physics: "A",
        Chem: "A",
        Bio: "B",
        Arts: "B",
        Computer: "A",
      },
      Courses: {
        Eng: "Eng",
        Maths: "Maths",
        Urdu: "Urdu",
        Computer: "Computer",
        Physics: "Physics",
        Chem: "Chem",
        Bio: "Bio",
        Arts: "Arts",
      },
    },
  ];
  const[groupName,setGroupName]=useState('')
  const[search,setSearch]=useState('')
  const[adminName,setAdminName]=useState('')
  const[subject,setSubject]=useState('')
  const [selectedClass, setSelectedClass] = useState();
  const[GroupDescription,setGroupDescription]=useState('')
  const[showButton,setShowButton]=useState(false)
 useEffect(()=>{
  AsyncStorage.getItem('adminName').then((val)=>{
    setAdminName(val)
  })
 },[])
 const createGroup=()=>{
  if(groupName==""){return alert("Group Name Cannot Be Null")}
  else if(subject==''){return alert("Subject Name Must Be Entered")}
  else if(GroupDescription==''){return alert("Description Must Be Entered")}
  else {
    const clasName= "class"+selectedClass
    const dbref= doc(db,"Groups",groupName)
    const adminId= auth.currentUser.uid
    setDoc(dbref,{
      groupName,
      GroupDescription,
      adminName,
      subject,
      adminId,
      students: [],
      messages:[]
    }).then(()=>{
      ToastAndroid.show("Created Successfully",ToastAndroid.SHORT)
      setShowButton(true)
    })
  }
 
 }

  return (
    <View style={styles.container}>
          {/* <View>
          <Text style={styles.titleText}>Group Detail</Text>
          </View> */}
          <View >

    <View style={styles.textInputMainView}>
    <View>
          <Text style={styles.titleText}>Group Detail</Text>
          </View>
    
      <View style={styles.inputView}>
        <TextInputCom
          text={"Group Name"}
          placeholder={"Enter The Group Name"}
          borderWidth={2}
          borderRadius={16}
          value={groupName}
          onChangeText={(value) => setGroupName(value)}
        />
      </View>
      <View style={[styles.inputView, { top: hp("3%") }]}>
        <TextInputCom
          text={"Subject Name"}
          placeholder={"Enter Subject Name"}
          borderWidth={2}
          padding={5}
          textAlignVertical={"top"}
          borderRadius={16}
          value={subject}
          onChangeText={(value) => setSubject(value)}
        />
      </View>
      <View style={[styles.inputView, { top: hp("3%") }]}>
        <TextInputCom
          text={"Description"}
          placeholder={"Add A Short Description"}
          borderWidth={2}
          padding={5}
          height={hp("16%")}
          textAlignVertical={"top"}
          borderRadius={16}
          value={GroupDescription}
          onChangeText={(value) => setGroupDescription(value)}
        />
      </View>

      <View style={{ top: hp("8%"),width:wp('80%'),justifyContent:'space-between',flexDirection:'row' }}>
        <PrimaryButton
          title={"Create"}
          width={wp('35%')}
          iconColor={Colors.background}
          onPress={() => createGroup()}
          // onPress={()=>{navigation.navigate('AdminScreen')}}
        />
         <PrimaryButton
          title={"Close"}
          width={wp('35%')}
          iconColor={Colors.background}
          onPress={() => {navigation.goBack()}}
          // onPress={()=>{navigation.navigate('AdminScreen')}}
        />
      </View>
    { showButton && 
<View style={{ top: hp("12%") }}>

  <PrimaryButton
        title={"View Groups"}
        width={wp('50%')}
        iconColor={Colors.background}
        onPress={() => {navigation.goBack()}}
        // onPress={()=>{navigation.navigate('AdminScreen')}}
      />
</View>
        }
    </View>
          </View>
        </View>
  );
};

export default GroupDetailScreen;

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