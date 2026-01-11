// File: SAPP/store/transactionStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 1. Define the shape of a single Transaction
export type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  icon: string;
};

// 2. Define the Store Actions (aligned with "Domain Logic" [cite: 101])
type TransactionState = {
  transactions: Transaction[];
  addTransaction: (title: string, amount: string) => void;
  deleteTransaction: (id: string) => void;
};

// 3. Create the Store with Persistence (aligned with "Local Storage" [cite: 10])
export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [], // Initial Empty State

      // ACTION: Add a new transaction
      addTransaction: (title, amount) => {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          title: title,
          amount: parseFloat(amount),
          date: new Date().toLocaleDateString(),
          // Simple logic to choose icon based on income/expense
          icon: parseFloat(amount) > 0 
            ? 'https://img.icons8.com/color/48/money-bag.png' 
            : 'https://img.icons8.com/color/48/coffee-to-go.png', 
        };

        set((state) => ({
          // Immutability: Create new array, don't mutate old one
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      // ACTION: Delete a transaction
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'spendlyt-storage', // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage), // Connect to phone disk
    }
  )
);