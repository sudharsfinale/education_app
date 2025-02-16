import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "@/context/UserDetailContext";

const SignIn = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  //@ts-ignore
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, userInfo?.email, userInfo?.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await getUserDetail();
        setLoading(false);
        router.replace("/(tabs)/Home");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
      });
  };
  const getUserDetail = async () => {
    let result = await getDoc(doc(db, "users", userInfo?.email));
    if (result.exists()) {
      setUserDetail(result.data());
    } else {
      console.log("No such document!");
    }
    console.log("getUserDetail", result.data());
  };
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 180, height: 180 }}
        source={require("@/assets/images/logo.png")}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 26 }}>
        Welcome Back
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={userInfo?.email}
          style={styles.input}
          onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
          placeholder="E-mail"
        />
        <TextInput
          value={userInfo?.password}
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
          placeholder="Password"
        />
      </View>
      <View style={{ width: "100%" }}>
        <Pressable
          onPress={onSignInClick}
          android_ripple={{ color: colors.Primary }}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color={colors.White} />
          ) : (
            <Text style={[styles.buttonText]}>Sign In</Text>
          )}
        </Pressable>
      </View>
      <Text style={styles.bottomText}>
        Don't have an account ?{" "}
        <Text
          onPress={() => router.push("/auth/SignUp")}
          style={styles.bottomTextLink}
        >
          Create New Here
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.White,
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
  inputContainer: {
    gap: 16,
    marginHorizontal: 16,
    width: "90%",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 16,
    fontSize: 18,
    borderColor: "#e7e7e7",
  },
  button: {
    backgroundColor: colors.Primary,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "outfit-regular",
    color: "white",
  },
  bottomText: {
    marginTop: 20,
    fontFamily: "outfit-regular",
    fontSize: 16,
  },
  bottomTextLink: {
    color: colors.Primary,
    marginTop: 20,
    fontFamily: "outfit-regular",
    fontSize: 16,
  },
});

export default SignIn;
