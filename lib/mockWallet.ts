import type { Transaction, WalletStats } from "@/types/wallet";

const mockStats: WalletStats = {
  totalBalance: 128.5,
  availableBalance: 112.25,
  pendingBalance: 16.25,
  miningEarnings: 84.75,
  transactionCount: 12,
  status: "active",
};

const mockTransactions: Transaction[] = [
  {
    id: "tx_001",
    type: "mining",
    amount: 0.25,
    isPositive: true,
    status: "completed",
    timestamp: "2026-09-02T09:14:00Z",
  },
  {
    id: "tx_002",
    type: "receive",
    amount: 12.5,
    isPositive: true,
    status: "completed",
    timestamp: "2026-09-01T18:40:00Z",
  },
  {
    id: "tx_003",
    type: "withdraw",
    amount: 20,
    isPositive: false,
    status: "pending",
    timestamp: "2026-09-01T11:05:00Z",
  },
  {
    id: "tx_004",
    type: "send",
    amount: 5.75,
    isPositive: false,
    status: "completed",
    timestamp: "2026-08-31T20:22:00Z",
  },
  {
    id: "tx_005",
    type: "mining",
    amount: 0.25,
    isPositive: true,
    status: "failed",
    timestamp: "2026-08-31T08:03:00Z",
  },
];

// Simulated network delay so loading states are visible during development.
function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// These functions mimic the shape of real API calls (async, can throw).
// Swap the body for a real `fetch` to your backend later without touching
// any component that calls them.

export async function getWalletStats(): Promise<WalletStats> {
  return delay(mockStats);
}

export async function getTransactions(): Promise<Transaction[]> {
  return delay(mockTransactions);
}
