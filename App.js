import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { store } from "./src/Store";
import { Provider } from "react-redux";
import Navigator from "./src/Navigator";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={MD3DarkTheme}>
        <Navigator></Navigator>
      </PaperProvider>
    </Provider>
  );
}
