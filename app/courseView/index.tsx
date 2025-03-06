//@ts-nocheck
import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { imageAssets } from "@/constants/Options";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

const CourseView = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course: any = JSON.parse(courseParams);
  console.log(course);
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Image
          style={{ width: "auto", height: 280 }}
          source={imageAssets[course?.banner_image]}
        ></Image>
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            {course?.courseTitle}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 20,
          }}
        >
          <Ionicons name="book-outline" size={20} />
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18 }}>
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
            Description
          </Text>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 18,
              color: colors.GRAY,
            }}
          >
            {course?.description} Chapters
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CourseView;
