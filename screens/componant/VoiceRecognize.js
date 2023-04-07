import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
// import * as Permissions from "expo-permissions";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// import { Text, View, TouchableOpacity } from "react-native";
import Voice, { SpeechRecognizer } from "react-native-voice";
// import Voice, { SpeechRecognizer } from "@react-native-community/voice";

// const VoiceRecognize = () => {
//   const [result, setResult] = React.useState("");
//   const [error, setError] = React.useState("");
//   const [isRecording, setRecording] = React.useState(false);

//   useEffect(() => {
//     const getPermission = async () => {
//       const { status } = await Permissions.askAsync(
//         Permissions.AUDIO_RECORDING
//       );
//       if (status !== "granted") {
//         alert("Permission to access microphone denied");
//         return;
//       }
//       // microphone permission granted
//     };
//     getPermission();
//   }, []);

//   Voice.onSpeechStart = () => setRecording(true);
//   Voice.onSpeechEnd = () => setRecording(false);
//   Voice.onSpeechError = (err) => setError(err.error.message);
//   Voice.onSpeechResults = (result) => setResult(result.value[0]);

//   const startRecording = async () => {
//     try {
//       if (Voice) await Voice.start("fr-FR");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await Voice.stop();
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <View>
//       <Text>Voice input</Text>
//       <Text>{result}</Text>
//       <Text>{error}</Text>
//       <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
//         <Text>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const VoiceRecognize = () => {
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    Voice.isAvailable().then((available) => {
      setIsReady(available);
    });

    return () => {
      SpeechRecognizer.removeAllListeners();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
  };
  const onSpeechEndHandler = (e) => {
    setLoading(false);
    console.log("stop handler", e);
  };

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0];
    setResult(text);
    console.log("speech result handler", e);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      if (isReady) await Voice.start("fr-FR");
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (isReady) await Voice.stop();
    } catch (error) {
      console.log("error raised", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="your text"
            style={{ flex: 1 }}
            onChangeText={(text) => setResult(text)}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{
                  uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png"
                }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: 24,
            backgroundColor: "red",
            padding: 8,
            borderRadius: 4
          }}
          onPress={stopRecording}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  headingText: {
    alignSelf: "center",
    marginVertical: 26,
    fontWeight: "bold",
    fontSize: 26
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4
  }
});

export default VoiceRecognize;
