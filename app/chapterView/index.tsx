import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import { colors } from "@/constants/Colors";
import Button from "@/components/Shared/Button";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const ChapterView: React.FC = () => {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams<{
    chapterParams: string;
    docId: string;
    chapterIndex: string;
  }>();

  const chapterInfo: any = JSON.parse(chapterParams);
  const width = Dimensions.get("screen").width * 0.85;
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const getProgressPercentage = () => {
    let perc = currentPage / chapterInfo?.content?.length;
    return perc;
  };
  const topic = chapterInfo?.content?.[currentPage]?.topic;
  const explanation = chapterInfo?.content?.[currentPage]?.explain;
  const code = chapterInfo?.content?.[currentPage]?.code;
  const example = chapterInfo?.content?.[currentPage]?.example;
  const isEnd = chapterInfo?.content?.length === currentPage + 1;
  const router = useRouter();
  const onChapterComplete = async () => {
    setLoading(true);
    await updateDoc(doc(db, "Courses", docId), {
      completedChapters: arrayUnion(chapterIndex),
    });
    setLoading(false);
    router.replace(`/courseView/${docId}`);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 25, width: "100%", backgroundColor: colors.WHITE }}
      >
        <Progress.Bar
          progress={getProgressPercentage()}
          width={width}
        ></Progress.Bar>
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            {topic ? topic : ""}
          </Text>
          <Text
            style={{ fontFamily: "outfit-regular", fontSize: 18, marginTop: 6 }}
          >
            {explanation ? explanation : ""}
          </Text>
          {code && (
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 18,
                marginVertical: 6,
                backgroundColor: colors.BLACK,
                color: colors.WHITE,
                padding: 12,
                borderRadius: 12,
              }}
            >
              {code ? code : ""}
            </Text>
          )}
          {example && (
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 18,
                marginBottom: 6,
                marginTop: 6,
                backgroundColor: colors.BG_GRAY,
                padding: 12,
                borderRadius: 12,
              }}
            >
              {example ? example : ""}
            </Text>
          )}
        </View>
      </ScrollView>
      {isEnd ? (
        <View style={{ marginHorizontal: 25, marginBottom: 16 }}>
          <Button
            buttonText="Finish"
            onButtonPress={onChapterComplete}
            loading={loading}
          />
        </View>
      ) : (
        <View
          style={{
            marginBottom: 16,
            flexDirection: "row",
            gap: 12,
            marginHorizontal: 25,
          }}
        >
          {currentPage !== 0 && (
            <View style={{ flex: 1 }}>
              <Button
                buttonText="Previous"
                onButtonPress={() => setCurrentPage(currentPage - 1)}
                type="outline"
              />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Button
              onButtonPress={() => setCurrentPage(currentPage + 1)}
              buttonText="Next"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ChapterView;
