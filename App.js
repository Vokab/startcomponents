import 'react-native-gesture-handler';
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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Cards from './src/components/loopComponents/cards';
// import Discover from './src/components/loopComponents/discover';
// import Writing from './src/components/loopComponents/writing';
// import Matching from './src/components/loopComponents/matching';
// import FindIt from './src/components/loopComponents/findit';
// import PlaceHolderComp from './src/components/loopComponents/placeholder';
// import MissedChar from './src/components/loopComponents/missedChar';
import TabScreen from './src/screens/TabScreen';
import Home from './src/screens/Home';
import Loop from './src/screens/Loop';
import Discover from './src/components/loopComponents/discover';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Home" component={Discover} /> */}
        <Stack.Screen name="TabScreen" component={TabScreen} />
        <Stack.Screen name="Loop" component={Loop} />
      </Stack.Navigator>
      {/* <Discover /> */}
      {/* <Writing /> */}
      {/* <Cards /> */}
      {/* <Matching /> */}
      {/* <FindIt /> */}
      {/* <PlaceHolderComp /> */}
      {/* <MissedChar /> */}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});

export default App;
