
import React, {Component, useReducer} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground} from 'react-native';
import LoginPage from './components/LoginPage';

export default () => {
    return (
      <View style={styles.container}>
        <LoginPage />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});