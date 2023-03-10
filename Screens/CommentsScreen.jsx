import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";

import db from "../firebase/config";

export default function CommentsScreen({ route }) {
  const { postId, photo } = route.params;
  const currentDate = new Date().toString();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [comment, setComment] = useState("");

  const [allComments, setAllComments] = useState([]);

  const { login, avatar } = useSelector((state) => state.auth);

  useEffect(async () => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const data = await db.firestore().collection("posts").doc(postId).get();

    setAllComments(data.data().comments);
  };

  const addNewComment = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        comments: [
          ...allComments,
          { comment, login, date: currentDate, avatar },
        ],
      });

    getAllComments();

    setComment("");
  };

  const onReturn = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onFocusInput = () => {
    setIsShowKeyboard(true);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />

      <FlatList
        data={allComments}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.comment}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <View style={styles.dateAndTime}>
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateText}>
                    {moment(item.date).format("D MMM, YYYY")}
                  </Text>
                </View>
                <Text style={styles.timeText}>
                  {moment(item.date).format("hh:mm")}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...Platform.select({
              ios: {
                ...styles.inputContainer,
                marginBottom: isShowKeyboard ? 120 : 0,
              },
            }),
          }}
        >
          <TextInput
            onSubmitEditing={onReturn}
            value={comment}
            onChangeText={(value) => setComment(value)}
            style={styles.input}
            onFocus={onFocusInput}
            placeholder="????????????????????????????..."
            placeholderTextColor="#BDBDBD"
          />

          <TouchableOpacity onPress={addNewComment} style={styles.sendBtn}>
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  photo: {
    width: Dimensions.get("window").width - 32,
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  commentsContainer: {
    flex: 1,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: "50%",
    marginRight: 16,
  },
  comment: {
    width: 299,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 16,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  dateAndTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateTextContainer: {
    borderRightWidth: 1,
    borderRightColor: "#BDBDBD",
    paddingRight: 4,
    marginRight: 4,
  },
  dateText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
  },
  timeText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
  },
  inputContainer: {
    marginTop: 6,
  },
  input: {
    position: "relative",
    height: 50,
    width: Dimensions.get("window").width - 32,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 34,
    width: 34,
    borderRadius: "50%",
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});
