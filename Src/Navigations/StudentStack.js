/** @format */

import React, { useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentScreen from "../Screens/Student/StudentScreen";
import StudentDetailsForm from "../Screens/Student/StudentInfo";
import StudentEvents from "../Screens/Student/StudentEvents";
import StudentLoginScreen from "../Screens/Student/StudentLogin";
import StudentSignUpScreen from "../Screens/Student/StudentRegister";
import SendPhotosScreen from "../Screens/Student/SendPhotos";
import JoinGroups from "../Screens/Student/JoinGroup";
import GroupMedia from "../Screens/Student/GroupMedia";
import RecievedImages from "../Screens/Parent/RecievedPhotos";
const Stack = createNativeStackNavigator();

const StudentStack = () => {
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
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      {
        user ? (
          <Stack.Group>
          <Stack.Screen
            name="StudentScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Student  Dashboard",
            }}
            component={StudentScreen}
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
            name="StudentEvents"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Events",
            }}
            component={StudentEvents}
          />
          <Stack.Screen
            name="SendPhotosScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Send Photo",
            }}
            component={SendPhotosScreen}
          />
          <Stack.Screen
            name="RecievedImages"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Uploaded Images",
            }}
            component={RecievedImages}
          />
          <Stack.Screen
            name="JoinGroups"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Join Groups",
            }}
            component={JoinGroups}
          />
          <Stack.Screen
            name="GroupMedia"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Group Media",
            }}
            component={GroupMedia}
          />
          </Stack.Group>
        )
        :
        (  <Stack.Group>
          <Stack.Screen
            name="StudentLoginScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: false,
              title: "Student Login",
            }}
            component={StudentLoginScreen}
          />
          <Stack.Screen
            name="StudentSignUpScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: false,
              title: "Student Sign Up",
            }}
            component={StudentSignUpScreen}
          />
          </Stack.Group>)
      }
     
      
    </Stack.Navigator>
  );
};

export default StudentStack;
