import React, { useState } from "react";

import { Text, Animated, PanResponder } from "react-native";

let initAnim = 0;

export default props => {
  const [swipeDistance] = useState(new Animated.Value(0));

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      initAnim = gestureState.x0;
    },
    onPanResponderMove: (evt, gestureState) => {
      Animated.timing(swipeDistance, {
        toValue: gestureState.moveX - initAnim,
        duration: 0
      }).start();
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.moveX - initAnim > 50) {
        props.onDelete(props.id);
      } else {
        Animated.timing(swipeDistance, {
          toValue: 0,
          duration: 0
        }).start();
      }
    }
  });

  return (
    <Animated.View
      {..._panResponder.panHandlers}
      style={{
        marginTop: 20,
        paddingTop: 10,
        width: 250,
        height: 50,
        backgroundColor: "#2c2c2c",
        borderRadius: 30,
        transform: [
          {
            translateX: swipeDistance
          }
        ]
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 18,
          textAlign: "center"
        }}
      >
        {props.name}
      </Text>
    </Animated.View>
  );
};
