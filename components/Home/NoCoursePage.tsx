import { View, Text, Image } from "react-native";
import React from "react";

const NoCoursePage = () => {
  return (
    <View style={{ marginTop: 40, alignItems: "center" }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../../assets/images/book.png")}
      />
      <Text>You Don't have Any Course</Text>
    </View>
  );
};

export default NoCoursePage;
