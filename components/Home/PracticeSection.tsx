import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import React from "react";
import { PraticeOption } from "@/constants/Options";
import { colors } from "@/constants/Colors";

const PracticeSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <View style={styles.listContainer}>
        <FlatList
          numColumns={3}
          data={PraticeOption}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.itemContainer,
                index !== PraticeOption.length - 1 && styles.itemMargin,
              ]}
            >
              <Image style={styles.image} source={item.image} />
              <Text style={styles.imageText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    marginHorizontal: 25,
  },
  listContainer: {
    marginHorizontal: 25,
    marginVertical: 4,
  },
  separator: {
    width: 16,
  },
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
  },
  itemMargin: {
    marginRight: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 160,
    borderRadius: 16,
  },
  imageText: {
    position: "absolute",
    fontFamily: "outfit-regular",
    padding: 15,
    color: colors.WHITE,
  },
});

export default PracticeSection;
