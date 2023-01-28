/** @format */

import React, { useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ParentScreen from "../Screens/Parent/ParentScreen";
import CommunicateScreen from "../Screens/Parent/CommunicateSchool";
import StudentDetailsForm from "../Screens/Parent/StudentInfo";
import StudentEvents from "../Screens/Student/StudentEvents";
import ParentLoginScreen from "../Screens/Parent/ParentLogin";
import ParentSignUpScreen from "../Screens/Parent/ParentRegister";
 import RecievedImages from "../Screens/Parent/RecievedPhotos";
 import CoursesDetailsForm from "../Screens/Parent/CoursesDetails";

import RecievedCommunication from "../Screens/Parent/SchoolRecievedCommunication";
const Stack = createNativeStackNavigator();
const ParentStack = () => {
  const [user,setUser]=useState('');
  const checkUser=()=>{
  
    const subscriber= onAuthStateChanged(auth, (userExists)=>{
       if(userExists){
        setUser(userExists)
      }
       else{
         setUser('')
       }
       return subscriber
     })
   }
   
      useEffect(()=>{checkUser()},[])
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AdminScreen"
    >
     {user ? (
  <Stack.Group>
  <Stack.Screen
    name="ParentScreen"
    options={{
      headerTitleAlign: "center",
      headerShown: true,
      title: "Parent  Dashboard",
    }}
    component={ParentScreen}
  />
   <Stack.Screen
    name="StudentEvents"
    options={{
      headerTitleAlign: "center",
      headerShown: true,
      title: "School Events",
    }}
    component={StudentEvents}
  />
   <Stack.Screen
    name="CoursesDetailsForm"
    options={{
      headerTitleAlign: "center",
      headerShown: true,
      title: "Courses Details",
    }}
    component={CoursesDetailsForm}
  />
   <Stack.Screen
    name="StudentDetailsForm"
    options={{
      headerTitleAlign: "center",
      headerShown: true,
      title: "Student Details",
    }}
    component={StudentDetailsForm}
  />
   <Stack.Screen
    name="RecievedImages"
    options={{
      headerTitleAlign: "center",
      headerShown: true,
      title: "Recieved Photos",
    }}
    component={RecievedImages}
  />
   <Stack.Screen
    name="CommunicateScreen"
    options={{
      headerTitleAlign: "center",
      headerShown: true,
      title: "Parent Teacher Communication",
    }}
    component={CommunicateScreen}
  />
   <Stack.Screen
    name="RecievedCommunication"
    options={{
      headerTitleAlign: "center",
      headerShown: true,
      title: "Parent Teacher Communication",
    }}
    component={RecievedCommunication}
  />
  </Stack.Group>
     ):
     (  <Stack.Group>
      <Stack.Screen
        name="ParentLoginScreen"
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          title: "Parent Login",
        }}
        component={ParentLoginScreen}
      />
      <Stack.Screen
        name="ParentSignUpScreen"
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          title: "Parent Sign Up",
        }}
        component={ParentSignUpScreen}
      />
      </Stack.Group>)
     
     }
    
    

    </Stack.Navigator>
  );
};

export default ParentStack;
