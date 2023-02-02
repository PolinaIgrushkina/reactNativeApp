import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import db from "../firebase/config";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [locationName, setLocationName] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
    })();
  }, []);

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access camera was denied");
      return;
    }
    const photo1 = await camera.takePictureAsync();
    setPhoto(photo1.uri);
  };

  const sendPhoto = async () => {
    uploadPostToServer();

    navigation.navigate("Home", { photo, location, photoName, locationName });

    setPhoto(null);
    setLocation(null);
    setPhotoName(null);
    setLocationName(null);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    const createPost = await db.firestore().collection("posts").add({
      photo,
      photoName,
      location,
      locationName,
      userId,
      login,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const clearAll = () => {
    setPhoto(null);
    setPhotoName(null);
    setLocationName(null);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{
                height: 240,
                width: Dimensions.get("window").width - 32,
                borderRadius: 8,
              }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <FontAwesome name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.textUnderCamera}>Загрузите фото</Text>
      <TextInput
        placeholder="Название..."
        placeholderTextColor="#BDBDBD"
        style={styles.firstInput}
        value={photoName}
        onChangeText={(value) => setPhotoName(value)}
      ></TextInput>
      <View>
        <TextInput
          placeholder="Местность..."
          placeholderTextColor="#BDBDBD"
          style={styles.secondInput}
          value={locationName}
          onChangeText={(value) => setLocationName(value)}
        ></TextInput>
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={styles.iconMap}
        />
      </View>
      <TouchableOpacity
        onPress={sendPhoto}
        activeOpacity={0.8}
        style={photo && photoName && locationName ? styles.btn : styles.disable}
      >
        <Text
          style={
            photo && photoName && locationName
              ? styles.btnTitle
              : styles.disableTitle
          }
        >
          Опубликовать
        </Text>
      </TouchableOpacity>

      <View style={styles.deleteContainer}>
        <TouchableOpacity
          onPress={clearAll}
          activeOpacity={0.8}
          style={styles.delete}
        >
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  camera: {
    height: 240,
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  snapContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textUnderCamera: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 16,
  },
  firstInput: {
    height: 50,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    alignItems: "center",
    marginTop: 16,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  secondInput: {
    position: "relative",
    height: 50,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    alignItems: "center",
    marginTop: 16,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 28,
  },
  iconMap: {
    position: "absolute",
    top: 26,
    left: 0,
  },
  btn: {
    marginTop: 32,
    marginBottom: 120,
    height: 51,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  disable: {
    marginTop: 32,
    marginBottom: 120,
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  disableTitle: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  deleteContainer: {
    alignItems: "center",
  },
  delete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
