// components/MyInput.tsx
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

// Extend standard TextInput props so we can use placeholder, value, onChangeText, etc.
interface MyInputProps extends TextInputProps {
  label?: string; // Optional label above the input
  error?: string; // Optional error message below
}

export default function MyInput({
  label,
  error,
  style,
  ...props // Capture all other props (value, onChangeText, keyboardType)
}: MyInputProps) {
  return (
    <View style={styles.container}>
      {/* 1. Label (Optional) */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* 2. The Input Box */}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null, // Turn border red if error exists
          style,
        ]}
        placeholderTextColor="#999"
        {...props} // Pass standard props to the native input
      />

      {/* 3. Error Text (Only shows if error exists) */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderColor: "#FF4D4D", // Red border
    backgroundColor: "#FFF0F0", // Light red background
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
