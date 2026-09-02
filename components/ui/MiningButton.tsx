"use client";

import { useState, useRef } from "react";

interface MiningButtonProps {
  onTap: () => void;
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
}

const PARTICLE_COUNT = 8;

export default function MiningButton({ onTap }: MiningButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  function handleTap() {
    setIsPressed(true);
    setShowReward(true);
    onTap();

    // Generate a small burst of particles radiating outward at random angles.
    const newParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map(
      () => ({
        id: particleIdRef.current++,
        angle: Math.random() * 360,
        distance: 50 + Math.random() * 30,
      })
    );
    setParticles(newParticles);

    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => setShowReward(false), 700);
    setTimeout(() => setParticles([]), 600);
  }

  return (
    <div className="relative flex items-center justify-center">
      {showReward && (
        <span className="absolute -top-8 text-[var(--color-accent)] font-semibold text-lg animate-[floatUp_0.7s_ease-out_forwards] pointer-events-none">
          +0.25
        </span>
      )}

      {particles.map((p) => {
        const x = Math.cos((p.angle * Math.PI) / 180) * p.distance;
        const y = Math.sin((p.angle * Math.PI) / 180) * p.distance;
        return (
          <span
            key={p.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] pointer-events-none animate-[particlePop_0.6s_ease-out_forwards]"
            style={
              {
                "--particle-x": `${x}px`,
                "--particle-y": `${y}px`,
              } as React.CSSProperties
            }
          />
        );
      })}

      <button
        onClick={handleTap}
        className={`
          relative h-40 w-40 rounded-full
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
