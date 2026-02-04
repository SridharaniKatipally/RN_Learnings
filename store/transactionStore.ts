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
  isSaving: boolean;
  error: string | null;

  addTransaction: (title: string, amount: string) => Promise<void>;
  deleteTransaction: (id: string) => void;
  loadMockData: () => Promise<void>;
};

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      isLoading: false,
      isSaving: false,
      error: null,

      addTransaction: async (title, amount) => {
        set({ isSaving: true });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const numAmount = parseFloat(amount);
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          title: title,
          amount: numAmount,
          date: new Date().toLocaleDateString(),
          icon:
            numAmount > 0
              ? "https://img.icons8.com/color/48/money-bag.png"
              : "https://img.icons8.com/color/48/coffee-to-go.png",
        };

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
          isSaving: false,
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      loadMockData: async () => {
        set({ isLoading: true, error: null });
        console.log("1. Loading Data...");

        try {
          const data = await fetchTransactionsAPI();
          console.log("2. Data Arrived!");

          const uniqueData = data.map((item: any) => ({
            ...item,
            id: Math.random().toString(),
          }));

          // 👇 FIXED: Replace the list instead of appending
          set((state) => ({
            transactions: uniqueData,
            isLoading: false,
          }));
          console.log("3. Success!");
        } catch (error: any) {
          console.error("🔥 Store Caught Error:", error);
          set({
            error: error.toString() || "Something went wrong",
            isLoading: false,
          });
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
