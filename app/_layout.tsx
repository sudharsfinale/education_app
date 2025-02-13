import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    "outfit-semiBold": require("@/assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-light": require("@/assets/fonts/Outfit-Light.ttf"),
    "outfit-regular": require("@/assets/fonts/Outfit-Regular.ttf"),
  });
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
