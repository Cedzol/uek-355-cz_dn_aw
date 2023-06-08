import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainPageList from "./src/pages/MainPageList";

export default function App() {
  return (
    <View style={styles.container}>
      <MainPageList></MainPageList>
      <StatusBar style="auto" />
    </View>
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
