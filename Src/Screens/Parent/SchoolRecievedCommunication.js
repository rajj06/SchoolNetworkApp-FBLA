/** @format */

import { StyleSheet, Text, View, Image ,FlatList} from "react-native";
import React ,{useEffect, useState} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {Colors} from "../../../assets/theme";
import PrimaryButton from "../../Components/PrimaryButton";
import TextInputCom from "../../Components/TextInputCom";
import { collection, getDocs,query, where,addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
const RecievedCommunication = ({ navigation }) => {
    const Data= [
        {
            id:1 ,
            sent: 'How Is My Child Going In School',
            recieved: 'Your Child Is Improving He Is A Brilliant Student',
            sentDate: '30/12/2022',
            recievedDate:'31/12/2022'
        },
        {
            id:2 ,
            sent: 'When Is Ptm',
            recieved: 'Sir It Is On Monday',
            sentDate: '30/12/2022',
            recievedDate:'31/12/2022'
        }
    ]
    const [data,setData]=useState('')
    const checkMessages=async()=>{
      const document=[]
      const userid= auth.currentUser.uid
      const docref=collection(db, "ParentTeacherCommunication")
      getDocs(query(docref,where ("parentId",'==',userid))).then((docsnap)=>{
        docsnap.docs.map((doc)=>{
         document.push(doc.data())
          setData(document)
        })
      })
    }
    useEffect(()=>{
      checkMessages()
    },[])
    const removeItem=(id)=>{
const newData= data.filter((item)=> { return item.id !== id})
 console.log(newData)
 setData(newData)

    }
    const RenderItem=({item})=>{
      console.log("item",item)
        return(
            <View style={styles.listViewContainer}>
                  <View>
                    <View style={{flexDirection:'row'}}>

         <Text style={[styles.messageText,{alignSelf:'flex-end',marginRight:5}]}>{item. recieverName?item. recieverName : 'Not Replied Yet'}:</Text>
            <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{item. recieverName}</Text>
                    </View>
      
      </View>
                 <View style={styles.rightView}>
            <Text style={[styles.messageText,{alignSelf:'flex-end'}]}>{item.message}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-end'}} > {item.sendDate}</Text>
      </View> 
      {item.reply&&      <View style={styles.leftView}>
            <Text style={[styles.messageText,{alignSelf:'flex-start'}]}>{item.reply?item.reply:'Not Replied Yet'}</Text>
            <Text style={{fontSize:12,alignSelf:'flex-end'}} > {item.recievedDate}</Text>
      </View>}
        
     </View>
        )
    }    
    const KeyExtractor=(item)=>{return item.message}
  return (
    <View style={styles.container}>
        
      <Text style={[styles.textStyle, {bottom: hp('2%')}]}>Recieved Response</Text>
     <View style={{ height: hp('80%')}}>
<FlatList
data={data}
renderItem={RenderItem}
keyExtractor={KeyExtractor}
showsVerticalScrollIndicator={false}
/>
  
  </View> 
    </View>
  );
};

export default RecievedCommunication;

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
    bottom:hp('10%')
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
  listViewContainer:{
    width:wp('90%'),
    height:hp('40%'), 
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
    padding:10,
    marginTop:10,
    borderRadius:20, 
    top: hp("3%"),
    alignSelf:'flex-start',
    backgroundColor:Colors.secondary
 }, 
messageText:{
    alignContent: "center",
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: "700",
}
});
