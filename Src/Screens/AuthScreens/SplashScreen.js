/** @format */

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "../../../assets/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({ navigation }) => {
 const getUserType=async()=>{
 
  AsyncStorage.getItem('userType').then((val)=>{
    console.log(val)
    if(val == null){
      navigation.navigate("WelcomeScreen"); 
    
    }
    else{
     if(val=='Admin') {
      navigation.navigate('AdminStack')
     }
    else  if(val=='Student'){
      navigation.navigate('StudentStack')
     }
     else if(val=='Parent'){
      navigation.navigate('ParentStack')
     }
     else{
      navigation.navigate("WelcomeScreen"); 
     }
    }
  })
 }
  useEffect(() => {

    setTimeout(() => {
         getUserType()
       
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      
      <Image
        style={styles.Image}
        resizeMode={"contain"}
        source={require("../../../assets/images/logo.png")}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  Image: {
    width: 400,
    height: 400,
    bottom: 8,
  },
});
