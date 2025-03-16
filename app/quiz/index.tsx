import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import * as Progress from "react-native-progress";
import Button from "@/components/Shared/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const Quiz = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const router = useRouter();
  const width = Dimensions.get("screen").width * 0.85;
  const quizInfo = course.quiz;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>(undefined);
  const [answerError, setAnswerError] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const getProgressPercentage = () => {
    let perc = currentPage / quizInfo?.length;
    return perc;
  };
  const onOptionSelect = (selectedChoice: any) => {
    setResult((prev: any) => ({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: quizInfo?.[currentPage]?.correctAns === selectedChoice,
        optionQuizDetails: quizInfo?.[currentPage],
      },
    }));
  };

  //@ts-ignore
  let current_answer = result?.[currentPage]?.userChoice;
  const onQuizFinish = async () => {
    if (current_answer || selectedOption) {
      setLoading(true);
      try {
        await updateDoc(doc(db, "Courses", course?.docId), {
          quizResult: result,
        });
        setLoading(false);
        router.replace({
          pathname: "/quiz/Summary",
          params: {
            quizResult: JSON.stringify(result),
          },
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      // router.replace(`/courseView/${docId}`);
    } else {
      setAnswerError(true);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/images/wave.png")}
      style={{ height: 800, width: "100%" }}
    >
      <View>
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
            {currentPage + 1} of {quizInfo?.length || 0}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Progress.Bar
            color={colors.WHITE}
            progress={getProgressPercentage()}
            width={width}
          ></Progress.Bar>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.WHITE,
              height: Dimensions.get("screen").height * 0.65,
              marginTop: 30,
              padding: 20,
              width: width,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              borderRadius: 16,
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-semiBold",
                fontSize: 20,
                color: colors.BLACK,
              }}
            >
              {quizInfo?.[currentPage]?.question}
            </Text>
            <View style={{ marginTop: 12 }}>
              <FlatList
                data={quizInfo[currentPage].options}
                ItemSeparatorComponent={() => (
                  <View style={{ marginBottom: 16 }}></View>
                )}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onOptionSelect(item);
                        setSelectedOption(String(index));
                        setAnswerError(false);
                      }}
                      key={index}
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        borderRadius: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor:
                          Number(selectedOption) === index ||
                          current_answer === item
                            ? colors.LIGHT_GREEN
                            : colors.WHITE,
                        borderColor:
                          Number(selectedOption) === index ||
                          current_answer === item
                            ? colors.GREEN
                            : "#e7e7e7",
                      }}
                    >
                      <Text style={{ fontFamily: "outfit-regular" }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            {answerError && (
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  marginTop: 12,
                  textAlign: "center",
                  color: "#cc0000",
                }}
              >
                *Please select answer to continue
              </Text>
            )}
          </View>
        </View>

        <View style={{ marginHorizontal: 24, flexDirection: "row", gap: 12 }}>
          {currentPage !== 0 && (
            <View style={{ flex: 1 }}>
              <Button
                buttonText="Previous"
                type="outline"
                onButtonPress={() => {
                  setCurrentPage(currentPage - 1);
                  setSelectedOption(undefined);
                  setAnswerError(false);
                }}
              />
            </View>
          )}
          <View style={{ flex: 1 }}>
            {currentPage + 1 === quizInfo?.length ? (
              <Button
                loading={loading}
                buttonText="Finish"
                onButtonPress={onQuizFinish}
              />
            ) : (
              <Button
                buttonText="Next"
                onButtonPress={() => {
                  if (current_answer || selectedOption) {
                    setCurrentPage(currentPage + 1);
                    setSelectedOption(undefined);
                  } else {
                    setAnswerError(true);
                  }
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Quiz;
