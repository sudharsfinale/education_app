import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

const QuestionAnswerSection = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const router = useRouter();
  const question_answers = course?.qa;
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<any>(null);
  const onSelectQuestion = (_index: any) => {
    if (setSelectedQuestionIndex === _index) {
      setSelectedQuestionIndex(null);
    } else {
      setSelectedQuestionIndex(_index);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/images/wave.png")}
      style={{ height: 800, width: "100%", flex: 1 }}
    >
      <View
        style={{
          //   position: "absolute",
          paddingHorizontal: 25,
          paddingTop: 25,
          paddingBottom: 12,
          //   top: 0,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: 12,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons size={32} name="arrow-back" color={colors.WHITE} />
        </Pressable>
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: colors.WHITE,
              fontSize: 24,
            }}
          >
            Questions & Answers
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: "outfit-regular",
          color: colors.WHITE,
          fontSize: 24,
          paddingHorizontal: 25,
        }}
      >
        {course?.courseTitle}
      </Text>
      <View
        style={{
          marginHorizontal: 25,
          marginTop: 16,
          flex: 1,
        }}
      >
        <FlatList
          data={question_answers}
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => onSelectQuestion(index)}
                style={{
                  backgroundColor: colors.WHITE,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1,
                  elevation: 1,
                  padding: 12,
                  marginBottom: 20,
                  borderRadius: 16,
                  gap: 6,
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: "outfit-semiBold" }}>
                  {item?.question}
                </Text>
                {selectedQuestionIndex === index ? (
                  <Text style={{ fontSize: 17, fontFamily: "outfit-regular" }}>
                    {item?.answer}
                  </Text>
                ) : null}
              </Pressable>
            );
          }}
        ></FlatList>
      </View>
    </ImageBackground>
  );
};

export default QuestionAnswerSection;
