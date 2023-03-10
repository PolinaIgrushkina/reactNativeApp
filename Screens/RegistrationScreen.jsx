import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import ToastManager from "toastify-react-native";

import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { authSignUpUser } from "../redux/auth/authOperations";

export default function RegistrationScreen({ navigation }) {
  const initialState = {
    login: "",
    mail: "",
    password: "",
    avatar: null,
  };

  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const [isOnFocusFirst, setIsOnFocusFirst] = useState(false);
  const [isOnFocusSecond, setIsOnFocusSecond] = useState(false);
  const [isOnFocusThird, setIsOnFocusThird] = useState(false);

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const changeIsPasswordSecure = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  const onReturn = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setIsOnFocusSecond(false);
    setIsOnFocusThird(false);
  };

  const onRegistration = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));

    setstate(initialState);
  };

  const onScreenTouch = () => {
    setIsShowKeyboard(false);
    setIsOnFocusFirst(false);
    setIsOnFocusSecond(false);
    setIsOnFocusThird(false);
    Keyboard.dismiss();
  };

  const onFocusFirstInput = () => {
    setIsShowKeyboard(true);
    setIsOnFocusFirst(true);
    setIsOnFocusSecond(false);
    setIsOnFocusThird(false);
  };

  const onFocusSecondInput = () => {
    setIsShowKeyboard(true);
    setIsOnFocusSecond(true);
    setIsOnFocusThird(false);
    setIsOnFocusFirst(false);
  };

  const onFocusThirdInput = () => {
    setIsShowKeyboard(true);
    setIsOnFocusThird(true);
    setIsOnFocusFirst(false);
    setIsOnFocusSecond(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setstate((prevState) => ({ ...prevState, avatar: result.assets[0].uri }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenTouch}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/bg-photo.jpg")}
        >
          <ToastManager style={styles.toast} />
          <View
            style={{
              ...Platform.select({
                ios: {
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 140 : 0,
                },
                android: {
                  ...styles.form,
                },
              }),
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={{ position: "absolute", top: -55, left: 128 }}>
                <View style={styles.avatar}>
                  {state.avatar ? (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          setstate((prevState) => ({
                            ...prevState,
                            avatar: null,
                          }))
                        }
                        style={styles.icon}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={25}
                          color="#E8E8E8"
                        />
                      </TouchableOpacity>
                      <Image
                        source={{ uri: state.avatar }}
                        style={styles.avatarImage}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity onPress={pickImage} style={styles.icon}>
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <Text style={styles.formTitle}>??????????????????????</Text>
              <TextInput
                onSubmitEditing={onReturn}
                value={state.login}
                onFocus={onFocusFirstInput}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, login: value }))
                }
                placeholder="??????????"
                placeholderTextColor="#BDBDBD"
                style={{
                  ...styles.input,
                  borderColor: isOnFocusFirst ? "#FF6C00" : "#E8E8E8",
                }}
              />
              <TextInput
                onSubmitEditing={onReturn}
                value={state.mail}
                onFocus={onFocusSecondInput}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, mail: value }))
                }
                placeholder="?????????? ?????????????????????? ??????????"
                placeholderTextColor="#BDBDBD"
                style={{
                  ...styles.input,
                  borderColor: isOnFocusSecond ? "#FF6C00" : "#E8E8E8",
                }}
              />
              <TextInput
                onSubmitEditing={onReturn}
                value={state.password}
                onFocus={onFocusThirdInput}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
                placeholder="????????????"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={isPasswordSecure}
                style={{
                  ...styles.input,
                  borderColor: isOnFocusThird ? "#FF6C00" : "#E8E8E8",
                }}
              />

              <Text
                style={styles.swowPassword}
                onPress={changeIsPasswordSecure}
              >
                {isPasswordSecure ? "????????????????" : "????????????"}
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onRegistration}
              >
                <Text style={styles.btnTitle}> ????????????????????????????????????</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>?????? ???????? ??????????????? ??????????</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 549,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    zIndex: 100,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  formTitle: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 97,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
  },
  input: {
    position: "relative",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  swowPassword: {
    position: "absolute",
    top: 320,
    right: 32,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    marginTop: 43,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  toast: {
    width: Dimensions.get("window").width - 32,
  },
});
