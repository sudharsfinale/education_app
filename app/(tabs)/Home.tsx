import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Home/Header";
import NoCoursePage from "@/components/Home/NoCoursePage";
import { colors } from "@/constants/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import CourseList from "@/components/Home/CourseList";

const Home = () => {
  //@ts-ignore
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState<any>([]);
  const [coursesFetched, setCoursesFetched] = useState(false);
  const getCourseList = async () => {
    if (!userDetail?.email || coursesFetched) return;

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
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    getCourseList();
  }, [userDetail]);
  console.log(courseList);
  return (
    <View style={{ backgroundColor: colors.WHITE, flex: 1 }}>
      <Header />
      {Array.isArray(courseList) && courseList?.length ? (
        <CourseList courseList={courseList} />
      ) : (
        <NoCoursePage />
      )}
    </View>
  );
};

export default Home;
