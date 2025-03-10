import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { imageAssets } from "@/constants/Options";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import Intro from "@/components/CourseView/Intro";
import Chapters from "@/components/CourseView/Chapters";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const CourseView = () => {
  const { courseParams, courseId }: any = useLocalSearchParams();
  const [courseData, setCourseData] = useState(null);
  const getCourseById = async () => {
    const docRef = await getDoc(doc(db, "Courses", courseId));
    let course_data: any = docRef.data();
    if (course_data) {
      setCourseData(course_data);
    }
  };
  useEffect(() => {
    if (!courseParams && courseId) {
      getCourseById();
    } else if (courseParams) {
      const course: any = JSON.parse(courseParams);
      setCourseData(course);
    }
  }, [courseId]);
  return (
    <FlatList
      data={[]}
      renderItem={() => <View></View>}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <Intro course={courseData} />
          <Chapters course={courseData} />
        </View>
      }
    ></FlatList>
  );
};

export default CourseView;
