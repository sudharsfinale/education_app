import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const CourseListGrid = (props: any) => {
  const { option, courseList } = props;
  const router = useRouter();
  const onPress = (course: any) => {
    router.push({
      //@ts-ignore
      pathname: option?.path,
      params: {
        courseParams: JSON.stringify(course),
      },
    });
  };
  return (
    <View style={{ marginTop: 6 }}>
      <FlatList
        data={courseList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              key={index}
              onPress={() => onPress(item)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                backgroundColor: "white",
                margin: 7,
                borderRadius: 16,
              }}
            >
              <AntDesign
                name="checkcircle"
                size={24}
                color={colors.GRAY}
                style={{ position: "absolute", top: 16, right: 16 }}
              />
              <Image
                style={{ height: 70, width: "100%", objectFit: "contain" }}
                source={option.icon}
              />
              <Text
                style={{
                  marginTop: 7,
                  textAlign: "center",
                  fontFamily: "outfit",
                }}
              >
                {item?.courseTitle}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default CourseListGrid;
