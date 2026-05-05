import type { Macro } from "./types";

export const macros: Macro[] = [
  {
    id: "M-001",
    name: "First touch · acknowledge + ETA",
    category: "First response",
    shortcut: ";ack",
    uses: 412,
    body: `Hi {{first_name}},\n\nThanks for reaching out — I've got your ticket and I'm digging in now. I'll have an update for you within {{sla_response}} hours, sooner if I can.\n\nIn the meantime, anything else helpful: error timestamps, screenshots, or the workspace ID?\n\nThanks,\n{{agent_name}}`,
  },
  {
    id: "M-002",
    name: "Known incident · INC-241 (API latency)",
    category: "Incident response",
    shortcut: ";inc241",
    uses: 38,
    body: `Hi {{first_name}},\n\nWe're aware of elevated latency on the events API and our platform team is actively working on it. Status is being updated at status.northwind.io/INC-241. We'll follow up here when it's resolved.\n\nThanks for your patience,\n{{agent_name}}`,
  },
  {
    id: "M-003",
    name: "Refund · pro-rated (billing approved)",
    category: "Billing",
    shortcut: ";refund-prorated",
    uses: 67,
    body: `Hi {{first_name}},\n\nProcessed a pro-rated refund for the unused portion of this billing period — should appear on your statement within 5-7 business days. Confirmation email is on its way.\n\nLet me know if anything looks off.\n\n{{agent_name}}`,
  },
  {
    id: "M-004",
    name: "Asking for repro steps + screenshots",
    category: "Triage",
    shortcut: ";repro",
    uses: 234,
    body: `Hi {{first_name}},\n\nTo dig in faster, could you share:\n• A screenshot or screen recording of what you're seeing\n• The browser/OS version\n• The exact time it last happened (with timezone)\n• Your workspace ID (top-right of the app, looks like ws_xxxxx)\n\nThanks!\n{{agent_name}}`,
  },
  {
    id: "M-005",
    name: "SSO failure · clock-skew workaround",
    category: "Auth",
    shortcut: ";sso-skew",
    uses: 19,
    body: `Hi {{first_name}},\n\nLooks like the SAML signature is rejecting because of a clock-skew between your IdP and our auth server. Two things will get you back in:\n\n1) Have your IT confirm the IdP system clock is NTP-synced\n2) Clear your browser cookies for our domain and try again\n\nIf that doesn't work in 10 minutes, ping us back and we'll loop in our identity team.\n\n{{agent_name}}`,
  },
  {
    id: "M-006",
    name: "Closing · CSAT survey",
    category: "Closing",
    shortcut: ";close",
    uses: 502,
    body: `Hi {{first_name}},\n\nGoing to mark this one resolved — feel free to reopen if anything changes. If you have a moment, we'd love your feedback: {{csat_link}}\n\nThanks,\n{{agent_name}}`,
  },
  {
    id: "M-007",
    name: "Engineering handoff (escalation)",
    category: "Escalation",
    shortcut: ";eng-handoff",
    uses: 26,
    body: `Hi {{first_name}},\n\nWe're escalating this to engineering — they'll need {{eta}} to investigate. We'll keep this ticket open and update you as soon as we hear back. You can also follow status updates at status.northwind.io.\n\n{{agent_name}}`,
  },
  {
    id: "M-008",
    name: "Mobile · attachment size workaround",
    category: "Mobile",
    shortcut: ";mobile-attach",
    uses: 14,
    body: `Hi {{first_name}},\n\nWe have a known issue (KI-1042) where attachments over 10MB silently fail in the mobile app. Until v2.14 ships next week, please use the web app for files over 10MB.\n\nSorry for the friction —\n{{agent_name}}`,
  },
];

export const macrosById = Object.fromEntries(macros.map((m) => [m.id, m]));
