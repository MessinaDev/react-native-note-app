import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FAB, Card, Portal, Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, fetchNotes } from "../Store/noteSlice";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [noteSelected, setNodeSelected] = React.useState(null);
  const notes = useSelector((state) => state.note.notes);

  function showDialog(note) {
    setNodeSelected(note);
    setVisible(true);
  }
  function hideDialog() {
    setNodeSelected(null);
    setVisible(false);
  }
  function delNote(id) {
    dispatch(deleteNote(id));
    hideDialog();
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const cards =
    notes.map((n) => {
      return (
        <Card style={styles.card} onLongPress={() => showDialog(n)}>
          <Card.Title title={n.title} />
          <Card.Content>
            <Text>{n.text}</Text>
          </Card.Content>
          <Card.Actions>
            <FAB icon="delete" size="small" onPress={() => showDialog(n)} />
            <FAB icon="pencil" size="small" onPress={() => alert("edit")} />
          </Card.Actions>
        </Card>
      );
    }) || [];

  return (
    <View style={styles.container}>
      {cards}

      <Portal>
        <Dialog
          visible={visible}
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
