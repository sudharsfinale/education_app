import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";
import * as Progress from "react-native-progress";
import { imageAssets } from "@/constants/Options";
const CourseProgressCard = ({
  item,
  index,
  width = 280,
  page = "any",
  progressBarWidth = 260,
}: any) => {
  const completedChapters = item?.completedChapters?.length || 0;
  const totalChapters = item?.chapters?.length;
  const getProgressPercentage = () => {
    let perc = completedChapters / totalChapters;
    return perc;
  };
  return (
    <View
      style={[
        styles.card,
        {
          marginLeft: index === 0 && page == "any" ? 25 : 0,
          backgroundColor: colors.BG_GRAY,
          width: width,
        },
      ]}
    >
      <View style={styles.courseInfo}>
        <Image
          style={styles.courseImage}
          source={imageAssets[item?.banner_image]}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={2} style={styles.courseTitle}>
            {item?.courseTitle}
          </Text>
          <Text style={styles.chaptersText}>{totalChapters} Chapters</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={getProgressPercentage()}
          width={progressBarWidth}
        />
      </View>
      <Text style={styles.progressText}>
        {completedChapters} out of {totalChapters} Chapters Completed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderRadius: 16,
  },
  courseImage: {
    height: 60,
    width: 60,
    borderRadius: 16,
  },
  courseInfo: {
    flexDirection: "row",
    gap: 8,
  },
  progressContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  progressText: {
    fontFamily: "outfit-regular",
    marginBottom: 6,
    fontSize: 12,
    marginTop: 2,
    marginLeft: 4,
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
});

export default CourseProgressCard;
