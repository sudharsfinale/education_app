import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/Colors";

const Chapters = ({ course }: any) => {
  const course_chapters = course?.chapters || [];

  const ChapterItem = ({
    item,
    chapterIndex,
  }: {
    item: any;
    chapterIndex: number;
  }) => (
    <Pressable style={styles.chapterItem}>
      <View style={styles.chapterRow}>
        <Text style={styles.chapterIndex}>{chapterIndex + 1}. </Text>
        <Text style={styles.chapterText}>{item?.chapterName}</Text>
      </View>
      <Entypo name="controller-play" size={24} color={colors.PRIMARY} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapters</Text>
      <FlatList
        data={course_chapters}
        style={styles.list}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item, index }) => (
          <ChapterItem chapterIndex={index} item={item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },
  list: {
    marginTop: 6,
    marginBottom: 12,
  },
  separator: {
    marginVertical: 4,
  },
  chapterItem: {
    borderWidth: 0.5,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  chapterRow: {
    flexDirection: "row",
    gap: 10,
  },
  chapterIndex: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  chapterText: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
});

export default Chapters;
