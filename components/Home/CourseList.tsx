import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import { imageAssets, PraticeOption } from "@/constants/Options";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const CourseList = (props: any) => {
  const { courseList } = props;
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>
      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              router.push({
                //@ts-ignore
                pathname: `/courseView/${item?.docId}`,
                params: { courseParams: JSON.stringify(item) },
              })
            }
            style={[styles.courseItem, index === 0 && styles.firstItem]}
          >
            <Image
              style={styles.image}
              source={imageAssets[item?.banner_image]}
            />
            <Text style={styles.courseTitle}>{item?.courseTitle}</Text>
            <View style={styles.courseInfo}>
              <Ionicons name="book-outline" size={20} />
              <Text style={styles.chapterText}>
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    marginHorizontal: 25,
  },
  separator: {
    width: 16,
  },
  courseItem: {
    marginTop: 4,
    backgroundColor: colors.BG_GRAY,
    padding: 10,
    borderRadius: 16,
    width: 260,
  },
  firstItem: {
    marginLeft: 25,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 16,
  },
  courseTitle: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    marginTop: 10,
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  chapterText: {
    fontFamily: "outfit-regular",
  },
});

export default CourseList;
