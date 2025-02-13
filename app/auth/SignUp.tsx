import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  return (
    <View>
      <Text onPress={() => router.back()}>SignUp</Text>
    </View>
  );
};

export default SignUp;
