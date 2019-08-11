import React, { useEffect, useState } from "react";

import { Navigation } from "react-native-navigation";

// doubel tap (se native)
// swipe
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";
import SwipeWrapper from "./SwipeWrapper";
import db from "../database";

export default props => {
  const [topics, setTopics] = useState([]);

  const onPress = () => {
    Navigation.push(props.componentId, {
      component: {
        name: "items",
        passProps: {
          text: "Pushed screen"
        },
        options: {
          topBar: {
            title: {
              text: "Itemss"
            }
          }
        }
      }
    });
  };

  const onDelete = id => {
    db.collection("topics")
      .doc(id)
      .delete();
  };

  useEffect(() => {
    db.collection("topics").onSnapshot(snapshot => {
      console.log(snapshot);
      const response = [];
      snapshot.docs.forEach(el => {
        response.push({
          id: el.id,
          ...el.data()
        });
      });
      setTopics(response);
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#000000", height: "100%" }}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        {topics.map(el => (
          <SwipeWrapper
            key={el.id}
            id={el.id}
            name={el.name}
            onDelete={onDelete}
          />
        ))}
      </View>
      <TouchableHighlight onPress={onPress}>
        <Text>press</Text>
      </TouchableHighlight>
    </View>
  );
};
