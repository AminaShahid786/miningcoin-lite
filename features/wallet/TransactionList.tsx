"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/mockWallet";
import type { Transaction } from "@/types/wallet";
import TransactionItem from "./TransactionItem";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";

const PAGE_SIZE = 3;

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [error, setError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // `cancelled` guards against setting state after the component has
    // unmounted or a newer request has superseded this one.
    let cancelled = false;

    getTransactions()
      .then((data) => {
        if (!cancelled) setTransactions(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  function retry() {
    // Resetting state here is safe because this runs from a click handler,
    // not synchronously inside the effect body.
    setError(false);
    setTransactions(null);
    setVisibleCount(PAGE_SIZE);
    setReloadKey((k) => k + 1);
  }

  if (error) {
    return <ErrorState message="Couldn't load transactions." onRetry={retry} />;
  }

  if (transactions === null) {
    return <LoadingSkeleton rows={3} />;
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions yet"
        description="Your mining rewards and wallet activity will show up here."
      />
    );
  }

  const visible = transactions.slice(0, visibleCount);
  const hasMore = visibleCount < transactions.length;

  return (
    <div className="flex flex-col gap-2">
      {visible.map((tx, i) => (
        <TransactionItem key={tx.id} tx={tx} delayMs={i * 60} />
      ))}

      {hasMore && (
        <button
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="text-sm text-[var(--color-accent)] py-2 hover:underline"
        >
          Load more
        </button>
      )}
    </div>
  );
}
