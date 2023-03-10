import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Custom from './Custom';
import Review from './Review';
import Profile from './Profile';
import {Image, StyleSheet, View} from 'react-native';
import {icons} from '../constants';
import {COLORS_THEME} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Test from './Test';
import CustomScreen from './CustomScreen';
import Dev from './Dev';
import Rehide from '../components/loopComponents/rehide';
import SingleImg from '../components/loopComponents/singleImg';
import Writing from '../components/loopComponents/writing';
import Cards from '../components/loopComponents/cards';
import PlaceHolderComp from '../components/loopComponents/placeholder';
import MissedChar from '../components/loopComponents/missedChar';
import FindIt from '../components/loopComponents/findit/index';
import CardsImg from '../components/loopComponents/cardsImg';
import ReType from '../components/loopComponents/retype';
import Hearing from '../components/loopComponents/hearing';
import Initialize from './Initialize';
import Matching from '../components/loopComponents/matching';
const Tab = createBottomTabNavigator();

const TabScreen = () => {
  const darkTheme = true;

  return (
    <Tab.Navigator
      // barStyle={{}}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
            height: 50,
            zIndex: 100,
            backgroundColor: darkTheme
              ? COLORS_THEME.bgDark
              : COLORS_THEME.bgWhite,
            borderTopWidth: 1,
            borderTopColor: darkTheme
              ? COLORS_THEME.textWhite
              : COLORS_THEME.textDark,
          },
          null,
        ],
      }}
      initialRouteName="Test">
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.shadow_o : styles.shadow_w}>
              <MaterialCommunityIcons
                name={focused ? 'lightbulb' : 'lightbulb-outline'}
                size={30}
                color={focused ? COLORS_THEME.primary : '#fff'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.shadow_o : styles.shadow_w}>
              <MaterialCommunityIcons
                name={focused ? 'lightbulb' : 'lightbulb-outline'}
                size={30}
                color={focused ? COLORS_THEME.primary : '#fff'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Custom"
        component={CustomScreen}
        options={{
          tabBarLabel: 'Custom',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.shadow_o : styles.shadow_w}>
              <MaterialCommunityIcons
                name={focused ? 'lightbulb' : 'lightbulb-outline'}
                size={30}
                color={focused ? COLORS_THEME.primary : '#fff'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CustomScreen"
        component={SingleImg}
        options={{
          tabBarLabel: 'CustomScreen',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.shadow_o : styles.shadow_w}>
              <MaterialCommunityIcons
                name={focused ? 'lightbulb' : 'lightbulb-outline'}
                size={30}
                color={focused ? COLORS_THEME.primary : '#fff'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Initialize}
        options={{
          // tabBarStyle: {display: 'none'},
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.shadow_o : styles.shadow_w}>
              <MaterialCommunityIcons
                name={focused ? 'lightbulb' : 'lightbulb-outline'}
                size={30}
                color={focused ? COLORS_THEME.primary : '#fff'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 25,
    height: 25,
  },
  shadow_w: {
    shadowColor: '#b8e1fd',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0,
    shadowRadius: 16,
    elevation: 4,
  },
  shadow_o: {
    shadowColor: '#f78a0b',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0,
    shadowRadius: 16,
    elevation: 4,
  },
});

export default TabScreen;
