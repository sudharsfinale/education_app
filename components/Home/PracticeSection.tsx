import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { PraticeOption } from "@/constants/Options";
import { colors } from "@/constants/Colors";

const PracticeSection = () => {
  return (
    <View style={{ marginTop: 12 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          marginHorizontal: 25,
        }}
      >
        Practice
      </Text>
      <View style={{ marginHorizontal: 25, marginVertical: 4 }}>
        <FlatList
          numColumns={3}
          data={PraticeOption}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                aspectRatio: 1,
                marginRight: PraticeOption.length - 1 === index ? 0 : 8,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 16,
                }}
                source={item.image}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "outfit-regular",
                  padding: 15,
                  color: colors.WHITE,
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PracticeSection;
