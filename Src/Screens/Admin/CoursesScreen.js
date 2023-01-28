/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from '@expo/vector-icons';
import { Colors } from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import { addDoc, collection, doc, Firestore, setDoc ,updateDoc} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { async } from "@firebase/util";
import { TouchableOpacity } from "react-native-gesture-handler";
import Classes from "./ClassesArray";

const CoursesScreen = ({ navigation }) => {
  const [subject, setSubject] = useState({});
  const [teacher, setTeacher] = useState({});
  const [selectedClass, setSelectedClass] = useState();
  const[numTextInputs,setNumTextInputs]=useState(0);
  const[loading,setLoading]=useState(false)
  
  const deleteField = (index) => {
    
  setNumTextInputs(val=>val-(index-(index-1)))

  
  };
  const submitSubject=async()=>{
    if(selectedClass==undefined){setLoading(false) 
      return(alert('Select A First First'))}
    if(selectedClass!=undefined){
      const teachers= Object.values(teacher)
      const subjects=Object.values(subject)
      const classname= "class" + selectedClass
      console.log(teachers)
      console.log(subjects)
      const dbref= doc(db,classname.toString(),'Subjects')
      await  setDoc(dbref,{
            subjects
          }).catch((err)=>{
            console.log(err)
          }).then(async()=>{
            const dref= doc(db,classname.toString(),'Teachers')
            await  setDoc(dref,{
              teachers
            }).catch((err)=>{
              console.log(err)
            })
          }).finally(()=>{
            setLoading(false)
            alert('Courses Uploaded')
          })
    }
    // if(selectedClass!=undefined){

    //   const teachers= Object.values(teacher)
    //   const subjects=Object.values(subject)
    //   console.log(teachers)
    //   console.log(subjects)
    //   console.log(selectedClass+"selcted class")
    //   const classname= "class" + selectedClass
    //  const dbref= doc(db,'Subjects',classname.toString())
    //   for (var i = 0; i < teachers.length; i++) {
    //     const fieldNameSubject= 'Subject '+ i;
    //     const fieldNameTeacher= 'Teacher '+subjects[i];
    //   if(i==0){
      
    //   await  setDoc(dbref,{
    //     [fieldNameSubject]: subjects[i],
    //     [fieldNameTeacher]: teachers[i]
    //   }).catch((err)=>{
    //     console.log(err)
    //   })
    //   }
    //   else{
    //     await updateDoc(dbref, {
    //       [fieldNameSubject]: subjects[i],
    //       [fieldNameTeacher]: teachers[i]
    //     })
    //     console.log(`subject${i}`,subjects[i],`teacher${subjects[i]}`,teachers[i])
    //   }
      
    //   }
    //   alert('Subjects Updated Succcessfully')

    // }  
    // else{
    //   alert('Please Select A Class First')
    // }    

  }
  const onChangeText=(index,text)=>{
    
    setTeacher((values)=>(
        {
          ...values,
            [index]:text
        }
    ))
}
const onChangeSubject=(index,text)=>{
    
setSubject((values)=>(
      {
        ...values,
          [index]:text
      }
  ))
}
  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            overflow: "hidden",
            borderRadius: 16,
            width: wp("95%"),
            alignSelf: "center",
          }}
        >
          <Picker
          
            selectedValue={selectedClass}
            style={{height: hp('6%'),backgroundColor:Colors.secondary,borderColor:'black',borderWidth:1}}
            placeholder={'Please Select A Class First'}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedClass(itemValue)
            }
            mode={"dialog"}
          >
            <Picker.Item 
           // style={{backgroundColor:Colors.secondary}}
            label="Please Select a Class" value="" />
            {
Classes.map((item)=>{
  console.log(item)
return(
<Picker.Item 
// style={{backgroundColor:Colors.secondary}}
label={item.name} key={item.id} value={item.value} />
) 
})
 
            }   
                </Picker>
        </View>
        <View style={styles.textInputMainView}>
         {loading &&
          <ActivityIndicator
          color={Colors.secondary}
          size={'small'}
          />
         } 
             <ScrollView style={{flex:1}} >
              {[...Array(numTextInputs).keys()].map((key,index)=>{
                return ( <View style={{height: hp('15%'),flexDirection:'row', width: wp('100%'),paddingTop: 10,justifyContent:'space-evenly' }}>
             
             

                  <TextInput 
                  placeholder={"Teacher Name"}
                    style={styles.textInputStl}
                    onChangeText={(value) => onChangeText(index,value)}
                />
                 <TextInput 
                  placeholder={"Subject Name"}
                    style={styles.textInputStl}
                    onChangeText={(value) => onChangeSubject(index,value)}
                />
          
                </View>)
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
             onPress={()=>setNumTextInputs(val=>val+1)}

              title="Add Course"
              width={wp("40")}
            />
            <PrimaryButton
              button={"outline"}
              onPress={()=>{
                Alert.alert(
                  "Delete",
                  "This Will Only Delete Last Field",
                  [
                    {
                      text: "Okay",
                      onPress: () =>
                     { if(numTextInputs== 0){
                        return alert('You Reached End')
                      }else{deleteField(numTextInputs)}}
                      ,
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
      <View style={{ bottom: hp("1%") }}>
        <PrimaryButton
          title={"Post Courses"}
          iconColor={Colors.background}
          onPress={() => 
            {
              Alert.alert(
                "Update Courses",
                "These Courses Will Be Posted",
                [
                  {
                    text: "Yes",
                    onPress: () =>
                   {
                    setLoading(true)
                    submitSubject()}
                    ,
                    style: "yes",
                  
                    
                  },
                  { text: "No" },
                ],
                { cancelable: false }
              );
            }
            }
        />
      </View>
    </View>
  );
};

export default CoursesScreen;

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
