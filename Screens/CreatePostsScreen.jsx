import React, { useState } from "react";
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
import * as Location from "expo-location";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

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
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    navigation.navigate("Home", { photo, location });
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
      ></TextInput>
      <View>
        <TextInput
          placeholder="Местность..."
          placeholderTextColor="#BDBDBD"
          style={styles.secondInput}
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
        style={styles.btn}
      >
        <Text style={styles.btnTitle}>Опубликовать</Text>
      </TouchableOpacity>
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
    height: 51,
    backgroundColor: "#ff6c00",
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
});
