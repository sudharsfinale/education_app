import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

const Header = () => {
  //@ts-ignore
  const { userDetail } = useContext(UserDetailContext);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello, {userDetail?.name}</Text>
        <Text style={styles.subtitle}>Let's get started</Text>
      </View>
      <TouchableOpacity>
        <Ionicons size={32} name="settings-outline" color={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginHorizontal: 25,
  },
  textContainer: {
    gap: 4,
  },
  greeting: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    color: colors.WHITE,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: 17,
    color: colors.WHITE,
  },
});

export default Header;
