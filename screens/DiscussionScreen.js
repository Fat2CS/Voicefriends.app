import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, TextInput } from "react-native";
import * as Speech from "expo-speech";
import React from "react";
// componant
import VoiceRecognize from "./componant/VoiceRecognize";

const DiscussionScreen = () => {
  const [name, setName] = React.useState("");

  const listAllVoiceOptions = async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    console.log(voices);
  };

  React.useEffect(() => {
    listAllVoiceOptions();
  }, []);

  const speakGreeting = () => {
    const greeting = `Bonjour ${name}`;
    const options = {
      voice: "com.apple.speech.synthesis.voice.Fred",
      pitch: 1.3,
      rate: 0.7,
      language: "fr-FR"
    };
    Speech.speak(greeting, options);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <Button title="Speak" onPress={speakGreeting} />
      <View>
        <VoiceRecognize />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    alignSelf: "stretch",
    height: 20,
    borderBottomWidth: 2,
    borderBottomColor: "red",
    margin: 8
  }
});

export default DiscussionScreen;
