import { colors } from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Button = (props: any) => {
  const { buttonText, type = "fill", onButtonPress = () => {} } = props;
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: type === "fill" ? colors.Primary : colors.White,
        borderColor: colors.Primary,
        borderWidth: 1,
      }}
      onPress={onButtonPress}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: type === "fill" ? colors.White : colors.Primary,
        }}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
