import { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Color } from "./src/styles/Color";
import { Theme } from "./src/context/Theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Keypad from "./src/components/Keypad";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <Theme.Provider value={theme}>
      <SafeAreaView
        style={[
          styles.container,
          theme === "light" ? {} : { backgroundColor: Color.dark },
        ]}
      >
        <View style={styles.switchContainer}>
          <Icon
            name={theme === "light" ? "weather-sunny" : "weather-night"}
            size={30}
            color={theme === "light" ? Color.black : Color.white}
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </View>

        <Keypad theme={theme} />

      </SafeAreaView>
    </Theme.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 800,
  },
  switchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
});
