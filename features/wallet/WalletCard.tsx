"use client";

import { useEffect, useState } from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight, Banknote, Check } from "lucide-react";
import { getWalletStats } from "@/lib/mockWallet";
import type { WalletStats } from "@/types/wallet";
import { formatCoin } from "@/utils/format";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";

const actions = [
  { label: "Receive", icon: ArrowDownLeft, message: "Receive address copied. Share it to get paid." },
  { label: "Send", icon: ArrowUpRight, message: "Send flow would open here." },
  { label: "Withdraw", icon: Banknote, message: "Withdrawal request submitted." },
];

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
  const [reloadKey, setReloadKey] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getWalletStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  function retry() {
    setError(false);
    setStats(null);
    setReloadKey((k) => k + 1);
  }

  function handleAction(message: string) {
    setToast(message);
  }

  return (
    <div className="relative rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-white/5 p-6 flex flex-col gap-5 transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet size={18} className="text-[var(--color-accent)]" />
          <h2 className="font-semibold text-lg">Wallet</h2>
        </div>
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

      {error && <ErrorState message="Couldn't load wallet." onRetry={retry} />}

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
            {actions.map(({ label, icon: Icon, message }) => (
              <button
                key={label}
                onClick={() => handleAction(message)}
                className="flex flex-1 items-center justify-center gap-1.5 text-sm py-2 rounded-[var(--radius-sm)] border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)] active:scale-95 transition-all"
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {toast && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2 rounded-full bg-[var(--color-success)]/15 border border-[var(--color-success)]/30 text-[var(--color-success)] text-xs px-3 py-1.5 animate-[fadeInUp_0.25s_ease-out]">
          <Check size={13} />
          {toast}
        </div>
      )}
    </div>
  );
}
