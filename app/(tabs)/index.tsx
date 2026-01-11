// File: SAPP/app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView, StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// Import your component
import TransactionCard from '../../components/TransactionCard';
// 👇 IMPORT THE STORE (The connection to the brain)
import { useTransactionStore } from '../../store/transactionStore';

export default function HomeScreen() {
  // 🟢 1. GET DATA FROM STORE (Global State)
  const { transactions, addTransaction, deleteTransaction } = useTransactionStore();

  // 🔵 2. LOCAL STATE (For the Modal Inputs)
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  // 3. HANDLE SAVE (Send data to Store)
  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Please enter both title and amount');
      return;
    }
    
    // Call the global action
    addTransaction(title, amount);
    
    // Reset the form
    setTitle('');
    setAmount('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.headerText}>Hello Spendlyt</Text>
      </View>

      {/* Body: Displays the Transactions from Store */}
      <View style={styles.content}>
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions yet.</Text>
            <Text style={styles.emptySubText}>Tap the + button to add one!</Text>
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // Long press to delete
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
          />
        )}
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal Popup */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Transaction</Text>
            
            <TextInput 
              placeholder="Title (e.g. Coffee)" 
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
            
            <TextInput 
              placeholder="Amount (e.g. -500)" 
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <View style={styles.buttonRow}>
              <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  logo: { width: 40, height: 40, borderRadius: 20 },
  headerText: { color: '#fff', fontSize: 22, fontWeight: '700', marginLeft: 15 },
  content: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 25 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  emptySubText: { fontSize: 14, color: '#888', marginTop: 5 },
  fab: {
    position: 'absolute', bottom: 30, right: 30, backgroundColor: '#000',
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 3,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: 'white', padding: 20, borderRadius: 20, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 15, fontSize: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});