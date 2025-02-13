import { View, Text, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";

const SignIn = () => {
  const router = useRouter();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: colors.White,
      }}
    >
      <Image
        style={{ width: 180, height: 180 }}
        source={require("@/assets/images/logo.png")}
      />
      <Text
        style={{ fontFamily: "outfit-bold", fontSize: 26 }}
        onPress={() => router.back()}
      >
        Create New Account
      </Text>
    </View>
  );
};

export default SignIn;
