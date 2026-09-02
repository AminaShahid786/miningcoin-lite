"use client";

import { useEffect, useState } from "react";
import { getWalletStats } from "@/lib/mockWallet";
import type { WalletStats } from "@/types/wallet";
import { formatCoin } from "@/utils/format";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";

const actions = ["Receive", "Send", "Withdraw"];

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function WalletCard() {
  const [stats, setStats] = useState<WalletStats | null>(null);
  const [error, setError] = useState(false);

  async function load() {
    setError(false);
    setStats(null);
    try {
      const data = await getWalletStats();
      setStats(data);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Wallet</h2>
        {stats && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              stats.status === "active"
                ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                : "bg-[var(--color-error)]/15 text-[var(--color-error)]"
            }`}
          >
            {stats.status === "active" ? "Active" : "Restricted"}
          </span>
        )}
      </div>

      {error && <ErrorState message="Couldn't load wallet." onRetry={load} />}

      {!error && stats === null && <LoadingSkeleton rows={4} />}

      {stats && (
        <>
          <div>
            <p className="text-[var(--color-text-muted)] text-xs mb-1">
              Total Balance
            </p>
            <p className="text-3xl font-semibold">
              {formatCoin(stats.totalBalance)}{" "}
              <span className="text-[var(--color-accent)] text-lg">MC</span>
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
            <StatRow label="Available" value={`${formatCoin(stats.availableBalance)} MC`} />
            <StatRow label="Pending" value={`${formatCoin(stats.pendingBalance)} MC`} />
            <StatRow label="Mining Earnings" value={`${formatCoin(stats.miningEarnings)} MC`} />
            <StatRow label="Transactions" value={`${stats.transactionCount}`} />
          </div>

          <div className="flex gap-2 pt-2">
            {actions.map((action) => (
              <button
                key={action}
                className="flex-1 text-sm py-2 rounded-[var(--radius-sm)] border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
