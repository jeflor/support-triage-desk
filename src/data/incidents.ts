import type { Incident, KnownIssue } from "./types";
import { hoursAgo, daysAgo } from "./time";

export const incidents: Incident[] = [
  {
    id: "INC-241",
    title: "Elevated API latency · /v1/events endpoint",
    status: "investigating",
    productArea: "API · Events ingestion",
    startedAt: hoursAgo(3),
    affectedAccountIds: ["A-1011", "A-1009", "A-1001"],
    ownerTeam: "Platform engineering",
    summary:
      "p95 latency on POST /v1/events spiked from 180ms → 2.4s starting 3h ago. Traced to a hot key in the queue. Mitigation in flight.",
  },
  {
    id: "INC-238",
    title: "SSO login failures · Helix tenant only",
    status: "identified",
    productArea: "Auth · SAML SSO",
    startedAt: hoursAgo(8),
    affectedAccountIds: ["A-1001"],
    ownerTeam: "Identity team",
    summary:
      "Helix users intermittently receive SAML signature mismatch on login. Identified as a clock-skew issue on their IdP side. Workaround: clear local cookies + retry.",
  },
  {
    id: "INC-232",
    title: "Email notifications delayed",
    status: "monitoring",
    productArea: "Notifications · Email",
    startedAt: daysAgo(1),
    affectedAccountIds: [],
    ownerTeam: "Notifications team",
    summary:
      "Some transactional emails delayed up to 30 min over the last 24h. Provider issue. Backlog clearing.",
  },
];

export const incidentsById = Object.fromEntries(
  incidents.map((i) => [i.id, i]),
);

export const knownIssues: KnownIssue[] = [
  {
    id: "KI-1042",
    title: "Mobile app · attachments over 10MB silently fail",
    affectsArea: "Mobile · uploads",
    workaround:
      "Use web app or break the attachment into <10MB chunks. Fix in v2.14 (rolling out next week).",
    trackedBugId: "BUG-8821",
    status: "fix_in_progress",
  },
  {
    id: "KI-1037",
    title: "CSV export drops timezone offset",
    affectsArea: "Exports",
    workaround:
      "Re-import with UTC offset noted manually. Fix targeted for v2.13.",
    trackedBugId: "BUG-8702",
    status: "fix_in_progress",
  },
  {
    id: "KI-1029",
    title: "Webhook retries can deliver out-of-order on first failure",
    affectsArea: "Webhooks",
    workaround:
      "Implement idempotency keys on receiver side. Documented; no fix planned.",
    status: "open",
  },
  {
    id: "KI-1018",
    title: "API rate-limit headers missing on 429 responses",
    affectsArea: "API",
    workaround: "Use the X-Reset header. Fix shipped in v2.12.4.",
    trackedBugId: "BUG-8312",
    status: "fix_shipped",
  },
];

export const knownIssuesById = Object.fromEntries(
  knownIssues.map((k) => [k.id, k]),
);
