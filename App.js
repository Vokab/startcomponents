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
import Cards from './src/components/cards';
import Discover from './src/components/discover';
import Writing from './src/components/writing';
import Matching from './src/components/matching';
import FindIt from './src/components/findit';
import PlaceHolderComp from './src/components/placeholder';
import MissedChar from './src/components/missedChar';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar hidden={true} />
      {/* <Discover /> */}
      {/* <Writing /> */}
      {/* <Cards /> */}
      {/* <Matching /> */}
      <FindIt />
      {/* <PlaceHolderComp /> */}
      {/* <MissedChar /> */}
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
