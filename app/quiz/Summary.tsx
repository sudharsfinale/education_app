import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import Button from "@/components/Shared/Button";

const Summary = () => {
  const { quizResult }: any = useLocalSearchParams();
  const formattedQuizInfo: any = JSON.parse(quizResult);
  const [correctAns, setCorrectAns] = useState<any>(0);
  const [totalQuestions, setTotalQuestions] = useState<any>(undefined);
  const calculateResult = () => {
    if (formattedQuizInfo !== undefined) {
      const correct_answers = Object.entries(formattedQuizInfo)?.filter(
        ([key, value]: any) => value?.isCorrect == true
      );
      const total_questions = Object.keys(formattedQuizInfo).length;
      setTotalQuestions(total_questions);
      setCorrectAns(correct_answers?.length);
      console.log(correctAns);
    }
  };
  useEffect(() => {
    calculateResult();
  }, []);
  const getPercentage = () => {
    if (totalQuestions !== undefined) {
      const percentage = (correctAns / totalQuestions) * 100;
      return percentage;
    } else {
      return 0;
    }
  };
  let calculated_percentage = useMemo(() => {
    if (totalQuestions !== undefined) {
      let percentage = getPercentage();
      return percentage;
    } else {
      return 0;
    }
  }, [totalQuestions, correctAns]);
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/wave.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1 }}>
        {/* Static Header */}
        <View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 30,
                color: colors.WHITE,
              }}
            >
              Quiz Summary
            </Text>
            <View
              style={{
                width: Dimensions.get("screen").width - 80,
                backgroundColor: colors.WHITE,
                marginTop: 60,
                borderRadius: 16,
                alignItems: "center",
                paddingBottom: 16,
              }}
            >
              <Image
                style={{ height: 100, width: 100, marginTop: -60 }}
                source={require("../../assets/images/trophy.png")}
              />
              <Text style={{ fontFamily: "outfit-semiBold", fontSize: 20 }}>
                {calculated_percentage > 60 ? "Congratulations" : "Try Again"}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  color: colors.GRAY,
                  marginTop: 4,
                  fontSize: 17,
                }}
              >
                You have {calculated_percentage}% Correct Answer
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 6,
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    padding: 15,
                    backgroundColor: colors.WHITE,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                  }}
                >
                  <Text style={{ fontFamily: "outfit-regular", fontSize: 20 }}>
                    Q {totalQuestions}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 15,
                    backgroundColor: colors.WHITE,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                  }}
                >
                  <Text style={{ fontFamily: "outfit-regular", fontSize: 20 }}>
                    ✅ {correctAns}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 15,
                    backgroundColor: colors.WHITE,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                  }}
                >
                  <Text style={{ fontFamily: "outfit-regular", fontSize: 20 }}>
                    ❌ {totalQuestions - correctAns}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 36 }}>
            <Button
              buttonText="Back To Home"
              onButtonPress={() => router.replace("/(tabs)/Home")}
            />
          </View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              marginLeft: 20,
              marginTop: 12,
              fontSize: 20,
            }}
          >
            Summary :
          </Text>
        </View>

        {/* Scrollable List */}
        <FlatList
          data={Object?.entries(formattedQuizInfo)}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => {
            let quizItem: any = item?.[1];
            let quizDetails = quizItem?.optionQuizDetails;
            let questionText = quizDetails?.question;
            let answerForQuestion = quizDetails?.correctAns;
            let isCorrect = quizItem?.isCorrect;
            return (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 15,
                  gap: 6,
                  borderColor: isCorrect ? colors.GREEN : colors.RED,
                  backgroundColor: isCorrect
                    ? colors.LIGHT_GREEN
                    : colors.LIGHT_RED,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "outfit-regular",
                  }}
                >
                  {questionText}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "outfit-regular",
                  }}
                >
                  Ans: {answerForQuestion}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Summary;
