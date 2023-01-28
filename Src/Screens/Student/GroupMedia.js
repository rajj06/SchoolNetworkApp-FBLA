/** @format */

import { StyleSheet, Text, View, Image ,FlatList,ScrollView, ToastAndroid,TouchableOpacity,Modal, KeyboardAvoidingView} from "react-native";
import React ,{useEffect, useRef, useState} from "react";
import { FontAwesome,AntDesign,Entypo } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {Colors} from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import { collection, getDocs,query,doc, where,addDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { async } from "@firebase/util";

const GroupMedia = ({ navigation ,route}) => {
    const ref=useRef()
    const [data,setData]=useState('')
    const[reply,setReply]=useState({});
    const[name,setName]=useState('')
    const[studentName,setStudentName]=useState('')
    const[userId,setUserId]=useState('')
    const[showModal,setShowModal]=useState(false)
    const[newMessages,setNewMessages]=useState([])
    const[loading,setLoading]=useState(true)
    const[groupData,setGroupData]=useState([])
    const[newDates,setNewDates]=useState([])
    const{groupName}=route.params
    // setData(item)
    //console.log(item)
  
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
            onPress={()=>{setShowModal(true)}}
            style={{alignSelf:'flex-end'}}
            >
            <AntDesign name="infocirlce" size={30} color={Colors.secondary} />
            </TouchableOpacity>
          ),
        });
      }, []);
    const RenderItem=({item,index})=>{
       
        return(
            <View  style={styles.listViewContainer}>
                   <View>
                    <View style={{flexDirection:'row'}}>

         <Text style={[styles.messageText,{alignSelf:'flex-end',marginRight:5}]}>Admin Name:</Text>
            <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{item.adminName}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>

            <Text style={[styles.messageText,{alignSelf:'flex-end',marginRight:5}]}>Group Description</Text>
            <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{item.GroupDescription}</Text>
            </View>
      </View> 
                 <View style={styles.rightView}>
            <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{item.message}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-end'}} > {item.sendDate}</Text>
      </View> 
      
      <View style={styles.textInputMainView}>
        <View ref={ref} key={index} style={[styles.inputView,{   top: hp('3%'),}]}>
           
          <TextInputCom
      
            text={"Reply"}
            placeholder={"Enter Your Reply"}
            borderWidth={2}
          padding={5}
            height={hp("16%")}
            textAlignVertical={"top"}
            borderRadius={16}
            value={reply[index]||''}
            onChangeText={(value) => onChangeText(index,value)}
          />
        </View>

        <View style={{ top: hp("10%") }}>
            <TouchableOpacity>
            <FontAwesome name="send" size={24} color="black" />
            </TouchableOpacity>
        </View>

      </View>
        
     </View>
        )
    }    
   const KeyExtractor=(item)=>{return item.id}
   useEffect(()=>{
getMessages()

   },[])
   const message=[]
   const getMessages=()=>{
    const grpname=groupName
    console.log(grpname)
    const docRef=doc(db,"Groups",grpname)
    getDoc(docRef).then((docsnap)=>{
       if( docsnap.exists){
        setGroupData(docsnap.data())
       setNewMessages(docsnap.data().messages)
       setNewDates(docsnap.data().dates)
       console.log(newMessages)
       }
    }).then(()=>{
        setLoading(false)
    })
  
    
   // const docRef=doc(db,"Groups",grpname)
  
}
   const sendMessage=()=>{
if(reply==''){return alert('Message Not Entered')}
else{
    setLoading(true)
    setNewMessages(newMessages.push(reply))
    const grpname=item.groupName
    console.log(grpname)
    const docRef=doc(db,"Groups",grpname)
    
      
        updateDoc(docRef,{
            messages: newMessages
        }).then(()=>{

        
            setReply('')
            getMessages()
            return  ToastAndroid.show('Message Sent',ToastAndroid.SHORT)})
    
  
    
   // const docRef=doc(db,"Groups",grpname)
  
}
   }
   const ModalScreen=()=>{
    return(
        <View style={styles.centeredView}>
           
            <Modal
           visible={showModal}
           onRequestClose={()=>{setShowModal(!showModal)}} 
           transparent={true}
            >
                <View style={styles.centeredView}>

                 <View style={styles.modalView}>
                 <TouchableOpacity
            onPress={()=>{setShowModal(!showModal)}}
            style={{alignSelf:'flex-end'}}
            >
            <Entypo name="circle-with-cross" size={30} color={Colors.secondary} />
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>

<Text style={[styles.messageText,{alignSelf:'flex-end',marginRight:5}]}>Admin Name:</Text>
   <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{groupData.adminName}</Text>
           </View>
           <View style={{flexDirection:'row'}}>

   <Text style={[styles.messageText,{alignSelf:'flex-end',marginRight:5}]}>Group Description</Text>
   <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{groupData.GroupDescription}</Text>
   </View>
        </View>
                </View>
            </Modal>
            </View>
            
    )
   }
  return (
    <View style={styles.container}>

        <View style={{height:hp('5%'),top: hp('2%')}}>
      <Text style={[styles.textStyle,{alignSelf:'center'}]}>{groupName}</Text>
      <View>

{showModal && <ModalScreen/>}
</View>
        </View>
   


        
        <View style={{top:hp('5%'),margin:5,height:hp('75%'),paddingBottom:30,width:wp('100%')}}>
     <Text style={{alignSelf:'center',margin:10,fontSize:25,borderBottomWidth:1}}>Messages</Text>
{!loading ?

 <View>
    {newMessages=='' ? <Text style={{alignSelf:'center',margin:10,fontSize:30}}>No Messages Yet</Text>:
    <View>
     
     <FlatList
   contentContainerStyle={{padding:30}}
data={newMessages}
renderItem={({item,index})=>{
  return(
    <View style={styles.leftView}>
                 <Text style={[styles.messageText,{alignSelf:'center'}]}>{item}</Text>
                 <Text style={[styles.messageText,{alignSelf:'flex-end',fontSize:10}]}>{newDates? newDates[index]:''}</Text>
          </View>
  )
}}
keyExtractor={(item)=>{return item.id}}
showsVerticalScrollIndicator={false}
/>
     {/* {
        newMessages.map((item,i)=>{
            return(
              
                <View key={i} style={styles.leftView}>
                 <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{item}</Text>
          </View>
            )
        })
     } */}
        </View>}


 </View>:
 <View>
     <Text style={{alignSelf:'center',margin:10,fontSize:30}}>Getting Messages</Text>
 </View>

}   

  
  </View> 

  

 
   
 
    </View>
  );
};

