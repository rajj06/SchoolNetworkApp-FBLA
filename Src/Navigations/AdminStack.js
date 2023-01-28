/** @format */

import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "../Screens/Admin/AdminScreen";
import EventScreen from "../Screens/Admin/EventScreen";
import SendPhotosScreen from "../Screens/Admin/SendPhotosScreen";
import StudentInfo from "../Screens/Admin/StudentInfo";
import GroupsScreen from "../Screens/Admin/GroupsScreen";
import StudentDetailsForm from "../Screens/Admin/StudentDetailsForm";
import GroupDetailScreen from "../Screens/Admin/GroupDetailScreen";
import AdminLoginScreen from "../Screens/Admin/AdminLogin";
import AdminSignUpScreen from "../Screens/Admin/AdminRegister";
import SubWelcomeScreen from "../Screens/AuthScreens/SubWelcomeScreen";
import GroupDiscussion from "../Screens/Admin/GroupDiscussion";
import { onAuthStateChanged } from "firebase/auth";
import CoursesScreen from "../Screens/Admin/CoursesScreen";
import RecievedCommunication from "../Screens/Admin/ParentTeacherCommunication";
import RecievedImages from "../Screens/Admin/RecievedImages";
import UploadedImages from "../Screens/Admin/UploadedImages";
import GradesScreen from "../Screens/Admin/StudentGrades";
import UserUploadedImages from "../Screens/Admin/UserUploadedImages";
import GradesSelectClass from "../Screens/Admin/GradesSelectClass";
import { auth } from "../../firebase.config";
const Stack = createNativeStackNavigator();

const AdminStack = () => {
  const [user, setUser] = useState("");
  const checkUser = () => {
    const subscriber = onAuthStateChanged(auth, (userExists) => {
      if (userExists) {
        setUser(userExists);
      } else {
        setUser("");
      }
      return subscriber;
    });
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name="AdminScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "School  Faculty",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={AdminScreen}
          />
          <Stack.Screen
            name="EventScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Event Information",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={EventScreen}
          />
          <Stack.Screen
            name="SendPhotos"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Send  Photos",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={SendPhotosScreen}
          />
          <Stack.Screen
            name="StudentInfo"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Student  Info",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={StudentInfo}
          />
           <Stack.Screen
            name="UploadedImages"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Uploaded Images",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={UploadedImages}
          />
           <Stack.Screen
            name="UserUploadedImages"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "My Uploaded Images",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={UserUploadedImages}
          />
          <Stack.Screen
            name="Groups"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Groups",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={GroupsScreen}
          />
         <Stack.Screen
            name="GroupDiscussion"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Group Discussion ",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={GroupDiscussion}
          />
          <Stack.Screen
            name="CoursesScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Courses",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={CoursesScreen}
          />
          <Stack.Screen
            name="GradesScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Grades",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={GradesScreen}
          />
          <Stack.Screen
            name="StudentDetailsForm"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Student Details",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={StudentDetailsForm}
          />
          <Stack.Screen
            name="GroupDetailScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Detail Details",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={GroupDetailScreen}
          />
          <Stack.Screen
            name="RecievedCommunication"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Recieved Messages",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={RecievedCommunication}
          />
          <Stack.Screen
            name="GradesSelectClass"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Select A Class",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={GradesSelectClass}
          />
          <Stack.Screen
            name="RecievedImages"
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              title: "Recieved Images",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
            component={RecievedImages}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="AdminLoginScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: false,
              title: "Admin Login",
            }}
            component={AdminLoginScreen}
          />
          <Stack.Screen
            name="AdminSignUpScreen"
            options={{
              headerTitleAlign: "center",
              headerShown: false,
              title: "Admin Sign Up",
            }}
            component={AdminSignUpScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AdminStack;
