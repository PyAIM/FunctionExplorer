import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ACTIVITIES, BOSS } from "@/lib/activities";

export type ActivityStat = {
  attempts: number;
  bestCorrect: number;
  bestTotal: number;
  bestPercent: number;
  lastCorrect: number;
  lastTotal: number;
  lastPercent: number;
  passed: boolean;
  completedAt?: string;
};

type GameState = {
  playerName: string;
  totalXP: number;
  earnedBadges: string[];
  bestScores: Record<string, number>;
  activityStats: Record<string, ActivityStat>;
  cipherCleared: boolean;
};

type GameContextValue = GameState & {
  setPlayerName: (name: string) => void;
  completeActivity: (activityId: string, score: number, correct: number, total: number, canEarn?: boolean) => { earned: boolean; xpAdded: number; passed: boolean };
  completeCipher: () => { earned: boolean; xpAdded: number };
  isActivityUnlocked: (activityId: string) => boolean;
  isCipherUnlocked: boolean;
  resetProgress: () => void;
  nextMissionId: string | null;
  frontierComplete: boolean;
};

const STORAGE_KEY = "function-frontier-progress";
const initialState: GameState = { playerName: "", totalXP: 0, earnedBadges: [], bestScores: {}, activityStats: {}, cipherCleared: false };
const GameContext = createContext<GameContextValue | undefined>(undefined);

function loadState(): GameState {
  if (typeof window === "undefined") return initialState;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return { ...initialState, ...parsed, activityStats: parsed.activityStats ?? {} };
  } catch {
    return initialState;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);

  const value = useMemo<GameContextValue>(() => {
    const isActivityUnlocked = (activityId: string) => {
      if (activityId === BOSS.id) return ACTIVITIES.every((activity) => state.earnedBadges.includes(activity.badgeId));
      const activity = ACTIVITIES.find((item) => item.id === activityId);
      if (!activity) return false;
      if (activity.order === 1) return true;
      const previous = ACTIVITIES.find((item) => item.order === activity.order - 1);
      return previous ? state.earnedBadges.includes(previous.badgeId) : false;
    };
    const nextMission = ACTIVITIES.find((item) => !state.earnedBadges.includes(item.badgeId));
    const frontierComplete = state.earnedBadges.includes(BOSS.badgeId);
    const isCipherUnlocked = state.earnedBadges.includes("inverse-badge");

    return {
      ...state,
      setPlayerName: (name) => setState((prev) => ({ ...prev, playerName: name.trim().slice(0, 24) })),
      completeActivity: (activityId, score, correct, total, canEarn = true) => {
        const activity = activityId === BOSS.id ? BOSS : ACTIVITIES.find((item) => item.id === activityId);
        if (!activity) return { earned: false, xpAdded: 0, passed: false };
        const alreadyEarned = state.earnedBadges.includes(activity.badgeId);
        const oldBest = state.bestScores[activityId] ?? 0;
        const newBest = Math.max(oldBest, score);
        const xpAdded = Math.max(0, newBest - oldBest);
        const shouldEarn = canEarn && !alreadyEarned;
        const percent = total ? Math.round((correct / total) * 100) : 0;
        setState((prev) => {
          const prior = prev.activityStats[activityId];
          const priorBestPercent = prior?.bestPercent ?? -1;
          const shouldReplaceBest = percent > priorBestPercent || (percent === priorBestPercent && correct > (prior?.bestCorrect ?? 0));
          const stat: ActivityStat = {
            attempts: (prior?.attempts ?? 0) + 1,
            bestCorrect: shouldReplaceBest ? correct : (prior?.bestCorrect ?? 0),
            bestTotal: shouldReplaceBest ? total : (prior?.bestTotal ?? total),
            bestPercent: shouldReplaceBest ? percent : Math.max(prior?.bestPercent ?? 0, percent),
            lastCorrect: correct,
            lastTotal: total,
            lastPercent: percent,
            passed: (prior?.passed ?? false) || canEarn,
            completedAt: canEarn ? new Date().toISOString() : prior?.completedAt,
          };
          return {
            ...prev,
            totalXP: prev.totalXP + Math.max(0, Math.max(prev.bestScores[activityId] ?? 0, score) - (prev.bestScores[activityId] ?? 0)),
            earnedBadges: shouldEarn ? [...prev.earnedBadges, activity.badgeId] : prev.earnedBadges,
            bestScores: { ...prev.bestScores, [activityId]: Math.max(prev.bestScores[activityId] ?? 0, score) },
            activityStats: { ...prev.activityStats, [activityId]: stat },
          };
        });
        return { earned: shouldEarn, xpAdded, passed: canEarn };
      },
      completeCipher: () => {
        const alreadyCleared = state.cipherCleared;
        const xpAdded = alreadyCleared ? 0 : 60;
        if (!alreadyCleared) setState((prev) => prev.cipherCleared ? prev : { ...prev, cipherCleared: true, totalXP: prev.totalXP + 60 });
        return { earned: !alreadyCleared, xpAdded };
      },
      isActivityUnlocked,
      isCipherUnlocked,
      resetProgress: () => setState(initialState),
      nextMissionId: nextMission?.id ?? (isActivityUnlocked(BOSS.id) && !frontierComplete ? BOSS.id : null),
      frontierComplete,
    };
  }, [state]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used inside GameProvider");
  return context;
}
