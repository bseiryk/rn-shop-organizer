import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import DialogInput from "react-native-dialog-input";

import { Navigation } from "react-native-navigation";

// refactoring && buld

// design
// scroll
// multiple relation delete
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import SwipeTopics from "./SwipeTopics";
import db from "../database";

let editTopic = null;

export default props => {
  const [topics, setTopics] = useState(null);
  const [visible, toggleModal] = useState(false);
  const [initValueTextInput, setInitValueTextInput] = useState();

  const onEditAddTopic = name => {
    if (editTopic) {
      const isOld = topics.find(el => el.name === name);
      if (!isOld) {
        db.collection("topics")
          .doc(editTopic)
          .update({ name });
      }
    } else db.collection("topics").add({ name });
    toggleModal(false);
    setInitValueTextInput(undefined);
  };

  const onDelete = async id => {
    const deleting = await db
      .collection("topicsContent")
      .where("parentId", "==", id)
      .get();
    if (deleting.docs.length) {
      db.collection("topicsContent")
        .doc(deleting.docs[0].id)
        .delete();
    }
    db.collection("topics")
      .doc(id)
      .delete();
  };

  const onTopicItemLongPress = (id, name) => {
    setInitValueTextInput(name);
    toggleModal(true);
    editTopic = id;
  };

  const onTopicItemPress = (id, name) => {
    Navigation.push(props.componentId, {
      component: {
        name: "topic.content",
        passProps: {
          id
        },
        options: {
          topBar: {
            title: {
              text: name
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    db.collection("topics").onSnapshot(snapshot => {
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

  const content = !topics ? (
    <ActivityIndicator
      style={{ marginTop: 200 }}
      size="large"
      color="#0d1c21"
    />
  ) : topics.length ? (
    topics.map(el => (
      <SwipeTopics
        onLongPress={onTopicItemLongPress}
        onPress={onTopicItemPress}
        key={el.id}
        id={el.id}
        name={el.name}
        onDelete={onDelete}
      />
    ))
  ) : (
    <Text style={{ color: "#499eba" }}>Нет Элементов</Text>
  );

  return (
    <View
      style={{
        justifyContent: "flex-start",
        backgroundColor: "#1c3247",
        alignItems: "center",
        height: "100%"
      }}
    >
      <ScrollView>{content}</ScrollView>
      <View
        style={{
          alignSelf: "flex-end",
          marginTop: "auto",
          marginRight: 25,
          marginBottom: 25
        }}
      >
        <TouchableHighlight onPress={() => toggleModal(true)}>
          <Icon size={60} name="ios-add-circle-outline" color="#499eba" />
        </TouchableHighlight>
      </View>
      <DialogInput
        isDialogVisible={visible}
        title={"Название раздела"}
        initValueTextInput={initValueTextInput}
        submitInput={value => onEditAddTopic(value)}
        closeDialog={() => {
          toggleModal(false);
          setInitValueTextInput(undefined);
          editTopic = null;
        }}
      />
    </View>
  );
};
