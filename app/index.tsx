import React from "react";
import { colors } from "@/constants/Colors";
import { Image, Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/images/landing.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Welcome to My Learning App</Text>
        <Text style={styles.subtitle}>
          Transform your ideas into engaging educational content, effortlessly
          with Ai 🤖📚
        </Text>
        <Pressable
          onPress={() => router.push("/auth/SignUp")}
          android_ripple={{ color: colors.Primary }}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: colors.Primary }]}>
            Get Started
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/auth/SignIn")}
          style={[
            styles.button,
            {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: colors.White,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.White }]}>
            Already Have an Account ?
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    justifyContent: "flex-end",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: "100%",
  },
  contentWrapper: {
    backgroundColor: "dodgerblue",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 20,
    color: colors.White,
    fontFamily: "outfit-bold",
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 20,
    color: colors.White,
    fontFamily: "outfit-semiBold",
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "outfit-regular",
  },
});
