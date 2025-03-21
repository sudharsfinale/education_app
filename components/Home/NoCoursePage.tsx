import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

const NoCoursePage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/book.png")}
      />
      <Text style={styles.title}>You Don't have Any Course</Text>
      <Button
        onButtonPress={() => router.push("/addCourse")}
        buttonText={"+ Create New Course"}
      />
      <Button type="outline" buttonText={"Explore Existing Courses"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
    marginHorizontal: 25,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    textAlign: "center",
  },
});

export default NoCoursePage;
