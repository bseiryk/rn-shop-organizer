import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import SwiperItems from "./SwiperItems";
import db from "../database";
import Icon from "react-native-vector-icons/FontAwesome";

let editItem = null;

export default props => {
  const [topic, setTopic] = useState(null);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    db.collection("topicsContent")
      .where("parentId", "==", props.id)
      .onSnapshot(snapshot => {
        let response = {};
        if (snapshot.docs.length) {
          response = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
          };
        }
        setTopic(response);
      });
  }, []);

  const onSend = () => {
    if (topic.id) {
      const data = editItem
        ? topic.data.map(el => (el === editItem ? inputVal : el))
        : topic.data.concat(inputVal);
      db.collection("topicsContent")
        .doc(topic.id)
        .update({ data });
    } else {
      db.collection("topicsContent").add({
        parentId: props.id,
        data: [inputVal]
      });
    }
    editItem = null;
    setInputVal("");
  };

  const onDelete = val => {
    db.collection("topicsContent")
      .doc(topic.id)
      .update({
        data: topic.data.filter(el => el !== val)
      });
  };

  const onLongPress = val => {
    editItem = val;
    setInputVal(val);
  };

  const onCancelEdit = () => {
    editItem = null;
    setInputVal("");
  };

  const content = !topic ? (
    <ActivityIndicator
      style={{ marginTop: 200 }}
      size="large"
      color="#0d1c21"
    />
  ) : topic.data && topic.data.length ? (
    topic.data.map(el => (
      <SwiperItems
        onLongPress={onLongPress}
        onDelete={onDelete}
        key={el}
        value={el}
        id={el}
      />
    ))
  ) : (
    <Text style={{ color: "#499eba", textAlign: "center" }}>Нет Элементов</Text>
  );
  return (
    <View
      style={{
        justifyContent: "flex-start",
        backgroundColor: "#1c3247",
        height: "100%"
      }}
    >
      <ScrollView>{content}</ScrollView>
      <View
        style={{
          marginTop: "auto",
          backgroundColor: "#1c3247",
          borderTopColor: "#295969",
          borderTopWidth: 1
        }}
      >
        {editItem && (
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#295969",
              paddingRight: 15,
              paddingLeft: 10
            }}
          >
            <View>
              <Text style={{ color: "#499eba" }}>Изменения</Text>
              <Text style={{ color: "white" }}>{editItem}</Text>
            </View>
            <TouchableOpacity
              style={{
                alignContent: "center",
                alignSelf: "center",
                marginLeft: "auto"
              }}
              onPress={onCancelEdit}
            >
              <Icon size={30} name="remove" color="#499eba" />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <TextInput
            style={{
              color: "white",
              height: 40,
              width: "85%"
            }}
            onChangeText={text => setInputVal(text)}
            value={inputVal}
            placeholderTextColor="#499eba"
            placeholder="введите название ..."
          />
          {!!inputVal && (
            <View
              style={{
                width: 55,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity onPress={onSend}>
                <Icon size={20} name="send" color="#499eba" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
