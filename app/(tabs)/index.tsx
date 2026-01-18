<<<<<<< HEAD
// SAPP/app/(tabs)/index.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
=======

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
>>>>>>> 62ec5a9d28bc8101cd27961924397b6ccd0c2f69
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TransactionCard from "../../components/TransactionCard";
import { useTransactionStore } from "../../store/transactionStore";

export default function HomeScreen() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    loadMockData,
    isLoading,
  } = useTransactionStore();

  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // ✨ Week 3: Trigger the API call when screen loads
  useEffect(() => {
    if (transactions.length === 0) {
      loadMockData();
    }
  }, []); // [] means "Run only once"

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please enter both title and amount");
      return;
    }
    addTransaction(title, amount);
    setTitle("");
    setAmount("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Hello Spendlyt</Text>
      </View>

      <View style={styles.content}>
        {/* ✨ Week 3: Show Spinner logic */}
        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={{ marginTop: 10, color: "gray" }}>
              Syncing with Bank...
            </Text>
          </View>
        ) : transactions.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No transactions yet.</Text>
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => deleteTransaction(item.id)}>
                <TransactionCard
                  title={item.title}
                  amount={item.amount}
                  date={item.date}
                  icon={item.icon}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            refreshing={isLoading} // Show the spinner in the list header
            onRefresh={loadMockData} // Call the API again when pulled
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Transaction</Text>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Amount"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { flexDirection: "row", alignItems: "center", padding: 20 },
  logo: { width: 40, height: 40, borderRadius: 20 },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 15,
  },
<<<<<<< HEAD
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" }, // Helper for centering
  emptyText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#000",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
=======
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: 'white', padding: 20, borderRadius: 20, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 15, fontSize: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
>>>>>>> 62ec5a9d28bc8101cd27961924397b6ccd0c2f69
});
