import React from 'react';
import { TextInput } from 'react-native';

const styles = {
    height: 40,
    width: 250,
    borderRadius: 5,
    borderColor: 'gray', 
    borderWidth: 1,
    fontFamily: 'DancingScript-Bold'
};

export default (props: any) => {
    return <TextInput {...props} style={{...styles, ...props.style}} />
}