import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { imageAssets } from "@/constants/Options";
import { colors } from "@/constants/Colors";
import * as Progress from "react-native-progress";

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
                    marginLeft: index === 0 ? 25 : 0,
                    backgroundColor: colors.BG_GRAY,
                  },
                ]}
              >
                <View style={styles.courseInfo}>
                  <Image
                    style={styles.courseImage}
                    //@ts-ignore
                    source={imageAssets[item?.banner_image]}
                  />
                  <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.courseTitle}>
                      {item?.courseTitle}
                    </Text>
                    <Text style={styles.chaptersText}>
                      {totalChapters} Chapters
                    </Text>
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <Progress.Bar
                    progress={getProgressPercentage()}
                    width={260}
                  />
                  <Text style={styles.progressText}>
                    {completedChapters} out of {totalChapters} Chapters
                    Completed
                  </Text>
                </View>
              </View>
            );
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
  courseImage: {
    height: 60,
    width: 60,
    borderRadius: 16,
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
