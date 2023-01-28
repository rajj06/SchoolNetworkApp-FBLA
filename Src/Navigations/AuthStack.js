/** @format */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/AuthScreens/SplashScreen";
import WelcomeScreen from "../Screens/AuthScreens/WelcomeScreen";
import SubWelcomeScreen from "../Screens/AuthScreens/SubWelcomeScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import SignupScreen from "../Screens/AuthScreens/SignupScreen";
const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen
        name="SplashScreen"
        options={{
          headerShown: false,
        }}
        component={SplashScreen}
      />
      <Stack.Screen name="SubWelcomeScreen" component={SubWelcomeScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default Auth;
