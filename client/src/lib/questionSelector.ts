import type { Challenge } from "@/lib/activities";

export function selectQuestions(pool: Challenge[], count: number): Challenge[] {
  if (pool.length <= count) return [...pool];
  const shuffled = [...pool];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(0, count);
}

export function regularRunLength() {
  return Math.random() < 0.5 ? 8 : 9;
}
