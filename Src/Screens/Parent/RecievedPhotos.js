/** @format */

import { StyleSheet, Text, View, Image, Alert,FlatList,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../../firebase.config";
import { getDocs, query, where ,collection} from "firebase/firestore";
import { Colors } from "../../../assets/theme";

const RecievedImages = ({ navigation }) => {
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const[image,setImage]=useState([]);
  //const image="Exists"
  const[loading,setLoading]=useState(true)
  const arr=[]
  const getImages=()=>{
   
    const dbRef=collection(db,"SchoolPhotos")
    getDocs(dbRef).then((docsnap)=>{
docsnap.docs.map((docs)=>{
    //console.log("Contains")
    arr.push(docs.data())
// console.log(docs.data().sentImage)
 setImage(arr)
 
})
}).then(()=>{setLoading(false) 
console.log(image)
image.map((key)=>{console.log(key)})
}).catch((err)=>{alert(err)})
 
 
// arr.map((item)=>{
//     console.log(item)
// })
}
  useEffect(()=>{
    getImages()
  },[])
  const RenderItem=({item})=>{
    return(
        <View style={styles.listViewContainer}>

<View>
    <View style={{marginBottom:10}}>

<Image
            style={styles.Image}
            source={{uri: item.image}}
            resizeMode={"contain"}
          />  
    </View>
    <View style={{height:hp('15%'),alignItems:'flex-start',justifyContent:'space-evenly',alignContent:'center'}}>

<View style={{flexDirection:'row'}}>

<Text style={[styles.messageText,{alignSelf:'flex-start',marginRight:5,color:Colors.secondary}]}>Uploaded By:</Text>
<Text style={[styles.messageText,{alignSelf:'flex-start'}]}>{item.uploader}</Text>
</View>
<View style={{flexDirection:'row'}}>

<Text style={[styles.messageText,{alignSelf:'flex-start',marginRight:5,color:Colors.secondary}]}>Designation:</Text>
<Text style={[styles.messageText,{alignSelf:'flex-start'}]}>{item.designation}</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'center'}}>

<Text style={[styles.messageText,{alignSelf:'flex-start',marginRight:5,color:Colors.secondary}]}>Upload Date:</Text>
<Text style={[styles.messageText,{alignSelf:'flex-start'}]}>{item.date}</Text>
</View>
</View>
      </View> 
          
</View>
     
    )
  }
  const KeyExtractor=(item)=>{return item.image}
  return (
    <View style={styles.container}>
        {loading ? <View>
            <ActivityIndicator
        size={'large'}
        color={Colors.secondary}
        />
        </View>:
        
        <View >{
            image ?
           <View style={{  top: hp('5%'),}}>
         <FlatList
         contentContainerStyle={{paddingBottom:30}}
        data={image}
        renderItem={RenderItem}
        keyExtractor={KeyExtractor}
        />
         </View>:
            <Text style={styles.textStyle}>You Don't Have Recieved any Images Yet</Text>
            }
            </View>
        }

  
     
    </View>
  );
};

export default RecievedImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
  },
 
  messageText:{
    alignContent: "center",
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: "700",
},
  inputView: {
    width: wp("100%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 200,
    height: 150,
    borderRadius:20,
    alignSelf:'center'
  },
  listViewContainer:{
    width:wp('90%'),
    height:hp('40%'), 
    borderBottomWidth: 1,
  
    marginTop:10,
    marginBottom:5,
  
    alignItems:'center',
    justifyContent:'space-evenly',
 
},
});
