"use client";

import { useState } from "react";
import MiningButton from "@/components/ui/MiningButton";
import { formatCoin } from "@/utils/format";
import type { MiningStats } from "@/types/mining";

const initialStats: MiningStats = {
  balance: 128.5,
  miningRatePerTap: 0.25,
  dailyMined: 4.75,
  dailyLimit: 20,
  level: 3,
  levelLabel: "Bronze Miner",
  isMining: false,
};

export default function MiningHero() {
  const [stats, setStats] = useState(initialStats);

  function handleTap() {
    setStats((prev) => ({
      ...prev,
      balance: prev.balance + prev.miningRatePerTap,
      dailyMined: prev.dailyMined + prev.miningRatePerTap,
    }));
  }

  return (
    <section className="flex flex-col items-center gap-8 py-16 px-6">
      <div className="text-center">
        <p className="text-[var(--color-text-muted)] text-sm mb-2">
          Your Balance
        </p>
        <h1 className="text-5xl font-semibold tracking-tight">
          {formatCoin(stats.balance)}{" "}
          <span className="text-[var(--color-accent)] text-2xl">MC</span>
        </h1>
      </div>

      <MiningButton onTap={handleTap} />

      <div className="flex gap-6 text-sm text-[var(--color-text-muted)]">
        <span>
          Rate:{" "}
          <span className="text-[var(--color-text)]">
            +{stats.miningRatePerTap} / tap
          </span>
        </span>
        <span>
          Today:{" "}
          <span className="text-[var(--color-text)]">
            {formatCoin(stats.dailyMined)} / {stats.dailyLimit}
          </span>
        </span>
        <span>
          Level:{" "}
          <span className="text-[var(--color-accent)]">{stats.levelLabel}</span>
        </span>
      </div>
    </section>
  );
}