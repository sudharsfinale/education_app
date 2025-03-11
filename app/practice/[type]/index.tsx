import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PraticeOption } from "@/constants/Options";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserDetailContext } from "@/context/UserDetailContext";

const PracticeTypeHomeScreen = () => {
  const { type } = useLocalSearchParams();
  const currentOption = PraticeOption.find((_item) => _item.name === type);
  const router = useRouter();
  //@ts-ignore
  const { userDetail } = useContext(UserDetailContext);
  const getCourseList = async () => {
    const QUERY = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapShot = await getDocs(QUERY);
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  useEffect(() => {
    getCourseList();
  }, []);
  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {},
});

export default PracticeTypeHomeScreen;
