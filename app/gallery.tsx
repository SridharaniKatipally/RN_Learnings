// app/gallery.tsx
import React, { useState } from "react"; // 👈 Import useState
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput"; // 👈 Import MyInput

export default function GalleryScreen() {
  // We need state to test inputs
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Component Gallery 🎨</Text>

        {/* --- BUTTONS SECTION --- */}
        <Text style={styles.sectionHeader}>Buttons</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Primary</Text>
          <MyButton title="Save Transaction" onPress={() => {}} />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Outline</Text>
          <MyButton title="Cancel" variant="outline" onPress={() => {}} />
        </View>

        {/* --- INPUTS SECTION --- */}
        <Text style={styles.sectionHeader}>Inputs</Text>

        <View style={styles.section}>
          <Text style={styles.label}>1. Normal Input</Text>
          <MyInput
            placeholder="Enter your name"
            value={text}
            onChangeText={setText}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>2. Input with Label</Text>
          <MyInput label="Email Address" placeholder="john@example.com" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>3. Input with Error</Text>
          <MyInput
            label="Password"
            value="123"
            secureTextEntry
            error="Password is too weak"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  content: { padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
  },
  section: { marginBottom: 15 },
  label: { marginBottom: 5, color: "gray", fontWeight: "600", fontSize: 12 },
});
