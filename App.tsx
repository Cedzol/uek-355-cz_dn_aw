import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, Text, View, StatusBar as ReactStatusBar } from 'react-native';
import MainPageList from './src/pages/MainPageList';
import { NavigationContainer } from '@react-navigation/native';

NavigationBar.setPositionAsync('absolute');
NavigationBar.setBackgroundColorAsync('#ffffff01');

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <MainPageList />
        <StatusBar translucent style="light" backgroundColor="transparent" />
        <ReactStatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      </View>
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
