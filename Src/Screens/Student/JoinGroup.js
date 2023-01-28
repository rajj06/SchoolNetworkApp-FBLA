
import { ScrollView, StyleSheet, Text, View,Pressable,Modal,Alert, FlatList, ToastAndroid, ActivityIndicator } from "react-native";
import React,{useEffect, useState} from "react";
import { Colors } from "../../../assets/theme";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdditionalUserInfo } from "firebase/auth";
const JoinGroups = ({ navigation,route }) => {
  const[search,setSearch]=useState('')
  const[Groups,setGroups]=useState([])
  const[className,setClassName]=useState('')
  const[studentName,setStudentName]=useState('')
  const[GroupName,setgroupName]=useState('')
  const[student,setStudents]=useState([])
  const[loading,setLoading]=useState(true)
const data=[]
const{ClassName,user}=route.params
const getUserInfo=()=>{
   
}
const getStudentJoinGroups=()=>{
    
      const dbref= collection(db,"Groups")
    
      getDocs(query(dbref,where('class','==',className))).then((docsnap)=>{
        docsnap.docs.forEach((doc)=>{
console.log(doc.data())
                data.push(doc.data())
                 setGroups(data)
           setStudents(doc.data().students)
            
        })
       
      }).finally(()=>{
        setLoading(false)
      })
 
}
const getImfo=()=>{
    AsyncStorage.getItem('studentclass').then((val)=>{
        setClassName(val)
        AsyncStorage.getItem('studentName').then((val)=>{
            setStudentName(val)
            const dbref= collection(db,"Groups")
    
            getDocs(query(dbref,where('class','==',className))).then((docsnap)=>{
              docsnap.docs.forEach((doc)=>{
      console.log(doc.data())
                      data.push(doc.data())
                       setGroups(data)
                 setStudents(doc.data().students)
                  
              })
             
            }).finally(()=>{
              setLoading(false)
            })
          })
      })
}
const getUserGroups=()=>{
    
    const dbref= collection(db,"Groups")
    
    getDocs(dbref).then((docsnap)=>{
      docsnap.docs.forEach((doc)=>{
console.log(doc.data())
              data.push(doc.data())
               setGroups(data)
         setStudents(doc.data().students)
          
      })
     
    }).finally(()=>{
      setLoading(false)
    })
}
useEffect(()=>{
   getUserGroups() 
   
    return console.log('cleaup')
},[])
const joinStudent=(groupName)=>{
setStudents(student.push(user))
   console.log(groupName+" "+user)
   const dbref= doc(db,"Groups",groupName) 
   updateDoc(dbref,{
    students: student
   }).then(()=>{
    AsyncStorage.setItem(`hasJoined${groupName}`,'joined').then(()=>{

        navigation.navigate('GroupMedia',{
            groupName
        })
    })
  return  ToastAndroid.show('Joined Successfully',ToastAndroid.SHORT)
   })
  
}
const checkFirstTime=(groupName)=>{
    AsyncStorage.getItem(`hasJoined${groupName}`).then((val)=>{
        if(val==null){
            return( Alert.alert(
                "Sure",
                "You Will Be Joining This Group In A While",
                [
                  {
                    text: "Okay",
                    onPress: () =>  {joinStudent(groupName)},
                    style: "yes",
                  
                    
                  },
                  { text: "No" },
                ],
                { cancelable: false }
              ))
        }
        else if(val=='joined'){
navigation.navigate('GroupMedia',{groupName})
        }
    })
}
const RenderItem=({item})=>{
  //style={styles.listViewContainer} style={{height:hp('30%'),paddingBottom:30,backgroundColor:'red'}}
  return(
   
    <View>
       <View style={{justifyContent:'space-evenly',borderRadius:20,elevation:3,backgroundColor:Colors.background ,height:hp('20%'),width:wp('40%'),margin:10}}>
    

      <Text style={[styles.titleText,{color:'black'}]}>{item.groupName}</Text>

      
       <View style={{justifyContent:'center',top:hp('1%'),margin:5,}}>
      <PrimaryButton
                //  height={hp("7%")}
                width={wp('30%')}
                  title={"View"}
                  iconColor={Colors.background}
                  onPress={() =>
                   checkFirstTime(item.groupName)
                 
                  }
                />
        </View>
    </View>
    </View>
  )
}
const KeyExtractor=(item)=>{
  return  item.GroupDescription
}
  return (
    <View style={styles.container}>
      
  
        <View style={{top:hp('1%'),borderBottomWidth:1,margin:3,marginBottom:5,height:hp('12%'),alignItems:'center'}}>
        <Text
        style={[styles.textStyle,{fontSize:18,color:'black',textAlign:'center'}]}
        numberOfLines={3}
        >Your Teachers Have Created These Groups Join Them As Soon As Possible</Text>
        </View>
        
       { loading ? <View style={{bottom:hp('50%'),alignSelf:'center'}}>
            <ActivityIndicator
            size={'large'}
            color={Colors.secondary}
            />
        </View> 
        :
        <View style={styles.listViewContainer}>
          <FlatList
          numColumns={2}
          contentContainerStyle={{paddingBottom:30}}
          data={Groups}
          renderItem={RenderItem}
          keyExtractor={KeyExtractor}
          />
        </View>}
        
{/*        
        <View>
          <ModalScreen/>
        </View> */}
     
    </View>
  );
};

export default JoinGroups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent:'space-between',
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 15,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  titleText:{
    fontSize:18,
    alignSelf:'center',
    color:Colors.secondary,
    margin:10,
    justifyContent: "center",
  textAlign:'center',
    fontWeight: "bold",
},
  textInputMainView: {
    width: wp("88%"),
   // height: hp("50%"),
    justifyContent: "center",
    alignItems: "center",
   // bottom: hp("10%"),
  },
  listViewContainer:{
   // width:wp('90%'),
   height:hp('80%'),
    justifyContent:'center',
   // backgroundColor:'yellow',
    // marginTop:10,
    // marginBottom:5,
   alignItems:'center',
    padding:10,
    
},
  inputView: {
    width: wp("100%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flex:1,
    //height: hp('70%'),
    margin: 5,
  borderWidth:1,
    justifyContent:'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent:'space-evenly',
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
