import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserDetailContext } from "@/context/UserDetailContext";
import CourseProgressCard from "@/components/Shared/CourseProgressCard";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const Progress = () => {
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
  const progressBarWidth = Dimensions.get("screen").width - 60;
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/wave.png")}
      style={{ height: 800, width: "100%", flex: 1 }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 28,
          color: colors.WHITE,
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        {"Progress"}
      </Text>
      <View
        style={{
          paddingTop: 20,
          marginHorizontal: 20,
          flex: 1,
        }}
      >
        <FlatList
          style={{ flexGrow: 1 }}
          data={courseList}
          onRefresh={() => getCourseList()}
          refreshing={courseFetching}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    //@ts-ignore
                    pathname: `/courseView/${item?.docId}`,
                    params: { courseParams: JSON.stringify(item) },
                  })
                }
                style={{ marginBottom: 20 }}
              >
                <CourseProgressCard
                  item={item}
                  index={index}
                  width={"100%"}
                  page={"progress"}
                  progressBarWidth={progressBarWidth}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Progress;
