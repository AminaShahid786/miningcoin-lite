export interface MiningStats {
  balance: number;
  miningRatePerTap: number;
  dailyMined: number;
  dailyLimit: number;
  level: number;
  levelLabel: string;
  isMining: boolean;
}