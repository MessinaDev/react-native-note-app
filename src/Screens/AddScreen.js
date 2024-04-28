import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { addNote } from "../Store/noteSlice";
import { useDispatch } from "react-redux";

export default function AddScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const dispatch = useDispatch();

  function add() {
    if (title && text) {
      const n = createNewNote();
      dispatch(addNote(n));
      setTitle("");
      setText("");
      navigation.navigate("Home");
    }
  }

  function createNewNote() {
    return {
      id: null,
      date: null,
      title,
      text,
    };
  }

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
        <FAB icon="content-save" onPress={() => add()} />
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
