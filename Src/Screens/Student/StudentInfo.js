/** @format */

import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View,Modal, ActivityIndicator } from "react-native";
import React, { useEffect,useState } from "react";
import { Colors } from "../../../assets/theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import PrimaryButton from "../../Components/PrimaryButton";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { setStatusBarBackgroundColor } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
const StudentDetailsForm = ({navigation,route}) => {
  const{ClassName}=route.params
  console.log(ClassName)
    const Data = [
        {
          id: 4,
          name: 'Ahmed',
          checked: false,
          Grades: {
            Eng: 'A',
            Maths: 'B',
            Urdu: 'B',
            Physics: 'A',
            Chem: 'A',
            Bio: 'B',
            Arts: 'B',
            Computer: 'A'
          },
          Courses: {
            Eng: 'Eng',
            Maths: 'Maths',
            Urdu: 'Urdu',
            Computer: 'Computer',
            Physics: 'Physics',
            Chem: 'Chem',
            Bio: 'Bio',
            Arts: 'Arts',
          },
        },
      ]
      const[data,setData]=useState([])
      const[studentclass,setStudentClass]=useState('')
      const[courses,setCourses]=useState('')
      const[teachers,setTeachers]=useState('')
      const[loading,setLoading]=useState(true)
      const[grades,setGrades]=useState([])
      const[term,setTerm]=useState([])
const[grad,setGrad]=useState([])
const[subj,setSubj]=useState('')
      const getCourses=()=>{
     console.log(ClassName)
     const myclassname="class"+ClassName
          const docRef= doc(db,myclassname,"Subjects")
  
          getDoc(docRef).then((doc)=>{
            const b=Object.values(doc.data())
            
           
             setCourses(b[0])
         
            })
            getTeachers()
       
           
      }
      const getGrades=async()=>{
       
          const collectionName= "Results"+ClassName
          console.log(collectionName)
          const dbref= collection(db,collectionName)
          const q= query(dbref,where('studentId','==',auth.currentUser.uid))
    const docsnap= await getDocs(q)
    const d=[]
    const f=[]
docsnap.docs.map((doc)=>{
  if(doc.exists){

    d.push(doc.data())
    f.push(Object.values(doc.data().results))
  }
 
})
setGrades(d)
setGrad(f)
console.log(grades, grad)
getCourses()           
      }
      const getTeachers=()=>{
        
const clasn="class"+ClassName
          const docRef= doc(db,clasn,"Teachers")
  
          getDoc(docRef).then((doc)=>{
            const b=Object.values(doc.data())
            
           
             setTeachers(b[0])
         
          })
         
         getStudentData()
    
           
      }
      const getStudentData=()=>{
        const dbref= collection(db,"Students")
        const q=query(dbref,where('uid','==',auth.currentUser.uid))
        getDocs(q).then((docsnap)=>{
docsnap.docs.map((mydoc)=>{
const myData=[]
myData.push(mydoc.data())
  setData(myData)
})
        }).finally(()=>{
          setLoading(false)
         
        })
      }
useEffect(()=>{
  getGrades()
},[])
   
   
  return (
    
    <View style={styles.container}>



     
<Text style={[styles.titleText,{color:Colors.background}]}>My BioData</Text>
{loading ?(
  <View>

  <ActivityIndicator
  size={'large'}
  color={Colors.background}
  />
  </View>
)
:
(<ScrollView>
<View style={styles.coursesView}>

  {data.map((item,i)=>{

return(
  <View key={i} style={{width:wp('90%'),height:hp('25%')}}>
  <View style={{ top: hp("2%") }}>
      <View style={{height: hp('7%'),justifyContent:'space-evenly'}}>
  <Text style={styles.textStyleLabels}>Student Email: </Text>
  <Text style={styles.textStyle}>{item.email}</Text>
      </View>
      <View style={{height: hp('7%'),justifyContent:'space-evenly'}}>
  <Text style={styles.textStyleLabels}>Student Name:</Text>
  <Text style={styles.textStyle}>{item.fullName}</Text>
      </View>
      <View style={{height: hp('7%'),justifyContent:'space-evenly'}}>
  <Text style={styles.textStyleLabels}>Father/Guardian Name:</Text>
  <Text style={styles.textStyle}>{item.guardianName}</Text>
      </View>

</View> 
</View>
)
  })}
</View>

{courses &&
<View style={styles.coursesView}>
  <Text style={styles.titleText}>Subjects</Text>
  {
  courses.map((key,i)=>{

    return(
      <Text style={styles.textStyle} key={i}>{key}</Text>
    )
  })}

</View>
}

{teachers &&
<View style={styles.coursesView}>
  <Text style={styles.titleText}>Teachers</Text>
  {
  teachers.map((key,i)=>{

    return(
      <Text style={styles.textStyle} key={i}>{key}</Text>
    )
  })}
</View>
}
{grades &&


  
  grades.map((key,i)=>{
    const b=grad[i]
    return(
     
      <View key={i} style={styles.coursesView}>
        <Text style={styles.titleText}>Grades</Text>
         <Text key={i} style={styles.textStyle}>{key.term}</Text>
         {
         b.map((item)=>{
return(
<Text style={styles.textStyle} >{item}</Text>

)
})}
      </View>
    )
  })



}

</ScrollView>)}


    </View>
      
  );
};

export default StudentDetailsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
   justifyContent: "center",
    backgroundColor: Colors.secondary,
  },
  textStyle: {

    fontSize: 15,
    color: Colors.textColor,
    fontWeight: "500",
   textAlign:'center'
 
  },
  textStyleLabels: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.secondary,
    fontWeight: "bold",
    textAlign:'center',

  },
  coursesView:{
     top: hp("5%"),
      height:hp('25%'),
      borderRadius:10,
      //width:wp('95%'),
      padding:10,
      margin:10,
      borderTopWidth:1,
      borderBottomWidth:1,
      paddingBottom:30,
        borderColor: Colors.secondary,
      justifyContent:'center',
      alignItems:'center',
       backgroundColor: Colors.background
     },
     titleText:{
        fontSize:22,
        alignSelf:'center',
        color:Colors.secondary,
        margin:10,
        justifyContent: "center",
      textAlign:'center',
        fontWeight: "bold",
    },
    topView: {
        height: hp('15%'),
        justifyContent: 'center',
       
    },
    courseNamesView:{
        flexDirection:'row', 
        justifyContent:'space-evenly',
        margin:5
    }

});
  