import React, { useState } from "react";

import { Animated, PanResponder } from "react-native";

let initAnim = 0;

export default ({ onDelete, id, children }) => {
  const [swipeDistance] = useState(new Animated.Value(0));

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
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
        onDelete(id);
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
        transform: [
          {
            translateX: swipeDistance
          }
        ]
      }}
    >
      {children}
    </Animated.View>
  );
};
