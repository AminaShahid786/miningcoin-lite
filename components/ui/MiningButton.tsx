"use client";

import { useState } from "react";

interface MiningButtonProps {
  onTap: () => void;
}

export default function MiningButton({ onTap }: MiningButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [showReward, setShowReward] = useState(false);

  function handleTap() {
    setIsPressed(true);
    setShowReward(true);
    onTap();

    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => setShowReward(false), 700);
  }

  return (
    <div className="relative flex items-center justify-center">
      {showReward && (
        <span className="absolute -top-8 text-[var(--color-accent)] font-semibold text-lg animate-[floatUp_0.7s_ease-out_forwards]">
          +0.25
        </span>
      )}

      <button
        onClick={handleTap}
        className={`
          h-40 w-40 rounded-full
          bg-[var(--color-surface)]
          border-2 border-[var(--color-accent)]
          flex items-center justify-center
          transition-transform duration-150
          active:scale-90
          ${isPressed ? "scale-95" : "scale-100"}
        `}
      >
        <span className="text-[var(--color-accent)] font-semibold text-base">
          Tap to Mine
        </span>
      </button>
    </div>
  );
}