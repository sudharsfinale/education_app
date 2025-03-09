import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { imageAssets } from "@/constants/Options";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const Intro = (props: any) => {
  const { course } = props;
  let image: any = imageAssets[course?.banner_image];
  const router = useRouter();
  return (
    <View>
      <Image style={styles.image} source={image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{course?.courseTitle}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="book-outline" size={20} />
        <Text style={styles.infoText}>{course?.chapters?.length} Chapters</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {course?.description} Chapters
        </Text>
      </View>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "auto",
    height: 280,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
  },
  infoText: {
    fontFamily: "outfit-regular",
    fontSize: 18,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  descriptionTitle: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  descriptionText: {
    fontFamily: "outfit-regular",
    fontSize: 18,
    color: colors.GRAY,
  },
  backButton: {
    position: "absolute",
    padding: 10,
  },
});

export default Intro;
