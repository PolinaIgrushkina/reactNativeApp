import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase/config";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/bg-photo.jpg")}
      >
        <View style={styles.gallery}>
          <Image
            source={require("../assets/images/user.png")}
            style={styles.avatar}
          />
          <Text style={styles.login}>{login}</Text>

          <FlatList
            data={userPosts}
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 147,
  },
  gallery: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 43,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    left: 128,
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  login: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
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
