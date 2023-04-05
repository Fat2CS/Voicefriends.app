import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
// import SignInScreen from "./SigninScreen";

const HomeScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [response, estresponse] = useState("");
  return (
    <View>
      <Text style={styles.title}> Friend in my pocket</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Talk")}>
        <Text>commençons à discuter !</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Sign")}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignOut")}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "purple",
    fontSize: 30,
    marginTop: 50
  }

  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
});

export default HomeScreen;
