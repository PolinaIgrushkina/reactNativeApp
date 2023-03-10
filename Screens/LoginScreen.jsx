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
} from "react-native";
import ToastManager from "toastify-react-native";

import { useDispatch } from "react-redux";

import { authSignInUser } from "../redux/auth/authOperations";

export default function LoginScreen({ navigation }) {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

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
    dispatch(authSignInUser(state));
    setstate(initialState);
  };

  const onScreenTouch = () => {
    setIsShowKeyboard(false);
    setIsOnFocusSecond(false);
    setIsOnFocusThird(false);
    Keyboard.dismiss();
  };

  const onFocusSecondInput = () => {
    setIsShowKeyboard(true);
    setIsOnFocusSecond(true);
    setIsOnFocusThird(false);
  };

  const onFocusThirdInput = () => {
    setIsShowKeyboard(true);
    setIsOnFocusThird(true);
    setIsOnFocusSecond(false);
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
                  marginBottom: isShowKeyboard ? 58 : 0,
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
              <Text style={styles.formTitle}>??????????</Text>
              <TextInput
                onSubmitEditing={onReturn}
                value={state.email}
                onFocus={onFocusSecondInput}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
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
                <Text style={styles.btnTitle}>??????????</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.registration}>
                  ?????? ????????????????? ????????????????????????????????????
                </Text>
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 489,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  formTitle: {
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
  },
  input: {
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
    top: 152,
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
  registration: {
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
