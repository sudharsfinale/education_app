import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  useFonts({
    "outfit-semiBold": require("@/assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-light": require("@/assets/fonts/Outfit-Light.ttf"),
    "outfit-regular": require("@/assets/fonts/Outfit-Regular.ttf"),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </SafeAreaView>
  );
}
