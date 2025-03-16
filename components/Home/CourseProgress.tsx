import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { imageAssets } from "@/constants/Options";
import { colors } from "@/constants/Colors";
import * as Progress from "react-native-progress";
import CourseProgressCard from "../Shared/CourseProgressCard";

const CourseProgress = ({ courseList }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={courseList}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => {
            return <CourseProgressCard item={item} index={index} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    marginHorizontal: 25,
    color: colors.WHITE,
  },
  listContainer: {
    marginVertical: 0,
    marginTop: 8,
  },
  separator: {
    width: 16,
  },
  card: {
    padding: 8,
    borderRadius: 16,
    width: 280,
  },
  courseInfo: {
    flexDirection: "row",
    gap: 8,
  },

  textContainer: {
    gap: 5,
    flex: 1,
  },
  courseTitle: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    flexWrap: "wrap",
  },
  chaptersText: {
    fontFamily: "outfit-regular",
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 12,
    marginBottom: 6,
  },
  progressText: {
    fontFamily: "outfit-regular",
    fontSize: 12,
    marginTop: 2,
  },
});

export default CourseProgress;
