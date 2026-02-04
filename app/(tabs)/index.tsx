// SAPP/app/(tabs)/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TransactionCard from "../../components/TransactionCard";
import { useTransactionStore } from "../../store/transactionStore";

// 👇 IMPORT YOUR NEW COMPONENTS
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

export default function HomeScreen() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    loadMockData,
    isLoading,
    isSaving,
    error,
  } = useTransactionStore();

  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ title?: string; amount?: string }>({});
  const [type, setType] = useState<"income" | "expense">("expense");

  useEffect(() => {
    if (transactions.length === 0) loadMockData();
  }, []);

  useEffect(() => {
    if (error) Alert.alert("Oops!", error, [{ text: "OK" }]);
  }, [error]);

  const validate = (): boolean => {
    let valid = true;
    let newErrors: { title?: string; amount?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }

    const numberAmount = parseFloat(amount);
    if (!amount || isNaN(numberAmount) || numberAmount <= 0) {
      newErrors.amount = "Enter a valid positive amount";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const finalAmount = parseFloat(amount);
    const amountToSend = type === "expense" ? -finalAmount : finalAmount;

    await addTransaction(title, amountToSend.toString());

    resetForm();
    setModalVisible(false);
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setErrors({});
    setType("expense");
  };

  const renderContent = () => {
    if (isLoading && transactions.length === 0) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 10, color: "gray" }}>Syncing...</Text>
        </View>
      );
    }

    if (transactions.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No transactions yet.</Text>
          <MyButton title="Reload Data" onPress={loadMockData} />
        </View>
      );
    }

    return (
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
        refreshing={isLoading}
        onRefresh={loadMockData}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          style={styles.logo}
        />
        <Link href="/gallery">
          <Text style={styles.headerText}>Hello Spendlyt</Text>
        </Link>
      </View>

      <View style={styles.content}>{renderContent()}</View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Transaction</Text>

            {/* Custom Toggle (We didn't componentize this yet) */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  type === "expense" && styles.expenseActive,
                ]}
                onPress={() => setType("expense")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    type === "expense" && styles.activeText,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  type === "income" && styles.incomeActive,
                ]}
                onPress={() => setType("income")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    type === "income" && styles.activeText,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>

            {/* 👇 REPLACED: MyInput handles the label, input, and error logic */}
            <MyInput
              label="Title"
              placeholder="e.g. Spotify"
              value={title}
              onChangeText={setTitle}
              error={errors.title}
            />

            <MyInput
              label="Amount"
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              error={errors.amount}
            />

            <View style={styles.buttonRow}>
              {/* 👇 REPLACED: Outline Button for Cancel */}
              <View style={{ flex: 1, marginRight: 10 }}>
                <MyButton
                  title="Cancel"
                  variant="outline"
                  onPress={() => {
                    resetForm();
                    setModalVisible(false);
                  }}
                />
              </View>

              {/* 👇 REPLACED: Primary Button handles loading spinner automatically! */}
              <View style={{ flex: 1 }}>
                <MyButton
                  title="Save"
                  onPress={handleSave}
                  isLoading={isSaving}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  expenseActive: {
    backgroundColor: "#ff4d4d",
  },
  incomeActive: {
    backgroundColor: "#2ecc71",
  },
  toggleText: {
    fontWeight: "600",
    color: "#666",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
});
