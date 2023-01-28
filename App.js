/** @format */

import AppRout from "./Src/Navigations/AppRout";
import { StatusBar, View } from "react-native";
import { Colors } from "./assets/theme";
function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.secondary} barStyle="light-content" />
      <AppRout />
    </View>
  );
}
export default App;
