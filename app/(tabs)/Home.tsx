import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
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
  const [courseFetching, setCourseFetching] = useState(false);
  const getCourseList = async (type = "") => {
    setCourseFetching(true);

    const shouldFetch =
      type === "forced_refresh" || (!coursesFetched && userDetail?.email);
    if (!shouldFetch) {
      setCourseFetching(false);
      return;
    }

    try {
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail.email)
      );
      const querySnapShot = await getDocs(q);
      const courses = querySnapShot.docs.map((doc) => doc.data());

      setCourseList(courses);
      setCoursesFetched(true);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setCourseFetching(false);
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
      onRefresh={() => getCourseList("forced_refresh")}
      refreshing={courseFetching}
      style={{ backgroundColor: colors.WHITE, flex: 1 }}
      ListHeaderComponent={
        <View style={{ backgroundColor: colors.WHITE, flex: 1 }}>
          <Image
            style={{ position: "absolute", width: "100%", height: 700 }}
            source={require("@/assets/images/wave.png")}
          />
          <Header />
          {Array.isArray(courseList) && courseList?.length ? (
            <View>
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
            </View>
          ) : courseFetching ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={50} />
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
