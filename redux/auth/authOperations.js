import db from "../../firebase/config";
import { authSlice } from "./authSlice";
import { Toast } from "toastify-react-native";

export const authSignUpUser =
  ({ login, mail, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(mail, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        email: mail,
      });

      const { displayName, uid, email } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email: email,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
      if (
        error.message ===
        "The email address is already in use by another account."
      ) {
        Toast.error("Данный email занят.", "top", 5000);
      }
      if (error.message === "The email address is badly formatted.") {
        Toast.error("Неверный формат email.", "top", 5000);
      }
      if (error.message === "Password should be at least 6 characters") {
        Toast.error("Длина пароля min 6 символов. ", "top", 5000);
      }
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      if (error) {
        Toast.error("Неверные данные пользователя.", "top", 5000);
      }
      if (error.message === "The email address is badly formatted.") {
        Toast.error("Неверный формат email.", "top", 5000);
      }
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};
