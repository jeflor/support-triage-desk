import type { AccountTier, SLA } from "./types";

export const slaByTier: Record<AccountTier, SLA> = {
  Enterprise: { tier: "Enterprise", responseMin: 60, resolutionMin: 240 },
  Growth: { tier: "Growth", responseMin: 240, resolutionMin: 24 * 60 },
  Starter: { tier: "Starter", responseMin: 24 * 60, resolutionMin: 72 * 60 },
  Free: { tier: "Free", responseMin: 48 * 60, resolutionMin: 7 * 24 * 60 },
};
