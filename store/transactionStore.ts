// SAPP/store/transactionStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fetchTransactionsAPI } from "../services/mockData";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  icon: string;
};

type TransactionState = {
  transactions: Transaction[];
  isLoading: boolean;

  addTransaction: (title: string, amount: string) => void;
  deleteTransaction: (id: string) => void;
  loadMockData: () => Promise<void>;
};

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      isLoading: false,

      addTransaction: (title, amount) => {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          title: title,
          amount: parseFloat(amount),
          date: new Date().toLocaleDateString(),
          icon:
            parseFloat(amount) > 0
              ? "https://img.icons8.com/color/48/money-bag.png"
              : "https://img.icons8.com/color/48/coffee-to-go.png",
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      // ✨ UPDATED: Safer Loading Logic
      loadMockData: async () => {
        set({ isLoading: true });
        console.log("1.Loading Data...");
        try {
          const data = await fetchTransactionsAPI();
          console.log("2. Data Arrived from Server!");

          // Generate unique IDs for the new items
          const uniqueData = data.map((item: any) => ({
            ...item,
            id: Math.random().toString(), // Give it a random ID
          }));

          set((state) => ({
            transactions: [...uniqueData, ...state.transactions],
            isLoading: false,
          }));
          console.log("3. State Updated!");
        } catch (error) {
          console.error("Error fetching data:", error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "spendlyt-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ transactions: state.transactions }),
    },
  ),
);
