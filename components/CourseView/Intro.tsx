import { View, Text, Image } from "react-native";
import React from "react";
import { imageAssets } from "@/constants/Options";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

const Intro = (props: any) => {
  const { course } = props;
  let image: any = imageAssets[course?.banner_image];
  return (
    <View>
      <Image style={{ width: "auto", height: 280 }} source={image}></Image>
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
  );
};

export default Intro;
