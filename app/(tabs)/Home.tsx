import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import NoCoursePage from "@/components/Home/NoCoursePage";

const Home = () => {
  return (
    <View style={{ padding: 25 }}>
      <Header />
      <NoCoursePage />
    </View>
  );
};

export default Home;
