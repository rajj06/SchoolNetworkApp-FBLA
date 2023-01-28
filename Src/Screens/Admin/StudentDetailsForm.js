/** @format */

import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect,useState } from "react";
import { Colors } from "../../../assets/theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import PrimaryButton from "../../Components/PrimaryButton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase.config";
const StudentDetailsForm = ({navigation,route}) => {
  const{item}=route.params
  const[student,setStudent]=useState([])
  const data=[]
  console.log(item)
  const getStudents=()=>{
    const classname=item.value
    const dbref=collection(db,"Students")
    const q= query(dbref,where('className','==',classname))
    getDocs(q).then((docsnap)=>{docsnap.docs.map((doc)=>{
      console.log(doc.data())
      data.push(doc.data())
      setStudent(data)
    })})
  }
  useEffect(()=>{
    getStudents()
  },[])
   
    
  
const RenderItem=({item})=>{
    return(
        <View style={{width:wp('100%'),height:hp('50%'),alignItems:'center',borderWidth:1}}>
        <View style={{ top: hp("3%") }}>
          <View style={{margin:5,flexDirection:'column',justifyContent:'space-evenly'}}>
        <Text style={[styles.textStyle,{color:Colors.secondary}]}>Student Name:</Text>
        <Text  style={[styles.textStyle,{fontSize:30}]}> {item.fullName}</Text>
          </View>
          <View style={{margin:5,flexDirection:'column',justifyContent:'space-evenly'}}>
        <Text style={[styles.textStyle,{color:Colors.secondary}]}>Student Father/Guardian Name:</Text>
        <Text  style={[styles.textStyle,{fontSize:30}]}> {item.guardianName}</Text>
          </View>
          <View style={{margin:5,flexDirection:'column',justifyContent:'space-evenly'}}>
        <Text style={[styles.textStyle,{color:Colors.secondary}]}>Student Email:</Text>
        <Text  style={[styles.textStyle,{fontSize:30}]}> {item.email}</Text>
          </View>
          <View style={{margin:5,flexDirection:'column',justifyContent:'space-evenly'}}>
        <Text style={[styles.textStyle,{color:Colors.secondary}]}>Student Class:</Text>
        <Text  style={[styles.textStyle,{fontSize:30}]}> {item.className}</Text>
          </View>
  </View> 
 </View>
    )
}    
const KeyExtractor=(item)=>{return item.uid}
  return (
    
    <View style={styles.container}>



     
<Text style={styles.titleText}>Students BioData</Text>
{
 student && <FlatList
data={student}
renderItem={RenderItem}
keyExtractor={KeyExtractor}
showsVerticalScrollIndicator={false}
/>

}



    </View>
      
  );
};

export default StudentDetailsForm;

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
  coursesView:{
     top: hp("3%"),
      height:hp('30%'),
      borderRadius:10,
      padding:10,
      margin:5,
      borderWidth:1,
      borderColor: Colors.secondary,
      justifyContent:'space-evenly',
       backgroundColor: Colors.background
     },
     titleText:{
        fontSize:30,
        alignSelf:'center',
        color:Colors.secondary,
        margin:10,
        justifyContent: "center",
      
        fontWeight: "bold",
    }

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