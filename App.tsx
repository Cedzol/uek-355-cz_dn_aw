import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet, Text, View, StatusBar as ReactStatusBar } from 'react-native';
import MainPageList from "./src/pages/MainPageList";
import CreateReminder from "./src/pages/CreateReminder"
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"MainPageList"} screenOptions={{headerShown : false}}>
              <Stack.Screen
                  name="MainPageList"
                  component={MainPageList}
              />

              <Stack.Screen
                  name={"CreateReminder"}
                  component={CreateReminder}
                  />
          </Stack.Navigator>
          <StatusBar style="auto" backgroundColor="#1D1B20" />
          <ReactStatusBar barStyle="light-content" backgroundColor="#1D1B20" />
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
