import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Discover from './src/components/discover';
import Writing from './src/components/writing';
const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar hidden={true} />
      {/* <Discover /> */}
      <Writing />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#181920',
  },
});

export default App;
