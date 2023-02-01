import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import db from "../firebase/config";

import { Feather } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.avatar}
        />
        <View style={styles.userNameAndEmail}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.photoTitle}>{item.photoName}</Text>
            <View style={styles.commentsAndLocation}>
              <TouchableOpacity
                style={styles.comments}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    photo: item.photo,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentsAmount}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.location}
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.location,
                    photoName: item.photoName,
                  })
                }
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationName}>{item.locationName}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userNameAndEmail: {
    height: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  post: {
    height: 299,
    marginTop: 32,
  },
  photo: {
    width: Dimensions.get("window").width - 32,
    height: 240,
    borderRadius: 8,
  },
  photoTitle: {
    marginBottom: 8,
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentsAndLocation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comments: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentsAmount: {
    marginLeft: 6,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    marginLeft: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
