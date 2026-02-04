// SAPP/services/mockData.ts

//  1. Type Definition
export type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  icon: string;
};

// This mimics exactly what the Backend API will eventually send us
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "101",
    title: "Spotify Premium Subscription",
    amount: -119,
    date: "Today, 10:00 AM",
    icon: "https://img.icons8.com/color/48/spotify.png",
  },
  {
    id: "102",
    title: "Freelance Project Payment - UI Design",
    amount: 15000,
    date: "Yesterday, 4:30 PM",
    icon: "https://img.icons8.com/color/48/money-bag.png",
  },
  {
    id: "103",
    title: "Tea",
    amount: -20,
    date: "Yesterday, 9:00 AM",
    icon: "https://img.icons8.com/color/48/coffee-to-go.png",
  },
];

export const fetchTransactionsAPI = (): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 🎲 Revert to Random: 20% chance to fail, 80% success
      const shouldFail = Math.random() > 0.8;

      if (shouldFail) {
        console.log("🔥 API Failed!");
        reject("Network Error: Could not fetch transactions.");
      } else {
        console.log("✅ API Success!");
        resolve(MOCK_TRANSACTIONS);
      }
    }, 1500);
  });
};
