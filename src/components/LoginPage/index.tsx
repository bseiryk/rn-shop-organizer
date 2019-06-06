import React from 'react'
import {Platform, StyleSheet, Text, View,  ImageBackground } from 'react-native';
import TextInput from '../../base//UI/TextInput'
import Button from '../../base//UI/Button'


export default () => {
      return (
        <ImageBackground 
          style={{width: '100%', height: '100%'}}
          source={require('../../../assets/loginBackground.png')}>
            <View style={styles.appNameWrapp}>
              <Text style={styles.appName}>My awesome dictionary</Text>
            </View>
            <View style={styles.loginWrapp}>
              <View style={styles.inputsWrapp}>
                <TextInput
                    style={styles.inputsStyle}
                    placeholder="email"
                />
                <TextInput
                    style={styles.inputsStyle}
                    placeholder="password"
                />
                <TextInput
                    style={styles.inputsStyle}
                    placeholder="conform password"
                />
              </View>
              <Button label="Submit" style={styles.submitButton} />
            </View>
          </ImageBackground>
      );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    appNameWrapp: {
      paddingLeft: 15,
      paddingTop: 15,
    },
    appName: {
      paddingLeft: 15,
      paddingTop: 20,
      fontSize: 30,
      color: '#050505',
      fontFamily: 'DancingScript-Bold'
    },
    loginWrapp: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1
    },
    inputsWrapp: {
      alignSelf: 'center',
    },
    inputsStyle: {
      borderColor: 'black',
      marginTop: 20
    },
    submitButton: {
      alignSelf:'center',
      marginTop: 20
    },
  });