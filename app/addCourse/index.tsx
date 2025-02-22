import { View, Text } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";

const AddCourse = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE, padding: 25 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Create New Course
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 24,
        }}
      >
        What you want to learn today?
      </Text>
    </View>
  );
};

export default AddCourse;
