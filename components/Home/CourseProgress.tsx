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
                backgroundColor: colors.BG_GRAY,
                padding: 8,
                borderRadius: 16,

                marginLeft: index === 0 ? 25 : 0,
                width: 280,
              }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                //@ts-ignore
                <Image
                  style={{ height: 60, width: 60, borderRadius: 16 }}
                  //@ts-ignore
                  source={imageAssets[item?.banner_image]}
                />
                <View style={{ gap: 5, flex: 1 }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    {item?.courseTitle}
                  </Text>
                  <Text style={{ fontFamily: "outfit-regular", fontSize: 12 }}>
                    {item?.chapters?.length} Chapters
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CourseProgress;
