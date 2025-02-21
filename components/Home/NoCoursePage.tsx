import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../Shared/Button";

const NoCoursePage = () => {
  return (
    <View style={{ marginTop: 40, alignItems: "center" }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../../assets/images/book.png")}
      />
      <Text
        style={{ fontFamily: "outfit-bold", fontSize: 25, textAlign: "center" }}
      >
        You Don't have Any Course
      </Text>
      <Button buttonText={"+ Create New Course"} />
      <Button type="outline" buttonText={"Explore Existing Courses"} />
    </View>
  );
};

export default NoCoursePage;
