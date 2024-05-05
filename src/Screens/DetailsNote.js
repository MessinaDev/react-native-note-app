import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { addNote, editNote } from "../Store/noteSlice";
import { useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";

export default function DetailsNote({ navigation, route }) {
  const note = { ...route.params?.note };
  const [title, setTitle] = React.useState(note?.title || "");
  const [text, setText] = React.useState(note?.text || "");
  const [category, setCategory] = React.useState("");
  const [openDropDown, setOpenDropDown] = React.useState(false);

  const dispatch = useDispatch();

  const categories = [
    {
      label: "Work",
      value: "work",
    },
    {
      label: "Personal",
      value: "personal",
    },
  ];

  function save() {
    if (title && text) {
      if (note?.id) {
        note.title = title;
        note.text = text;
        dispatch(editNote(note));
      } else {
        const n = createNewNote();
        dispatch(addNote(n));
      }
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
        style={{ marginBottom: 10 }}
      ></TextInput>
      <DropDown
        label="Category"
        mode="outlined"
        visible={openDropDown}
        showDropDown={() => setOpenDropDown(true)}
        onDismiss={() => setOpenDropDown(false)}
        list={categories}
        value={category}
        setValue={setCategory}
      ></DropDown>
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
        <FAB icon="content-save" onPress={() => save()} />
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
