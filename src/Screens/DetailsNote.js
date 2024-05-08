import React, { useState } from "react";
import { FAB, TextInput, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { addNote, editNote } from "../Store/noteSlice";
import { useDispatch } from "react-redux";
import DropDown from "react-native-paper-dropdown";

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

export default function DetailsNote({ navigation, route }) {
  const note = { ...route.params?.note };
  const [title, setTitle] = useState(note?.title || "");
  const [text, setText] = useState(note?.text || "");
  const [category, setCategory] = useState(
    note?.category || categories[0].value
  );
  const [openDropDown, setOpenDropDown] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  function handleSubmit() {
    if (isFormValid()) {
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
  function isFormValid() {
    let errors = [];
    if (!title) {
      errors.push("Title is required");
    }
    if (!text) {
      errors.push("Text is required");
    }

    setErrors(errors);
    return errors.length === 0;
  }
  function createNewNote() {
    return {
      id: null,
      date: null,
      title,
      text,
    };
  }

  const listErrors = errors.map((e, index) => (
    <Text key={index} style={styles.error}>
      {e}
    </Text>
  ));

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
      <Text style={styles.info} variant="labelLarge">
        Creation date:
        {`${new Date(note?.date).toLocaleDateString()} - ${new Date(
          note?.date
        ).toLocaleTimeString()}`}
      </Text>

      <View style={styles.containerErrors}>{listErrors}</View>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 5,
          bottom: 20,
        }}
      >
        <FAB icon="content-save" onPress={() => handleSubmit()} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  containerErrors: {
    marginTop: 20,
  },
  info: {
    marginTop: 15,
  },
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 10,
  },
});
