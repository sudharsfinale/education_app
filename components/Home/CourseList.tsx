//@ts-nocheck
import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "@/constants/Options";

const CourseList = (props: any) => {
  const { courseList } = props;
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        CourseList
      </Text>
      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }: any) => (
          <View>
            <Image
              style={{ width: 260, height: 150, borderRadius: 16 }}
              source={imageAssets[item?.banner_image]}
            />
            <Text>{item?.courseTitle}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CourseList;
