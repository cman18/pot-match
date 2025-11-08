export function likertToScore(n: number) {
  const clamped = Math.max(1, Math.min(5, n));
  return (clamped - 3) / 2; // 1 -> -1, 3 -> 0, 5 -> 1
}
export function percentToWeight(p: number) {
  const x = Math.max(0, Math.min(100, p));
  return x / 100;
}
