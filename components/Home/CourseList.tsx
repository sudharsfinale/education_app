//@ts-nocheck
import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets, PraticeOption } from "@/constants/Options";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
const CourseList = (props: any) => {
  const { courseList } = props;
  return (
    <View style={{ marginTop: 12 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          marginHorizontal: 25,
        }}
      >
        Practice
      </Text>
      <View style={{ marginHorizontal: 25, marginVertical: 16 }}>
        <FlatList
          numColumns={3}
          data={PraticeOption}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                aspectRatio: 1,
                marginRight: PraticeOption.length - 1 === index ? 0 : 8,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 16,
                }}
                source={item.image}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "outfit-regular",
                  padding: 15,
                  color: colors.WHITE,
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
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
          <View
            style={{
              marginLeft: index === 0 ? 25 : 0,
              marginTop: 20,
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
          </View>
        )}
      />
    </View>
  );
};

export default CourseList;
