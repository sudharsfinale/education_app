import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { FlatList } from "react-native";
import * as Progress from "react-native-progress";
//@ts-ignore
import FlipCard from "react-native-flip-card";

const FlashCardSection = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashCards = course.flashcards;
  const router = useRouter();
  const width = Dimensions.get("screen").width;
  const progressBarWidth = Dimensions.get("screen").width * 0.85;
  const [currentPage, setCurrentPage] = useState(0);
  const onScroll = (event: any) => {
    const index = Math.round(event?.nativeEvent?.contentOffset.x / width);
    setCurrentPage(index);
  };
  const getProgressPercentage = () => {
    let perc = currentPage / flashCards?.length;
    return perc;
  };
  return (
    <ImageBackground
      source={require("../../assets/images/wave.png")}
      style={{ height: 800, width: "100%" }}
    >
      <View
        style={{
          //   position: "absolute",
          padding: 25,
          //   top: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons size={32} name="arrow-back" color={colors.WHITE} />
        </Pressable>
        <Text
          style={{
            color: colors.WHITE,
            fontFamily: "outfit-bold",
            fontSize: 24,
          }}
        >
          {currentPage + 1} of {flashCards?.length || 0}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Progress.Bar
          color={colors.WHITE}
          progress={getProgressPercentage()}
          width={progressBarWidth}
        ></Progress.Bar>
      </View>
      <FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={flashCards}
        horizontal
        onScroll={onScroll}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                height: 500,
                //   backgroundColor: colors.WHITE,
              }}
            >
              <FlipCard style={styles.filpCard}>
                {/* Face Side */}
                <View style={styles.front}>
                  <Text style={{ fontFamily: "outfit-bold", fontSize: 28 }}>
                    {item?.front}
                  </Text>
                </View>
                {/* Back Side */}
                <View style={styles.back}>
                  <Text
                    style={{
                      fontFamily: "outfit-regular",
                      color: colors.WHITE,
                      fontSize: 28,
                      width: Dimensions.get("screen").width * 0.9,
                      textAlign: "center",
                      padding: 16,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          );
        }}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  filpCard: {
    width: Dimensions.get("screen").width * 0.9,
    height: 400,
    backgroundColor: colors.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: Dimensions.get("screen").width * 0.05,
  },
  front: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: colors.PRIMARY,
    borderRadius: 20,
  },
});

export default FlashCardSection;
