"use client";

import { useState } from "react";
import { Zap, Trophy } from "lucide-react";
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

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-[var(--color-surface)] border border-white/5 px-3 py-1.5 text-xs">
      <Icon size={13} className="text-[var(--color-accent)]" />
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

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

      <div className="flex flex-wrap justify-center gap-2">
        <StatPill icon={Zap} label="Rate" value={`+${stats.miningRatePerTap}/tap`} />
        <StatPill
          icon={Zap}
          label="Today"
          value={`${formatCoin(stats.dailyMined)}/${stats.dailyLimit}`}
        />
        <StatPill icon={Trophy} label="Level" value={stats.levelLabel} />
      </div>
    </section>
  );
}
