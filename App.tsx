import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet, Text, View, StatusBar as ReactStatusBar } from 'react-native';
import MainPageList from "./src/pages/MainPageList";
import {NavigationContainer} from "@react-navigation/native";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

export default function App() {
  return (
      <NavigationContainer>
        <View style={styles.container}>
            <MainPageList></MainPageList>
            <StatusBar style="auto" backgroundColor="#1D1B20" />
            <ReactStatusBar barStyle="light-content" backgroundColor="#1D1B20" />
        </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#1D1B20',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#C7C6CA'
  },
});
