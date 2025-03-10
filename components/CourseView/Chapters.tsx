import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const Chapters = ({ course }: any) => {
  const course_chapters = course?.chapters || [];

  const router = useRouter();
  const ChapterItem = ({
    item,
    chapterIndex,
  }: {
    item: any;
    chapterIndex: number;
  }) => {
    const isChapterCompleted = () => {
      let completed_chapters = course?.completedChapters;
      if (
        completed_chapters &&
        Array.isArray(completed_chapters) &&
        completed_chapters
      ) {
        let chapter_index = course?.completedChapters.find(
          (_index: any) => Number(_index) === chapterIndex
        );
        if (chapter_index) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    let chapter_completed = isChapterCompleted();
    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/chapterView",
            params: {
              chapterParams: JSON.stringify(item),
              docId: course?.docId,
              chapterIndex,
            },
          })
        }
        style={styles.chapterItem}
      >
        <View style={styles.chapterRow}>
          <Text style={styles.chapterIndex}>{chapterIndex + 1}. </Text>
          <Text style={styles.chapterText}>{item?.chapterName}</Text>
        </View>
        <View style={{ flex: 0.1, alignItems: "center" }}>
          {chapter_completed ? (
            <AntDesign name="checkcircle" size={24} color={colors.GREEN} />
          ) : (
            <Entypo name="controller-play" size={24} color={colors.PRIMARY} />
          )}
        </View>
      </Pressable>
    );
  };

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
    flex: 0.9,
  },
  chapterIndex: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  chapterText: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    alignSelf: "flex-start", // Ensures text moves to the next line when needed
    maxWidth: "100%", // Prevents text from exceeding the parent width
    flexShrink: 1,
  },
});

export default Chapters;
