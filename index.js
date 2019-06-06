/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React, {Component, useReducer} from 'react';

import {Text} from 'react-native';
import { Navigation } from "react-native-navigation";

import App from './src/App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});
