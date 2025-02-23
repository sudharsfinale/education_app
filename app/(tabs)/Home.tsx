import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import NoCoursePage from "@/components/Home/NoCoursePage";
import { colors } from "@/constants/Colors";

const Home = () => {
  return (
    <View style={{ padding: 25, backgroundColor: colors.WHITE, flex: 1 }}>
      <Header />
      <NoCoursePage />
    </View>
  );
};

export default Home;
