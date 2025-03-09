import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/Colors";
const Chapters = (props: any) => {
  const { course } = props;
  let course_chapters = course?.chapters || [];
  const ChapterItem = (props: any) => {
    const { item, chapterIndex } = props;
    return (
      <Pressable
        style={{
          borderWidth: 0.5,
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 15,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
            {chapterIndex + 1}.{" "}
          </Text>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
            {item?.chapterName}
          </Text>
        </View>
        <Entypo name="controller-play" size={24} color={colors.PRIMARY} />
      </Pressable>
    );
  };
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>Chapters</Text>
      <FlatList
        data={course_chapters}
        style={{ marginTop: 6, marginBottom: 12 }}
        renderItem={(data) => {
          console.log(data);
          const { item, index } = data;
          console.log(item);
          return <ChapterItem chapterIndex={index} item={item} />;
        }}
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: 4 }}></View>
        )}
      />
    </View>
  );
};

export default Chapters;
