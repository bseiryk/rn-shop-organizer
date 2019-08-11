/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React, {Component, useReducer} from 'react';

import {Text, TouchableHighlight, View} from 'react-native';
import { Navigation } from "react-native-navigation";

import App from './src/App';
import ListOfThemes from './src/ListOfThemes';
import Items from './src/Items';
import {name as appName} from './app.json';
import './database';

Navigation.registerComponent(`List.Of.Themes`, () => ListOfThemes);
Navigation.registerComponent(`items`, () => Items);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
        stack: {
          children: [{
            component: {
              name: "List.Of.Themes",
              options: {
                topBar: {
                  title: {
                      text: 'list of groups'
                  }
                }
              }
            }
          }]
        }
      }
  });
});

