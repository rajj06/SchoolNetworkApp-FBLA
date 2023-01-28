/** @format */

import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AuthStack from "./AuthStack";
import AdminStack from "./AdminStack";
import StudentStack from "./StudentStack";
import ParentStack from "./ParentStack";
import WelcomeScreen from "../Screens/AuthScreens/WelcomeScreen";
import LoadingScreen from "../Screens/AuthScreens/SplashScreen";
const MainStack = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (

    <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen
        name="LoadingScreen"
        options={{
          headerShown: false,
        }}
        component={LoadingScreen}
      />
      <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminStack"
        component={AdminStack}
        options={{ headerTitleAlign: "center", headerShown: false }}
      />
      <Stack.Screen
        name="ParentStack"
        component={ParentStack}
        options={{ headerTitleAlign: "center", headerShown: false }}
      />
      <Stack.Screen
        name="StudentStack"
        component={StudentStack}
        options={{ headerTitleAlign: "center", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
