import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Quiz = () => {
  const courseParams: any = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  return (
    <View>
      <Text>Quiz</Text>
    </View>
  );
};

export default Quiz;
