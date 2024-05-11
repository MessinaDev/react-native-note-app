import HomeScreen from "./Screens/HomeScreen";
import DetailsNote from "./Screens/DetailsNote";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { sort } from "./Store/noteSlice";

const iconNameDescendingOrder = "sort-calendar-descending";

export default function Navigator() {
  const Stack = createNativeStackNavigator();
  const [iconSort, setIconSort] = useState(iconNameDescendingOrder);

  const dispatch = useDispatch();

  function sortNotes() {
    if (iconSort === iconNameDescendingOrder) {
      dispatch(sort(true));
      setIconSort("sort-calendar-ascending");
    } else {
      dispatch(sort(false));
      setIconSort(iconNameDescendingOrder);
    }
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity>
                <IconButton icon={iconSort} onPress={() => sortNotes()} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Note"
          component={DetailsNote}
          options={{ title: "Note" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
