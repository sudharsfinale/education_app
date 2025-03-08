import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { imageAssets } from "@/constants/Options";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import Intro from "@/components/CourseView/Intro";
import Chapters from "@/components/CourseView/Chapters";

const CourseView = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course: any = JSON.parse(courseParams);
  return (
    <FlatList
      data={[]}
      renderItem={() => <View></View>}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    ></FlatList>
  );
};

export default CourseView;
