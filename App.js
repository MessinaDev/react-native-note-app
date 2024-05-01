import HomeScreen from "./src/Screens/HomeScreen";
import DetailsNote from "./src/Screens/DetailsNote";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { store } from "./src/Store";
import { Provider } from "react-redux";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={MD3DarkTheme}>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Note"
              component={DetailsNote}
              options={{ title: "Note" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
