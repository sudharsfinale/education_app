import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "@/constants/Colors";
import Button from "@/components/Shared/Button";
import { GenerateCourseAiModel, GenerateTopicsAiModel } from "@/config/AiModel";
import Prompt from "@/constants/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "expo-router";

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState<any>([]);

  //@ts-ignore
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const router = useRouter();

  const onGenerateTopic = async () => {
    try {
      setLoading(true);
      debugger;
      // Get Topic Ideas from AI model
      const PROMPT = userInput + Prompt.IDEA;
      const airesponse = await GenerateTopicsAiModel.sendMessage(PROMPT);
      let topicIdeas = JSON.parse(airesponse.response.text());
      setTopics(topicIdeas?.course_titles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopics + Prompt.COURSE;
    try {
      const airesponse = await GenerateCourseAiModel.sendMessage(PROMPT);
      let courses = JSON.parse(airesponse.response.text());
      courses?.forEach(async (course: any) => {
        await setDoc(doc(db, "Courses", Date.now().toString()), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email,
        });
      });
      console.log(courses);
      setLoading(false);
      router.push("/(tabs)/Home");
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const onTopicSelect = (topic: string) => {
    let isTopicAlreadySelected = selectedTopics.find(
      (_topic: any) => _topic === topic
    );
    if (isTopicAlreadySelected) {
      let selected_topics = selectedTopics.filter(
        (_topic: any) => _topic !== topic
      );
      setSelectedTopics(selected_topics);
    } else {
      let selected_topics = [...selectedTopics, topic];
      setSelectedTopics(selected_topics);
    }
  };
  return (
    <ScrollView>
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
          What course you want to create (Ex.Learn Python, Digital Marketing,
          10th Science Chapters, etc...)
        </Text>
        <TextInput
          multiline
          numberOfLines={3}
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
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
        <Text
          style={{ marginTop: 20, fontFamily: "outfit-regular", fontSize: 20 }}
        >
          Select all topics which you want to add in the course
        </Text>
        <View
          style={{
            gap: 10,
            marginTop: 8,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {topics &&
            topics.map((item, index) => (
              <Pressable
                style={{
                  borderWidth: 0.5,
                  paddingVertical: 10,
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  backgroundColor: selectedTopics.includes(item)
                    ? colors.PRIMARY
                    : colors.WHITE,
                  borderColor: colors.PRIMARY,
                }}
                onPress={() => onTopicSelect(item)}
                key={index}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                    color: selectedTopics.includes(item)
                      ? colors.WHITE
                      : colors.PRIMARY,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
        </View>
        {selectedTopics.length > 0 ? (
          <Button
            buttonText="Generate Course"
            loading={loading}
            onButtonPress={() => onGenerateCourse()}
          ></Button>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default AddCourse;
