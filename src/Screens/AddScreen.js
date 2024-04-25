import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";

export default function AddScreen() {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
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
        <FAB icon="content-save" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
