import HomeScreen from "./src/Screens/HomeScreen";
import AddScreen from "./src/Screens/AddScreen";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Note" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
