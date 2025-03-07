//@ts-nocheck
import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { imageAssets } from "@/constants/Options";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import Intro from "@/components/CourseView/Intro";

const CourseView = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course: any = JSON.parse(courseParams);
  console.log(course);
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <Intro course={course} />
    </ScrollView>
  );
};

export default CourseView;
