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
  const getCourseList = async () => {
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot?.forEach((doc) => {
      setCourseList((prev: any) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    getCourseList();
  }, []);
  console.log(courseList);
  return (
    <View style={{ padding: 25, backgroundColor: colors.WHITE, flex: 1 }}>
      <Header />
      {Array.isArray(courseList) && courseList?.length ? (
        <CourseList />
      ) : (
        <NoCoursePage />
      )}
    </View>
  );
};

export default Home;
