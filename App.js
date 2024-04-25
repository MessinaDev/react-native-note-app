import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  FAB,
  TextInput,
  PaperProvider,
  MD3DarkTheme,
} from "react-native-paper";

const nameScreenHome = "Home";
const nameScreenNote = "Note";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer style={styles.container} theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen name={nameScreenHome} component={HomeScreen} />
          <Stack.Screen name={nameScreenNote} component={NoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 25,
          bottom: 40,
        }}
      >
        <FAB icon="plus" onPress={() => navigation.navigate(nameScreenNote)} />
      </TouchableOpacity>
      <Text style={{ color: "red" }}>Home!</Text>
    </View>
  );
}

function NoteScreen() {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  return (
    <View style={styles.containerNote}>
      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={(title) => setTitle(title)}
      ></TextInput>
      {/* category */}
      <TextInput
        label="Text"
        mode="outlined"
        multiline={true}
        value={text}
        onChangeText={(text) => setText(text)}
        style={{ marginTop: 10 }}
      ></TextInput>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 5,
          bottom: 20,
        }}
      >
        <FAB
          icon="content-save"
          onPress={() => navigation.navigate(nameScreenNote)}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerNote: {
    flex: 1,
    margin: 20,
  },
});
