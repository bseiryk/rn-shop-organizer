import React from "react";

import { Text, TouchableHighlight } from "react-native";

import SwiperWrapper from "./Swiper";

export default ({ onLongPress, onDelete, value, id }) => (
  <SwiperWrapper onDelete={onDelete} id={id}>
    <TouchableHighlight
      style={{
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5,
        minHeight: 38,
        marginLeft: 10,
        backgroundColor: "black",
        borderLeftWidth: 1,
        borderLeftColor: "#499eba"
      }}
      onLongPress={() => onLongPress(value)}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18
        }}
      >
        {value}
      </Text>
    </TouchableHighlight>
  </SwiperWrapper>
);
