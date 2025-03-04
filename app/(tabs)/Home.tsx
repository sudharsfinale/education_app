import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Home/Header";
import NoCoursePage from "@/components/Home/NoCoursePage";
import { colors } from "@/constants/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import CourseList from "@/components/Home/CourseList";
import PracticeSection from "@/components/Home/PracticeSection";
import CourseProgress from "@/components/Home/CourseProgress";

const Home = () => {
  //@ts-ignore
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState<any>([]);
  const [coursesFetched, setCoursesFetched] = useState(false);
  const getCourseList = async () => {
    console.log("outside getCourseList");
    if (!userDetail?.email || coursesFetched) return;
    console.log("inside getCourseList");
    try {
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail.email)
      );
      const querySnapShot = await getDocs(q);
      const courses = querySnapShot.docs.map((doc) => doc.data());

      setCourseList(courses); // Update once
      setCoursesFetched(true);
    } catch (error) {
      // console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    getCourseList();
  }, [userDetail]);
  return (
    <FlatList
      data={[]}
      renderItem={() => <View></View>}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ backgroundColor: colors.WHITE, flex: 1 }}>
          <Header />
          {Array.isArray(courseList) && courseList?.length ? (
            <View>
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
            </View>
          ) : (
            <NoCoursePage />
          )}
        </View>
      }
    />
  );
};

export default Home;
