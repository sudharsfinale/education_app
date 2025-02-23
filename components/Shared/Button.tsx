import { colors } from "@/constants/Colors";
import React, { FC } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";

interface ButtonProps {
  buttonText: string;
  type?: "fill" | "outline";
  onButtonPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    buttonText,
    type = "fill",
    onButtonPress = () => {},
    loading = false,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: type === "fill" ? colors.PRIMARY : colors.WHITE,
          borderColor: colors.PRIMARY,
        },
      ]}
      onPress={onButtonPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size={21.5} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: type === "fill" ? colors.WHITE : colors.PRIMARY },
          ]}
        >
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    width: "100%",
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default Button;
