import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FAB, Card, Portal, Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, fetchNotes } from "../Store/noteSlice";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  const [noteSelected, setNodeSelected] = React.useState(null);
  const notes = useSelector((state) => state.note.notes);

  function editNote(note) {
    navigation.navigate("Note", { note });
  }

  const showDialog = (note) => setNodeSelected(note);
  const hideDialog = () => setNodeSelected(null);
  function delNote(id) {
    dispatch(deleteNote(id));
    hideDialog();
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const cards =
    notes.map((note) => {
      const date = new Date(note.date);

      return (
        <Card
          key={note.id}
          style={styles.card}
          onPress={() => editNote(note)}
          onLongPress={() => showDialog(note)}
        >
          <Card.Title
            title={note.title}
            subtitle={`Creation date: ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}
          />
          <Card.Content>
            <Text>{note.text}</Text>
          </Card.Content>
          <Card.Actions>
            <FAB icon="delete" size="small" onPress={() => showDialog(note)} />
            <FAB icon="pencil" size="small" onPress={() => editNote(note)} />
          </Card.Actions>
        </Card>
      );
    }) || [];

  return (
    <View style={styles.container}>
      {cards}

      <Portal>
        <Dialog
          visible={noteSelected}
          dismissable={false}
          dismissableBackButton={false}
        >
          <Dialog.Title>Delete note</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {`Are you sure to delete the selected element "${noteSelected?.title}"?`}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.cardActions}>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => delNote(noteSelected.id)}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <TouchableOpacity style={styles.addButton}>
        <FAB icon="plus" onPress={() => navigation.navigate("Note")} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 25,
  },
  card: {
    marginBottom: 20,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
});
