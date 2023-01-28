/** @format */

import { FlatList, ScrollView, StyleSheet, Pressable,Text, TouchableOpacity, View,Alert, Modal, ActivityIndicator } from "react-native";
import React, { useEffect,useState } from "react";
import { Colors } from "../../../assets/theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import PrimaryButton from "../../Components/PrimaryButton";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { setStatusBarBackgroundColor } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
const StudentDetailsForm = ({navigation,route}) => {
  const{StudentName,user}=route.params
      const[data,setData]=useState([])
      const[studentclass,setStudentClass]=useState('')
      const[courses,setCourses]=useState('')
      const[teachers,setTeachers]=useState('')
      const[loading,setLoading]=useState(true)
      const [modalVisible, setModalVisible] = useState(false);
      const getCourses=(className)=>{
      console.log(className)
      const clas="class"+className
          const docRef= doc(db,clas,"Subjects")
  
          getDoc(docRef).then((doc)=>{
            if(doc.exists){

              const b=Object.values(doc.data())
              console.log(b)
              setCourses(b[0])
            }
            
           
         
          })
         
          getTeachers(className)
           
      }
      const getTeachers=(className)=>{
        
        const clas="class"+className
          const docRef= doc(db,clas,"Teachers")
  
          getDoc(docRef).then((doc)=>{
            if(doc.exists){

              const b=Object.values(doc.data())
              
              setTeachers(b[0])
              console.log(teachers)
            }
            
           
         
          })
        
          setLoading(false)
       setModalVisible(!modalVisible)
           
      }
      const getStudentData=()=>{
        const dbref= collection(db,"Students")
        const myData=[]
        const q= query(dbref,where('guardianName','==',user))
        getDocs(q).then((docsnap)=>{
docsnap.docs.map((mydoc)=>{
const myclas=mydoc.data().className
console.log(myclas)

myData.push(mydoc.data())
setData(myData)
console.log(myData)
  
  // getCourses(myclas)
})
setLoading(false)
})

      }
useEffect(()=>{

 getStudentData()
 console.log(data)
},[])
   const ModalScreen=()=>{
    return(
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
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
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Hide</Text>
      </Pressable>
    </View>
    )
   }
   
  return (
    
    <View style={styles.container}>
<Text style={styles.titleText}>Student BioData</Text>
{loading ?(
  <View>

  <ActivityIndicator
  size={'large'}
  color={Colors.secondary}
  />
  </View>
)
:
(
<View>

 <FlatList
 data={data}
 renderItem={(({item,index})=>{
  return(
    <View key={index} style={{width:wp('90%'),height:hp('40%'),borderWidth:1,borderRadius:15,margin:5}}>
    <View style={{ top: hp("2%") }}>
        <View style={{height: hp('7%'),justifyContent:'space-evenly'}}>
    <Text style={styles.textStyleLabels}>Student Email: </Text>
    <Text style={[styles.textStyleLabels,{fontSize:15,color:'black',fontWeight:'400'}]}>{item.email}</Text>
        </View>
        <View style={{height: hp('7%'),justifyContent:'space-evenly'}}>
    <Text style={styles.textStyleLabels}>Student Name:</Text>
    <Text style={[styles.textStyleLabels,{fontSize:15,color:'black',fontWeight:'400'}]}>{item.fullName}</Text>
        </View>
        <View style={{height: hp('7%'),justifyContent:'space-evenly'}}>
    <Text style={styles.textStyleLabels}>Father/Guardian Name:</Text>
    <Text style={[styles.textStyleLabels,{fontSize:15,color:'black',fontWeight:'400'}]}>{item.guardianName}</Text>
        </View>
  <TouchableOpacity
  style={{height:hp('6%'),backgroundColor:Colors.secondary,width:wp('30%'),alignSelf:'center',alignItems:'center',justifyContent:'center'}}
  onPress={()=>{navigation.navigate("CoursesDetailsForm",{className:item.className})}}>
    <Text style={{fontWeight:'bold'}}>Check Courses</Text>
  </TouchableOpacity>
  </View> 
  </View>
  )
 })}
 keyExtractor={(item)=>{return item.uid}}
 />

  
</View>


)}


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

    fontSize: 15,
    //color: 'black',
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
     top: hp("3%"),
     
      height:hp('30%'),
      borderRadius:10,
      width:wp('100%'),
      padding:10,
      margin:10,
      borderTopWidth:1,
      borderBottomWidth:1,
        borderColor: Colors.secondary,
      justifyContent:'space-evenly',
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
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});
