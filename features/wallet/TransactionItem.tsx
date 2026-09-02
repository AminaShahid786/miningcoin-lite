import { ArrowDownLeft, ArrowUpRight, Pickaxe, Banknote } from "lucide-react";
import type { Transaction } from "@/types/wallet";
import { formatCoin } from "@/utils/format";

const typeLabels: Record<Transaction["type"], string> = {
  mining: "Mining Reward",
  receive: "Received",
  send: "Sent",
  withdraw: "Withdrawal",
};

const typeIcons: Record<Transaction["type"], React.ElementType> = {
  mining: Pickaxe,
  receive: ArrowDownLeft,
  send: ArrowUpRight,
  withdraw: Banknote,
};

const statusStyles: Record<Transaction["status"], string> = {
  completed: "text-[var(--color-success)]",
  pending: "text-[var(--color-accent)]",
  failed: "text-[var(--color-error)]",
};

function formatTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TransactionItem({ tx }: { tx: Transaction }) {
  const Icon = typeIcons[tx.type];

  return (
    <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--color-surface)] px-4 py-3 transition-colors hover:bg-[var(--color-surface-hover)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            tx.isPositive
              ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
              : "bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)]"
          }`}
        >
          <Icon size={16} />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium">{typeLabels[tx.type]}</span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {formatTime(tx.timestamp)} · {tx.id}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span
          className={`text-sm font-semibold ${
            tx.isPositive ? "text-[var(--color-success)]" : "text-[var(--color-text)]"
          }`}
        >
          {tx.isPositive ? "+" : "-"}
          {formatCoin(tx.amount)} MC
        </span>
        <span className={`text-xs capitalize ${statusStyles[tx.status]}`}>
          {tx.status}
        </span>
      </div>
    </div>
  );
}
