import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  StyleSheet,
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

  useEffect(() => {
    if (formattedQuizInfo !== undefined) {
      const correct_answers = Object.entries(formattedQuizInfo)?.filter(
        ([key, value]: any) => value?.isCorrect == true
      );
      setTotalQuestions(Object.keys(formattedQuizInfo).length);
      setCorrectAns(correct_answers?.length);
    }
  }, []);

  const getPercentage = () =>
    totalQuestions !== undefined ? (correctAns / totalQuestions) * 100 : 0;

  const calculated_percentage = useMemo(getPercentage, [
    totalQuestions,
    correctAns,
  ]);

  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/wave.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Quiz Summary</Text>
          <View style={styles.cardContainer}>
            <Image
              style={styles.trophyImage}
              source={require("../../assets/images/trophy.png")}
            />
            <Text style={styles.resultText}>
              {calculated_percentage > 60 ? "Congratulations" : "Try Again"}
            </Text>
            <Text style={styles.percentageText}>
              You have {calculated_percentage}% Correct Answer
            </Text>
            <View style={styles.statsContainer}>
              {[
                { label: `Q ${totalQuestions}`, icon: "" },
                { label: `✅ ${correctAns}`, icon: "✅" },
                { label: `❌ ${totalQuestions - correctAns}`, icon: "❌" },
              ].map((item, index) => (
                <View key={index} style={styles.statBox}>
                  <Text style={styles.statText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonText="Back To Home"
            onButtonPress={() => router.replace("/(tabs)/Home")}
          />
        </View>
        <Text style={styles.summaryText}>Summary :</Text>
        <FlatList
          data={Object.entries(formattedQuizInfo)}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => {
            const quizItem = item[1];
            return (
              <View
                style={[
                  styles.quizItem,
                  {
                    backgroundColor: quizItem.isCorrect
                      ? colors.LIGHT_GREEN
                      : colors.LIGHT_RED,
                    borderColor: quizItem.isCorrect ? colors.GREEN : colors.RED,
                  },
                ]}
              >
                <Text style={styles.questionText}>
                  {quizItem.optionQuizDetails.question}
                </Text>
                <Text style={styles.answerText}>
                  Ans: {quizItem.optionQuizDetails.correctAns}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { width: "100%", height: "100%" },
  container: { flex: 1 },
  headerContainer: { alignItems: "center", marginTop: 20 },
  headerText: { fontFamily: "outfit-bold", fontSize: 30, color: colors.WHITE },
  cardContainer: {
    width: Dimensions.get("screen").width - 80,
    backgroundColor: colors.WHITE,
    marginTop: 60,
    borderRadius: 16,
    alignItems: "center",
    paddingBottom: 16,
  },
  trophyImage: { height: 100, width: 100, marginTop: -60 },
  resultText: { fontFamily: "outfit-semiBold", fontSize: 20 },
  percentageText: {
    fontFamily: "outfit-regular",
    color: colors.GRAY,
    marginTop: 4,
    fontSize: 17,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 6,
    gap: 8,
    alignItems: "center",
  },
  statBox: {
    padding: 15,
    backgroundColor: colors.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  statText: { fontFamily: "outfit-regular", fontSize: 20 },
  buttonContainer: { marginHorizontal: 36 },
  summaryText: {
    fontFamily: "outfit-bold",
    marginLeft: 20,
    marginTop: 12,
    fontSize: 20,
  },
  listContainer: { flexGrow: 1, paddingBottom: 20 },
  quizItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    gap: 6,
  },
  questionText: { fontSize: 20, fontFamily: "outfit-regular" },
  answerText: { fontSize: 16, fontFamily: "outfit-regular" },
});

export default Summary;
