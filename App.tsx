import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, Text, View, StatusBar as ReactStatusBar } from 'react-native';
import MainPageList from "./src/pages/MainPageList";
import CreateReminder from "./src/pages/CreateReminder"
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UpdateReminder from "./src/pages/UpdateReminder";

NavigationBar.setPositionAsync('absolute');
NavigationBar.setBackgroundColorAsync('#ffffff01');

export default function App() {
    const Stack = createNativeStackNavigator();

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"MainPageList"} screenOptions={{headerShown : false, animation: "fade_from_bottom", presentation: "modal"}}>
              <Stack.Screen
                  name="MainPageList"
                  component={MainPageList}
              />

              <Stack.Screen
                  name={"CreateReminder"}
                  component={CreateReminder}
                  />
              <Stack.Screen
                  name={"UpdateReminder"}
                  component={UpdateReminder}
              />
          </Stack.Navigator>
          <StatusBar translucent style="light" backgroundColor="transparent" />
        <ReactStatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1B20',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#C7C6CA',
  },
});