export default GroupMedia;

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
  textInputMainView: {
    width: wp("88%"),
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
  
  },

  inputView: {
    width: wp("100%"),
    height: hp("8%"),
    justifyContent: "center",
    alignItems: "center",
    marginVertical:10,
  },
 
  Image: {
    width: 250,
    height: 150,
    bottom: hp("20%"),
  },
  listViewContainer:{
    width:wp('90%'),
    height:hp('50%'), 
    borderWidth: 1,
    borderRadius:15,
    marginTop:10,
    marginBottom:5,
    padding:10,
    borderColor: Colors.secondary
},
rightView:{
    padding:10,
    marginBottom:10,
    borderRadius:20, 
    top: hp("3%"),
   // width: wp('80%'),
    alignSelf:'flex-end',
    backgroundColor:Colors.secondary
 },
 leftView:{
  height:hp('8%'),
  padding:5,
    marginTop:5,
    borderRadius:20, 
    top: hp("2%"),
    //alignItems:'center',
    justifyContent:'space-between',
    alignSelf:'flex-start',
    backgroundColor:Colors.secondary
 },
messageText:{
  alignContent: "center",
  fontSize: 15,
  color: Colors.textColor,
  fontWeight: "700",
},
centeredView: {
    flex: 1,
    justifyContent: "center",
  
    marginTop: 22
  },
  modalView: {
    alignSelf:'center',
    height: hp('20%'),
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
  

});
