// components/MyButton.tsx
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

// 1. Define the Props (Arguments) our button accepts
interface MyButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "danger"; // Optional, defaults to "primary"
  isLoading?: boolean;
}

export default function MyButton({
  title,
  onPress,
  variant = "primary", // Default value
  isLoading = false,
}: MyButtonProps) {
  // 2. Logic to choose styles based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case "outline":
        return styles.buttonOutline;
      case "danger":
        return styles.buttonDanger;
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    if (variant === "outline") return styles.textOutline;
    return styles.textPrimary; // White text for Primary & Danger
  };

  return (
    <TouchableOpacity
      style={[styles.baseButton, getButtonStyle()]}
      onPress={onPress}
      disabled={isLoading} // Block clicks while loading
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "outline" ? "#000" : "#FFF"} />
      ) : (
        <Text style={[styles.textBase, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base styles (shared by all buttons)
  baseButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  textBase: {
    fontWeight: "700",
    fontSize: 16,
  },

  // Variants
  buttonPrimary: {
    backgroundColor: "#000", // Main Brand Color
  },
  textPrimary: {
    color: "#FFF",
  },

  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#000",
  },
  textOutline: {
    color: "#000",
  },

  buttonDanger: {
    backgroundColor: "#FF4D4D", // Red
  },
});
