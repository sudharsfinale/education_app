import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { imageAssets } from "@/constants/Options";

const CourseView = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course: any = JSON.parse(courseParams);
  console.log(course);
  return (
    <View>
      <Image
        style={{ width: "auto", height: 200 }}
        source={imageAssets[course?.banner_image]}
      ></Image>
    </View>
  );
};

export default CourseView;
