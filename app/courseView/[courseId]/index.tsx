import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { imageAssets } from "@/constants/Options";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import Intro from "@/components/CourseView/Intro";
import Chapters from "@/components/CourseView/Chapters";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useIsFocused } from "@react-navigation/native";

const CourseView = () => {
  const { courseParams, courseId }: any = useLocalSearchParams();
  const [courseData, setCourseData] = useState(null);
  const [gettingCourseData, setGettingCourseData] = useState(false);
  const getCourseById = async () => {
    const docRef = await getDoc(doc(db, "Courses", courseId));
    let course_data: any = docRef.data();
    if (course_data) {
      setCourseData(course_data);
      setGettingCourseData(false);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (courseId) {
      setGettingCourseData(true);
      getCourseById();
    }
  }, [isFocused]);
  return courseData ? (
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
  ) : gettingCourseData ? (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={colors.PRIMARY} size={50} />
    </View>
  ) : null;
};

export default CourseView;
