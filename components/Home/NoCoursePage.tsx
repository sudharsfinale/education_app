import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

const NoCoursePage = () => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 40, alignItems: "center", marginHorizontal: 25 }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../../assets/images/book.png")}
      />
      <Text
        style={{ fontFamily: "outfit-bold", fontSize: 25, textAlign: "center" }}
      >
        You Don't have Any Course
      </Text>
      <Button
        onButtonPress={() => router.push("/addCourse")}
        buttonText={"+ Create New Course"}
      />
      <Button type="outline" buttonText={"Explore Existing Courses"} />
    </View>
  );
};

export default NoCoursePage;
