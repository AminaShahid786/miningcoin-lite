export type TransactionType = "mining" | "receive" | "send" | "withdraw";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  isPositive: boolean;
  status: TransactionStatus;
  timestamp: string;
}

export interface WalletStats {
  totalBalance: number;
  availableBalance: number;
  pendingBalance: number;
  miningEarnings: number;
  transactionCount: number;
  status: "active" | "restricted";
}
