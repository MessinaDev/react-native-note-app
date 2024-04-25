import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FAB } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 25,
          bottom: 40,
        }}
      >
        <FAB icon="plus" onPress={() => navigation.navigate("Note")} />
      </TouchableOpacity>
      <Text style={{ color: "red" }}>Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
