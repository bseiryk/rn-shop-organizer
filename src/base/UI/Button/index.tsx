import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const styles = {
    view: {
        height: 35,
        width: 100,
        borderRadius: 5,
        borderColor: 'rgba(58, 161, 255, 1)', 
        borderWidth: 1,
        backgroundColor: 'white',
        color: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'rgba(58, 161, 255, 1)',
        fontFamily: 'DancingScript-Bold',
        fontSize: 20,
    }
};

export default (props: any) => (
    <TouchableOpacity onPress={props.onPress}>
        <View {...props} style={{...styles.view, ...props.style}}>
            <Text style={styles.text}>
                {props.label}
            </Text>
        </View>
    </TouchableOpacity>
);