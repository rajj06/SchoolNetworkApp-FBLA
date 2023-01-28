
import { ScrollView, StyleSheet, Text, View,Pressable,Modal, FlatList } from "react-native";
import React,{useEffect, useState} from "react";
import { Colors } from "../../../assets/theme";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
const GroupsScreen = ({ navigation }) => {
  const[search,setSearch]=useState('')
  const[Groups,setGroups]=useState([])
const data=[]

const getTeacherGroups=()=>{
  const uid= auth.currentUser.uid
  const dbref= collection(db,"Groups")
  const q= query(dbref,where('adminId','==',uid))
  getDocs(q).then((docsnap)=>{
    docsnap.docs.map((doc)=>{
      data.push(doc.data())
  
    })
    setGroups(data)
  })
 
}
useEffect(()=>{
  getTeacherGroups()
},[])
const RenderItem=({item})=>{
  return(
    <View style={styles.listViewContainer}>
      <View  style={{height:hp("10%"),justifyContent:'center',top:hp('2%'),margin:5,}}>
      <Text style={[styles.titleText,{color:'black'}]}>{item.groupName}</Text>

      </View>
       <View style={{height:hp("10%"),justifyContent:'center',top:hp('2%'),margin:5,}}>
      <PrimaryButton
                  height={hp("8%")}
                  title={"View Group"}
                  iconColor={Colors.background}
                  onPress={() =>
                  navigation.navigate('GroupDiscussion',{item })
                  }
                />
        </View>
    </View>
  )
}
const KeyExtractor=(item)=>{
  return  item.GroupDescription
}
  return (
    <View style={styles.container}>
      
      <View style={{height:hp("10%"),justifyContent:'center',borderBottomWidth:1,top:hp('2%'),margin:5,}}>
      <PrimaryButton
                  height={hp("8%")}
                  title={"Create Group"}
                  iconColor={Colors.background}
                  onPress={() =>
                  navigation.navigate('GroupDetailScreen')
                  }
                />
        </View>
   
        <View>
          <FlatList
          contentContainerStyle={{paddingBottom:30}}
          data={Groups}
          renderItem={RenderItem}
          keyExtractor={KeyExtractor}
          />
        </View>
        
{/*        
        <View>
          <ModalScreen/>
        </View> */}
     
    </View>
  );
};

export default GroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'space-between',
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
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
  textInputMainView: {
    width: wp("88%"),
   // height: hp("50%"),
    justifyContent: "center",
    alignItems: "center",
   // bottom: hp("10%"),
  },
  listViewContainer:{
    width:wp('90%'),
    height:hp('20%'), 
    marginTop:10,
    marginBottom:5,
    justifyContent:'space-evenly',
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
