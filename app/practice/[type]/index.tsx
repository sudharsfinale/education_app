import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PraticeOption } from "@/constants/Options";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserDetailContext } from "@/context/UserDetailContext";
import CourseListGrid from "@/components/PracticeScreen/CourseListGrid";

const PracticeTypeHomeScreen = () => {
  const { type } = useLocalSearchParams();
  const currentOption = PraticeOption.find((_item) => _item.name === type);
  const [courseList, setCourseList] = useState<any>([]);
  const [isCourseFetching, setIsCourseFetching] = useState(false);
  const router = useRouter();
  //@ts-ignore
  const { userDetail } = useContext(UserDetailContext);
  const getCourseList = async () => {
    setIsCourseFetching(true);
    setCourseList([]);
    try {
      const QUERY = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail?.email)
      );
      const querySnapShot = await getDocs(QUERY);
      const courses = querySnapShot.docs.map((doc) => doc.data());

      setCourseList(courses);
      setIsCourseFetching(false);
    } catch (error) {
      setIsCourseFetching(false);
    } finally {
      setIsCourseFetching(false);
    }
  };
  useEffect(() => {
    getCourseList();
  }, []);
  console.log(courseList);
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={currentOption?.image}
        style={{ width: "100%", height: 200 }}
      />
      <View
        style={{
          position: "absolute",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Pressable
          onPress={() => router.push("/(tabs)/Home")}
          style={styles.backButton}
        >
          <Ionicons color={colors.WHITE} name="arrow-back" size={24} />
        </Pressable>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 32,
            color: colors.WHITE,
          }}
        >
          {currentOption?.name}
        </Text>
      </View>
      {isCourseFetching ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={50} color={colors.PRIMARY} />
        </View>
      ) : (
        <CourseListGrid courseList={courseList} option={currentOption} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {},
});

export default PracticeTypeHomeScreen;
