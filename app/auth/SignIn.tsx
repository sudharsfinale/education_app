import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";

const SignIn = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
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
          onPress={() => {}}
          android_ripple={{ color: colors.Primary }}
          style={styles.button}
        >
          <Text style={[styles.buttonText]}>Sign In</Text>
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
