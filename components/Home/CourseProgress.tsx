import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "@/constants/Options";
import { colors } from "@/constants/Colors";

const CourseProgress = ({ courseList }: any) => {
  return (
    <View style={{ marginTop: 12 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          marginHorizontal: 25,
        }}
      >
        Progress
      </Text>
      <View style={{ marginVertical: 0, marginTop: 8 }}>
        <FlatList
          data={courseList}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.BG_GRAY,
                padding: 8,
                borderRadius: 16,
                gap: 8,
                marginLeft: index === 0 ? 25 : 0,
              }}
            >
              <View>
                //@ts-ignore
                <Image
                  style={{ height: 60, width: 60, borderRadius: 16 }}
                  //@ts-ignore
                  source={imageAssets[item?.banner_image]}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 16,
                  }}
                >
                  {item?.courseTitle}
                </Text>
                <Text style={{ color: colors.GRAY }}>
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CourseProgress;
