// Anchored "now" for the demo so timestamps are deterministic.
export const NOW = new Date("2026-04-30T15:00:00.000Z");

export const minsAgo = (n: number) =>
  new Date(NOW.getTime() - n * 60_000).toISOString();
export const minsFromNow = (n: number) =>
  new Date(NOW.getTime() + n * 60_000).toISOString();
export const hoursAgo = (n: number) =>
  new Date(NOW.getTime() - n * 3_600_000).toISOString();
export const hoursFromNow = (n: number) =>
  new Date(NOW.getTime() + n * 3_600_000).toISOString();
export const daysAgo = (n: number) =>
  new Date(NOW.getTime() - n * 86_400_000).toISOString();
