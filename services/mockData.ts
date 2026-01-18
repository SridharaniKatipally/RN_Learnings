// SAPP/services/mockData.ts

// This mimics exactly what the Backend API will eventually send us
export const MOCK_TRANSACTIONS = [
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

// This simulates a network call that takes 1.5 seconds
export const fetchTransactionsAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TRANSACTIONS);
    }, 1500); // 1.5 second delay
  });
};
