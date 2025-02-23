import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { colors } from "@/constants/Colors";
import Button from "@/components/Shared/Button";

const AddCourse = () => {
  const onGenerateTopic = () => {
    // Get Topic from ai
  };
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE, padding: 25 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Create New Course
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 24,
        }}
      >
        What you want to learn today?
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 20,
          marginTop: 8,
          color: colors.GRAY,
        }}
      >
        What course you want to create (Ex.Learn Python, Digital Marketing, 10th
        Science Chapters, etc...)
      </Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={{
          borderRadius: 15,
          borderWidth: 1,
          padding: 15,
          height: 100,
          marginTop: 20,
          alignItems: "flex-start",
          fontSize: 16,
        }}
        placeholder="Learn Python, Learn 12th chemistry"
      />
      <Button
        type="outline"
        buttonText={"Generate Topic"}
        onButtonPress={onGenerateTopic}
        loading={loading}
      />
    </View>
  );
};

export default AddCourse;
