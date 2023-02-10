/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StatusBar,
  Text,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store, {persistor} from './src/redux/createStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const RNapp = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle={'dark-content'}
            showHideTransition={'slide'}
            hidden={true}
          />
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

AppRegistry.registerComponent(appName, () => RNapp);
