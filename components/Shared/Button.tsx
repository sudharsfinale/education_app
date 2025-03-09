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
        type === "fill" ? styles.fillButton : styles.outlineButton,
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
            type === "fill" ? styles.fillText : styles.outlineText,
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
  fillButton: {
    backgroundColor: colors.PRIMARY,
    borderColor: colors.PRIMARY,
  },
  outlineButton: {
    backgroundColor: colors.WHITE,
    borderColor: colors.PRIMARY,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  fillText: {
    color: colors.WHITE,
  },
  outlineText: {
    color: colors.PRIMARY,
  },
});

export default Button;
