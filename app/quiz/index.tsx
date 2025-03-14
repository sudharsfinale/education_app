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
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import * as Progress from "react-native-progress";
import Button from "@/components/Shared/Button";

const Quiz = () => {
  const { courseParams }: any = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  const width = Dimensions.get("screen").width * 0.85;
  const quizInfo = course.quiz;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>(undefined);
  const [result, setResult] = useState(null);
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
  console.log(JSON.stringify(result, null, 2));
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
          <Pressable onPress={() => {}}>
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
                      }}
                      key={index}
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        borderRadius: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor:
                          Number(selectedOption) === index
                            ? colors.LIGHT_GREEN
                            : colors.WHITE,
                        borderColor:
                          Number(selectedOption) === index
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
                }}
              />
            </View>
          )}
          <View style={{ flex: 1 }}>
            {currentPage + 1 === quizInfo?.length ? (
              <Button buttonText="Finish" onButtonPress={() => {}} />
            ) : (
              <Button
                buttonText="Next"
                onButtonPress={() => {
                  setCurrentPage(currentPage + 1);
                  setSelectedOption(undefined);
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
