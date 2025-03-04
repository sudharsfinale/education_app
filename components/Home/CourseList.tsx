//@ts-nocheck
import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { imageAssets, PraticeOption } from "@/constants/Options";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const CourseList = (props: any) => {
  const { courseList } = props;
  const router = useRouter();
  return (
    <View style={{ marginVertical: 12 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          marginHorizontal: 25,
        }}
      >
        Courses
      </Text>
      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        renderItem={({ item, index }: any) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/courseView",
                params: { courseParams: JSON.stringify(item) },
              })
            }
            style={{
              marginLeft: index === 0 ? 25 : 0,
              marginTop: 4,
              backgroundColor: colors.BG_GRAY,
              padding: 10,
              borderRadius: 16,
              width: 260,
            }}
          >
            <Image
              style={{ width: "100%", height: 150, borderRadius: 16 }}
              source={imageAssets[item?.banner_image]}
            />
            <Text
              style={{ fontFamily: "outfit-bold", fontSize: 18, marginTop: 10 }}
            >
              {item?.courseTitle}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
              }}
            >
              <Ionicons name="book-outline" size={20} />
              <Text style={{ fontFamily: "outfit-regular" }}>
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default CourseList;
