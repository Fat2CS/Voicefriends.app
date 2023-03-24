import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// screen
import HomeScreen from "./screens/HomeScreen";
import DiscussionScreen from "./screens/DiscussionScreen";

// import SignInScreen from "./screens/SigninScreen";
// import SignOut from "./screens/SignOut";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Sign" component={SignInScreen} />
        <Stack.Screen name="SignOut" component={SignOut} /> */}
        <Stack.Screen name="Talk" component={DiscussionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
