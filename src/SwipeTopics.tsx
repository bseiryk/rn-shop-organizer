import React from "react";

import { Text, TouchableHighlight } from "react-native";

import SwiperWrapper from "./Swiper";

export default ({ onLongPress, onPress, onDelete, id, name }) => {
  return (
    <SwiperWrapper onDelete={onDelete} id={id}>
      <TouchableHighlight
        style={{
          paddingTop: 10,
          width: 250,
          height: 50,
          backgroundColor: "black",
          borderRadius: 5
        }}
        onPress={() => onPress(id, name)}
        onLongPress={() => onLongPress(id, name)}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            textAlign: "center"
          }}
        >
          {name}
        </Text>
      </TouchableHighlight>
    </SwiperWrapper>
  );
};
