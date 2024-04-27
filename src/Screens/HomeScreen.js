import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FAB, Card } from "react-native-paper";
import { useSelector } from "react-redux";

export default function HomeScreen({ navigation }) {
  const notes = useSelector((state) => state.note.notes);

  const cards = notes.map((n) => {
    return (
      <Card>
        <Card.Title title={n.title} />
        <Card.Content>
          <Text>{n.text}</Text>
        </Card.Content>
        <Card.Actions>
          <FAB icon="delete" size="small" onPress={() => alert("delete")} />
          <FAB icon="pencil" size="small" onPress={() => alert("edit")} />
        </Card.Actions>
      </Card>
    );
  });

  return (
    <View style={styles.container}>
      {cards}

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
});
