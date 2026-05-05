import type { Ticket, Message } from "./types";
import { accountsById } from "./accounts";
import { slaByTier } from "./sla";
import { minsAgo, NOW } from "./time";

type TicketSeed = Omit<
  Ticket,
  | "createdAt"
  | "lastCustomerMessageAt"
  | "lastAgentReplyAt"
  | "slaResponseDueAt"
  | "slaResolutionDueAt"
  | "escalatedAt"
  | "snoozeUntil"
  | "firstResponseAt"
> & {
  createdMinsAgo: number;
  lastCustomerMessageMinsAgo: number;
  lastAgentReplyMinsAgo?: number;
  escalatedMinsAgo?: number;
  snoozeMinsFromNow?: number;
  firstResponseMinsAgo?: number;
};

const seeds: TicketSeed[] = [
  // ========== T-4823 · ANGRY ENTERPRISE · BREACHING SLA ==========
  {
    id: "T-4823",
    subject: "Production data NOT loading — third time this month",
    customerId: "C-001",
    accountId: "A-1001",
    channel: "email",
    priority: "urgent",
    status: "open",
    ownerId: "ag_morgan",
    createdMinsAgo: 95,
    lastCustomerMessageMinsAgo: 18,
    lastAgentReplyMinsAgo: 42,
    firstResponseMinsAgo: 84,
    tags: ["P1", "data-loading", "regression?", "enterprise"],
    unread: true,
    sentiment: "angry",
    sentimentHistory: ["frustrated", "frustrated", "angry", "angry"],
    incidentId: "INC-241",
    category: "Bug · Data Loading",
    productArea: "Events ingestion",
    urgencyScore: 96,
    aiSignals: [
      {
        id: "s-4823-1",
        kind: "incident_match",
        body: "Matches active incident INC-241 — API latency on /v1/events spiked 3h ago",
        weight: "high",
        targetIncidentId: "INC-241",
      },
      {
        id: "s-4823-2",
        kind: "vip_account",
        body: "Helix is a $7k/mo Enterprise account with strict SLA terms",
        weight: "high",
      },
      {
        id: "s-4823-3",
        kind: "sentiment_shift",
        body: "Sentiment escalated frustrated → angry across last 3 messages",
        weight: "high",
      },
      {
        id: "s-4823-4",
        kind: "macro_suggested",
        body: "Recommend macro: Known incident · INC-241",
        weight: "medium",
        targetMacroId: "M-002",
      },
    ],
    aiSummary:
      "Avery (Helix VP RevOps) reporting third data-loading failure this month. Tone is hot. Strongly correlated with active INC-241 (API latency on /v1/events). Recommend ack with the incident link, escalate to engineering for an exec-facing comms note.",
    aiSuggestedMacroId: "M-002",
    relatedTicketIds: ["T-4791", "T-4744"],
    aiSuggestedReply: "",
  },

  // ========== T-4825 · BILLING DISPUTE — "we already paid" ==========
  {
    id: "T-4825",
    subject: "Re: Past due invoice notice — we paid this on Apr 14",
    customerId: "C-003",
    accountId: "A-1002",
    channel: "email",
    priority: "high",
    status: "waiting_on_internal",
    ownerId: "ag_priya",
    createdMinsAgo: 240,
    lastCustomerMessageMinsAgo: 96,
    lastAgentReplyMinsAgo: 30,
    firstResponseMinsAgo: 230,
    tags: ["billing", "invoice-dispute", "PO-mismatch"],
    sentiment: "frustrated",
    sentimentHistory: ["neutral", "frustrated", "frustrated"],
    blockedReason: "Awaiting finance to verify wire receipt against invoice",
    category: "Billing · Invoice dispute",
    productArea: "Billing",
    urgencyScore: 78,
    aiSignals: [
      {
        id: "s-4825-1",
        kind: "billing_dispute",
        body: "Customer says 'paid Apr 14 via wire' — our system shows invoice still unpaid. Likely PO/wire reconciliation issue (already known on this account)",
        weight: "high",
      },
      {
        id: "s-4825-2",
        kind: "missing_context",
        body: "Customer hasn't shared wire confirmation or PO reference yet. Can't fully resolve until they do.",
        weight: "medium",
      },
    ],
    aiSummary:
      "Brightlane is contesting a past-due invoice notice. Their ongoing PO split issue (CX/IT) is likely the root cause. Asked finance to manually verify against wires received Apr 13-15. Need wire confirmation from Renée to close.",
    missingContext: ["Wire confirmation receipt", "PO reference number"],
    aiSuggestedMacroId: "M-004",
  },

  // ========== T-4827 · ESCALATED · CHURN-RISK ==========
  {
    id: "T-4827",
    subject: "We need to talk about this product. Pattern of issues.",
    customerId: "C-005",
    accountId: "A-1003",
    channel: "email",
    priority: "urgent",
    status: "escalated",
    ownerId: "es_avery",
    createdMinsAgo: 360,
    lastCustomerMessageMinsAgo: 220,
    lastAgentReplyMinsAgo: 120,
    firstResponseMinsAgo: 340,
    escalatedMinsAgo: 90,
    escalatedTo: "es_avery",
    escalationReason:
      "Pattern of complaints from at-risk Enterprise account. CSM (Inés) flagged churn risk. Looping in escalation specialist + manager.",
    tags: ["P1", "churn-risk", "enterprise", "exec-attention"],
    sentiment: "angry",
    sentimentHistory: ["frustrated", "angry", "angry"],
    category: "Account · Pattern complaint",
    productArea: "Multi-area",
    urgencyScore: 99,
    aiSignals: [
      {
        id: "s-4827-1",
        kind: "churn_risk",
        body: "Aldridge is flagged churn-risk by CS. This is the 5th support ticket in 30 days. Pattern detected.",
        weight: "high",
      },
      {
        id: "s-4827-2",
        kind: "vip_account",
        body: "$10.7k/mo Enterprise · 9mo tenure · health score 41 (low)",
        weight: "high",
      },
      {
        id: "s-4827-3",
        kind: "escalation_recommended",
        body: "Recommend looping CSM (Inés Marchetti) + Support Manager — this needs an exec touch within 24h.",
        weight: "high",
      },
    ],
    aiSummary:
      "Theo (COO) sent a long, hot message about pattern of issues. Tone is angry. Account is already churn-risk flagged. Pulled into escalation queue and Avery is owner. CSM Inés should be looped immediately.",
    relatedTicketIds: ["T-4801", "T-4762", "T-4733", "T-4711"],
  },

  // ========== T-4828 · ENGINEERING HANDOFF — INCIDENT LINKED ==========
  {
    id: "T-4828",
    subject: "API returning 502s intermittently — last 90 minutes",
    customerId: "C-016",
    accountId: "A-1011",
    channel: "api",
    priority: "high",
    status: "waiting_on_internal",
    ownerId: "es_kenji",
    createdMinsAgo: 70,
    lastCustomerMessageMinsAgo: 40,
    lastAgentReplyMinsAgo: 20,
    firstResponseMinsAgo: 55,
    tags: ["api", "5xx", "incident-linked"],
    sentiment: "neutral",
    sentimentHistory: ["neutral", "neutral"],
    incidentId: "INC-241",
    blockedReason: "Engineering investigating · incident INC-241",
    category: "API · 5xx errors",
    productArea: "Events ingestion",
    urgencyScore: 82,
    aiSignals: [
      {
        id: "s-4828-1",
        kind: "incident_match",
        body: "Linked to INC-241. Customer is a technical buyer — they probably already saw status page.",
        weight: "high",
        targetIncidentId: "INC-241",
      },
    ],
    aiSummary:
      "Cobalt Cloud (technical SaaS account) reporting intermittent 502s on /v1/events. Linked to active INC-241. Elena is patient and self-serving. Holding for engineering.",
    aiSuggestedMacroId: "M-002",
  },

  // ========== T-4829 · DUPLICATE SUSPECTED ==========
  {
    id: "T-4829",
    subject: "API events not showing up",
    customerId: "C-016",
    accountId: "A-1011",
    channel: "email",
    priority: "high",
    status: "new",
    createdMinsAgo: 25,
    lastCustomerMessageMinsAgo: 25,
    tags: ["api", "duplicate?"],
    unread: true,
    sentiment: "neutral",
    sentimentHistory: ["neutral"],
    duplicateOf: "T-4828",
    category: "API · Data not appearing",
    productArea: "Events ingestion",
    urgencyScore: 65,
    aiSignals: [
      {
        id: "s-4829-1",
        kind: "duplicate_suspected",
        body: "Likely duplicate of T-4828 (same account, same product area, opened 45 min apart)",
        weight: "high",
        targetTicketId: "T-4828",
      },
      {
        id: "s-4829-2",
        kind: "incident_match",
        body: "Also matches INC-241",
        weight: "medium",
        targetIncidentId: "INC-241",
      },
    ],
    aiSummary:
      "Almost certainly the same underlying issue as T-4828. Same customer, same product area, opened 45 min after. Recommend merge.",
  },

  // ========== T-4830 · UNASSIGNED · GROWTH ACCOUNT ==========
  {
    id: "T-4830",
    subject: "Mobile app crashes when uploading photos > 8MB",
    customerId: "C-007",
    accountId: "A-1004",
    channel: "chat",
    priority: "normal",
    status: "new",
    createdMinsAgo: 12,
    lastCustomerMessageMinsAgo: 12,
    tags: ["mobile", "uploads"],
    unread: true,
    sentiment: "neutral",
    sentimentHistory: ["neutral"],
    category: "Mobile · Crashes",
    productArea: "Mobile · uploads",
    urgencyScore: 48,
    aiSignals: [
      {
        id: "s-4830-1",
        kind: "macro_suggested",
        body: "Matches known issue KI-1042 (mobile attachments >10MB). Macro M-008 covers it.",
        weight: "high",
        targetMacroId: "M-008",
      },
    ],
    aiSummary:
      "Sasha (Lumen VP Marketing) on chat. Likely matches KI-1042 (mobile attachment size). Quick known-issue response should resolve.",
    aiSuggestedMacroId: "M-008",
  },

  // ========== T-4831 · WAITING ON CUSTOMER ==========
  {
    id: "T-4831",
    subject: "Can't reset password — getting 'invalid token' error",
    customerId: "C-015",
    accountId: "A-1010",
    channel: "email",
    priority: "low",
    status: "waiting_on_customer",
    ownerId: "ag_dante",
    createdMinsAgo: 320,
    lastCustomerMessageMinsAgo: 250,
    lastAgentReplyMinsAgo: 180,
    firstResponseMinsAgo: 290,
    tags: ["auth", "password-reset"],
    sentiment: "neutral",
    sentimentHistory: ["neutral"],
    category: "Auth · Password reset",
    productArea: "Auth",
    urgencyScore: 18,
    aiSignals: [
      {
        id: "s-4831-1",
        kind: "missing_context",
        body: "Asked customer for browser/OS — no reply yet (3h)",
        weight: "low",
      },
    ],
    aiSummary:
      "Standard password reset issue — likely token expired in transit. Asked Carter for browser/OS to confirm. Awaiting reply.",
  },

  // ========== T-4832 · SCOPE PROMISE FROM SALES ==========
  {
    id: "T-4832",
    subject: "Where is the Salesforce sync we were promised at signing?",
    customerId: "C-001",
    accountId: "A-1001",
    channel: "email",
    priority: "high",
    status: "open",
    ownerId: "es_avery",
    createdMinsAgo: 1440 * 2,
    lastCustomerMessageMinsAgo: 240,
    lastAgentReplyMinsAgo: 60,
    firstResponseMinsAgo: 1380,
    tags: ["scope-promise", "sales-handoff", "enterprise"],
    sentiment: "frustrated",
    sentimentHistory: ["neutral", "frustrated", "frustrated"],
    category: "Account · Scope expectation",
    productArea: "Integrations · Salesforce",
    urgencyScore: 82,
    aiSignals: [
      {
        id: "s-4832-1",
        kind: "scope_promise",
        body: "Sales (Morgan Avery) promised 30-day Salesforce sync delivery. Implementation says 60-day exception. This ticket is the customer asking why it's not done.",
        weight: "high",
      },
      {
        id: "s-4832-2",
        kind: "vip_account",
        body: "Helix is a strategic Enterprise — handle with exec sponsor visibility",
        weight: "high",
      },
    ],
    aiSummary:
      "Avery is asking about the Salesforce integration sales committed to. There's an unresolved scope mismatch from the onboarding handoff. Recommend looping CSM and being transparent: 'we have a 60-day delivery exception approved; you'll see it by [date].'",
  },

  // ========== T-4833 · POSITIVE · QUICK WIN ==========
  {
    id: "T-4833",
    subject: "Just want to say — your team is great",
    customerId: "C-011",
    accountId: "A-1007",
    channel: "email",
    priority: "low",
    status: "open",
    createdMinsAgo: 60,
    lastCustomerMessageMinsAgo: 60,
    tags: ["compliment"],
    unread: true,
    sentiment: "positive",
    sentimentHistory: ["positive"],
    category: "General · Feedback",
    productArea: "—",
    urgencyScore: 12,
    aiSignals: [
      {
        id: "s-4833-1",
        kind: "macro_suggested",
        body: "Quick acknowledgement, then close",
        weight: "low",
      },
    ],
    aiSummary:
      "Eitan (Riverstone) sending unsolicited praise — likely flag for CSAT survey + relay to team Slack channel.",
  },

  // ========== T-4834 · LANGUAGE / REGION ==========
  {
    id: "T-4834",
    subject: "Problème de connexion - SAML / SSO",
    customerId: "C-013",
    accountId: "A-1009",
    channel: "email",
    priority: "high",
    status: "new",
    createdMinsAgo: 35,
    lastCustomerMessageMinsAgo: 35,
    tags: ["sso", "vip", "fr"],
    unread: true,
    sentiment: "frustrated",
    sentimentHistory: ["frustrated"],
    category: "Auth · SSO",
    productArea: "Auth · SAML",
    urgencyScore: 84,
    aiSignals: [
      {
        id: "s-4834-1",
        kind: "language_other",
        body: "Customer wrote in French. AI translation available.",
        weight: "medium",
      },
      {
        id: "s-4834-2",
        kind: "vip_account",
        body: "$16.3k/mo Enterprise · largest account in portfolio · always treat as VIP",
        weight: "high",
      },
    ],
    aiSummary:
      "Cameron (Vega) reporting SSO failures, message in French. Likely the same clock-skew pattern as INC-238 affecting other accounts — verify and apply M-005 (SSO clock-skew workaround).",
    aiSuggestedMacroId: "M-005",
  },

  // ========== T-4835 · SNOOZED ==========
  {
    id: "T-4835",
    subject: "Feature request: bulk export to S3",
    customerId: "C-009",
    accountId: "A-1005",
    channel: "email",
    priority: "low",
    status: "snoozed",
    ownerId: "ag_morgan",
    createdMinsAgo: 1440 * 5,
    lastCustomerMessageMinsAgo: 1440 * 4,
    lastAgentReplyMinsAgo: 1440 * 4,
    firstResponseMinsAgo: 1440 * 5 - 60,
    snoozeMinsFromNow: 1440 * 7,
    tags: ["feature-request", "snoozed"],
    sentiment: "neutral",
    sentimentHistory: ["neutral", "neutral"],
    category: "Product · Feature request",
    productArea: "Exports",
    urgencyScore: 22,
    aiSignals: [
      {
        id: "s-4835-1",
        kind: "missing_context",
        body: "Snoozed pending product team review (in next product council)",
        weight: "low",
      },
    ],
    aiSummary:
      "Owen wants bulk S3 export. Submitted to product team. Snoozed 1 week until next product council.",
  },

  // ========== T-4836 · RESOLVED (recent) ==========
  {
    id: "T-4836",
    subject: "How do I add a new admin user?",
    customerId: "C-010",
    accountId: "A-1006",
    channel: "chat",
    priority: "low",
    status: "resolved",
    ownerId: "ag_yuki",
    createdMinsAgo: 75,
    lastCustomerMessageMinsAgo: 60,
    lastAgentReplyMinsAgo: 55,
    firstResponseMinsAgo: 70,
    tags: ["how-to", "admin", "resolved"],
    sentiment: "positive",
    sentimentHistory: ["neutral", "positive"],
    category: "How-to · Admin",
    productArea: "Settings",
    urgencyScore: 10,
    aiSignals: [],
    aiSummary: "Standard how-to. Resolved in <15 min via chat.",
  },

  // ========== T-4837 · SLA AT RISK ==========
  {
    id: "T-4837",
    subject: "Webhook deliveries failing for 12 hours — losing data",
    customerId: "C-016",
    accountId: "A-1011",
    channel: "email",
    priority: "high",
    status: "open",
    ownerId: "ag_priya",
    createdMinsAgo: 200,
    lastCustomerMessageMinsAgo: 90,
    lastAgentReplyMinsAgo: 130,
    firstResponseMinsAgo: 190,
    tags: ["webhooks", "data-loss", "P2"],
    unread: true,
    sentiment: "frustrated",
    sentimentHistory: ["neutral", "frustrated"],
    category: "Webhooks · Delivery failure",
    productArea: "Webhooks",
    urgencyScore: 88,
    aiSignals: [
      {
        id: "s-4837-1",
        kind: "missing_context",
        body: "Need a sample event ID + receiver endpoint to investigate",
        weight: "high",
      },
      {
        id: "s-4837-2",
        kind: "macro_suggested",
        body: "Send macro M-004 (asking for repro)",
        weight: "medium",
        targetMacroId: "M-004",
      },
    ],
    aiSummary:
      "Cobalt Cloud webhook deliveries failing. Need sample event ID + receiver endpoint to scope. Cobalt is technical and patient but data-loss framing is escalating tone.",
    missingContext: ["Sample event ID", "Receiver endpoint URL"],
    aiSuggestedMacroId: "M-004",
  },

  // ========== T-4838 · VIP CHAT ==========
  {
    id: "T-4838",
    subject: "Need a usage report for board meeting tomorrow",
    customerId: "C-008",
    accountId: "A-1004",
    channel: "chat",
    priority: "high",
    status: "open",
    ownerId: "ag_morgan",
    createdMinsAgo: 18,
    lastCustomerMessageMinsAgo: 4,
    lastAgentReplyMinsAgo: 12,
    firstResponseMinsAgo: 16,
    tags: ["report", "vip", "exec-attention"],
    sentiment: "neutral",
    sentimentHistory: ["neutral"],
    category: "Reporting · Custom",
    productArea: "Reports",
    urgencyScore: 75,
    aiSignals: [
      {
        id: "s-4838-1",
        kind: "vip_account",
        body: "Iris is the CMO at Lumen — high-touch account",
        weight: "high",
      },
    ],
    aiSummary:
      "Iris (Lumen CMO) needs a usage report for tomorrow's board. Standard report doesn't include the metric she wants — will need a CS-built export. Quick turn appreciated.",
  },

  // ========== T-4839 · SOCIAL ==========
  {
    id: "T-4839",
    subject: "Twitter/X · @northwind site is down",
    customerId: "C-017",
    accountId: "A-1012",
    channel: "social",
    priority: "normal",
    status: "open",
    ownerId: "ag_yuki",
    createdMinsAgo: 50,
    lastCustomerMessageMinsAgo: 30,
    lastAgentReplyMinsAgo: 45,
    firstResponseMinsAgo: 48,
    tags: ["social", "outage-claim"],
    sentiment: "frustrated",
    sentimentHistory: ["frustrated"],
    category: "Public · Outage claim",
    productArea: "Public-facing",
    urgencyScore: 38,
    aiSignals: [
      {
        id: "s-4839-1",
        kind: "missing_context",
        body: "User on Free trial — claims site is down. Status page is green. Likely user-side. Verify before assuming outage.",
        weight: "medium",
      },
    ],
    aiSummary:
      "Public mention on X — Faisal (Free trial, low engagement) claims outage. Status page shows no incident affecting his region. Likely user-side. DM'd asking for screenshot.",
  },

  // ========== T-4840 · MERGED / RESOLVED ==========
  {
    id: "T-4840",
    subject: "Question about webhook signature verification",
    customerId: "C-016",
    accountId: "A-1011",
    channel: "email",
    priority: "low",
    status: "resolved",
    ownerId: "ag_priya",
    createdMinsAgo: 1440 * 2,
    lastCustomerMessageMinsAgo: 1440 * 2 - 30,
    lastAgentReplyMinsAgo: 1440 * 2 - 60,
    firstResponseMinsAgo: 1440 * 2 - 5,
    tags: ["docs", "webhooks", "resolved"],
    sentiment: "positive",
    sentimentHistory: ["neutral", "positive"],
    category: "Docs · Webhooks",
    productArea: "Webhooks",
    urgencyScore: 8,
    aiSignals: [],
    aiSummary: "Pointed Elena to webhook signature docs. Resolved cleanly.",
  },

  // ========== T-4841 · ESCALATED · BLOCKED ==========
  {
    id: "T-4841",
    subject: "Custom integration we built broke after your last release",
    customerId: "C-014",
    accountId: "A-1009",
    channel: "email",
    priority: "urgent",
    status: "escalated",
    ownerId: "es_kenji",
    createdMinsAgo: 380,
    lastCustomerMessageMinsAgo: 60,
    lastAgentReplyMinsAgo: 30,
    firstResponseMinsAgo: 360,
    escalatedMinsAgo: 120,
    escalatedTo: "es_kenji",
    escalationReason:
      "API behavior change broke a customer-built integration. Need engineering input on whether this was an intended breaking change.",
    tags: ["P1", "api", "regression?", "vip"],
    sentiment: "frustrated",
    sentimentHistory: ["frustrated", "frustrated"],
    category: "API · Behavior change",
    productArea: "API · v2",
    urgencyScore: 91,
    blockedReason: "Awaiting engineering response on possible regression",
    aiSignals: [
      {
        id: "s-4841-1",
        kind: "vip_account",
        body: "Vega is the largest portfolio account ($16.3k/mo)",
        weight: "high",
      },
      {
        id: "s-4841-2",
        kind: "missing_context",
        body: "Need: customer's integration code sample + actual vs expected behavior with timestamps",
        weight: "high",
      },
    ],
    aiSummary:
      "Nadia at Vega says their custom integration broke after our v2.13 release. Could be intended deprecation, could be regression. Need engineering owner.",
    missingContext: ["Integration code sample", "Affected endpoint + timestamps"],
  },

  // ========== T-4842 · WAITING ON CUSTOMER · COULD CHURN ==========
  {
    id: "T-4842",
    subject: "Cancel my account",
    customerId: "C-017",
    accountId: "A-1012",
    channel: "email",
    priority: "high",
    status: "waiting_on_customer",
    ownerId: "es_avery",
    createdMinsAgo: 1440,
    lastCustomerMessageMinsAgo: 1440,
    lastAgentReplyMinsAgo: 720,
    firstResponseMinsAgo: 1380,
    tags: ["churn", "cancellation-request"],
    sentiment: "frustrated",
    sentimentHistory: ["frustrated"],
    category: "Account · Cancellation",
    productArea: "Account lifecycle",
    urgencyScore: 70,
    aiSignals: [
      {
        id: "s-4842-1",
        kind: "churn_risk",
        body: "Active cancellation request from Free-trial user. Low MRR but worth a save attempt.",
        weight: "medium",
      },
    ],
    aiSummary:
      "Faisal asked to cancel. Sent a soft save-attempt email asking what would change his mind. No reply 12h.",
  },

  // ========== T-4843 · NEW · UNASSIGNED ==========
  {
    id: "T-4843",
    subject: "Can't access my account",
    customerId: "C-015",
    accountId: "A-1010",
    channel: "email",
    priority: "normal",
    status: "new",
    createdMinsAgo: 5,
    lastCustomerMessageMinsAgo: 5,
    tags: ["auth"],
    unread: true,
    sentiment: "neutral",
    sentimentHistory: ["neutral"],
    category: "Auth · Login",
    productArea: "Auth",
    urgencyScore: 30,
    aiSignals: [
      {
        id: "s-4843-1",
        kind: "macro_suggested",
        body: "Standard first-touch with M-001 + ask for browser/OS",
        weight: "low",
        targetMacroId: "M-001",
      },
    ],
    aiSummary:
      "Carter (Granite Peak) can't log in. Generic — likely password or browser. Quick first-touch.",
    aiSuggestedMacroId: "M-001",
  },

  // ========== T-4844 · POSITIVE · CUSTOMER FOLLOW-UP ==========
  {
    id: "T-4844",
    subject: "Re: SOC 2 packet — got it, thanks",
    customerId: "C-004",
    accountId: "A-1002",
    channel: "email",
    priority: "low",
    status: "open",
    ownerId: "ag_priya",
    createdMinsAgo: 90,
    lastCustomerMessageMinsAgo: 60,
    lastAgentReplyMinsAgo: 110,
    firstResponseMinsAgo: 80,
    tags: ["security", "soc2"],
    sentiment: "positive",
    sentimentHistory: ["neutral", "positive"],
    category: "Security · Compliance docs",
    productArea: "Security",
    urgencyScore: 22,
    aiSignals: [],
    aiSummary:
      "Daniel (Brightlane CISO) confirmed receipt of the SOC 2 packet. Will review and follow up. Low priority.",
  },
];

// Build the full Ticket records with computed SLA timestamps
export const tickets: Ticket[] = seeds.map((s): Ticket => {
  const account = accountsById[s.accountId];
  const sla = slaByTier[account.tier];
  const createdAt = minsAgo(s.createdMinsAgo);
  const responseDue = new Date(
    new Date(createdAt).getTime() + sla.responseMin * 60_000,
  ).toISOString();
  const resolutionDue = new Date(
    new Date(createdAt).getTime() + sla.resolutionMin * 60_000,
  ).toISOString();
  return {
    ...s,
    createdAt,
    lastCustomerMessageAt: minsAgo(s.lastCustomerMessageMinsAgo),
    lastAgentReplyAt:
      s.lastAgentReplyMinsAgo !== undefined
        ? minsAgo(s.lastAgentReplyMinsAgo)
        : undefined,
    firstResponseAt:
      s.firstResponseMinsAgo !== undefined
        ? minsAgo(s.firstResponseMinsAgo)
        : undefined,
    escalatedAt:
      s.escalatedMinsAgo !== undefined ? minsAgo(s.escalatedMinsAgo) : undefined,
    snoozeUntil:
      s.snoozeMinsFromNow !== undefined
        ? new Date(NOW.getTime() + s.snoozeMinsFromNow * 60_000).toISOString()
        : undefined,
    slaResponseDueAt: responseDue,
    slaResolutionDueAt: resolutionDue,
  };
});

export const ticketsById = Object.fromEntries(tickets.map((t) => [t.id, t]));

// ============== Per-ticket conversation messages ==============

const m = (
  id: string,
  ticketId: string,
  kind: Message["kind"],
  body: string,
  minsAgoVal: number,
  opts: Partial<Omit<Message, "id" | "ticketId" | "kind" | "body" | "at">> = {},
): Message => ({
  id,
  ticketId,
  kind,
  body,
  at: minsAgo(minsAgoVal),
  ...opts,
});

const _msgs: Message[] = [
  // T-4823 — angry escalation chain
  m(
    "msg-4823-1",
    "T-4823",
    "customer_message",
    "Hey — production data still isn't loading on the events dashboard. This is the third time this month. We have a board prep meeting at 4pm today and I need to be able to pull these numbers. Please advise ASAP.",
    95,
    {
      authorName: "Avery Bloomfield",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4823-2",
    "T-4823",
    "agent_reply",
    "Hi Avery — sorry about this. I'm pulling logs now. Will have an update within the hour.",
    84,
    {
      authorId: "ag_morgan",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4823-3",
    "T-4823",
    "internal_note",
    "Pulled logs · clearly correlated with INC-241. p95 is 2.4s on /v1/events. Their dashboard is timing out client-side. Going to ack with the incident link.",
    82,
    { authorId: "ag_morgan" },
  ),
  m(
    "msg-4823-4",
    "T-4823",
    "system_event",
    "Linked to incident INC-241",
    81,
  ),
  m(
    "msg-4823-5",
    "T-4823",
    "agent_reply",
    "Avery — confirmed. We're in the middle of an incident affecting the events API (INC-241). Engineering is on it. ETA to mitigation is ~30 min. I'll personally email you the moment it's resolved so you can pull your numbers before 4pm.",
    72,
    {
      authorId: "ag_morgan",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4823-6",
    "T-4823",
    "customer_message",
    "30 minutes is going to be tight. THIRD time this month. We're getting the rough end of this. I want to know what your team is doing structurally to prevent this — not just the next mitigation.",
    42,
    {
      authorName: "Avery Bloomfield",
      channel: "email",
      sentimentAtTime: "angry",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4823-7",
    "T-4823",
    "agent_reply",
    "Understood Avery — that's a fair ask. Let me get our engineering lead on a 15-min call with you tomorrow to walk through what we're changing. I'll send a calendar invite within the hour.",
    30,
    {
      authorId: "ag_morgan",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4823-8",
    "T-4823",
    "customer_message",
    "Thank you. Calendar invite would be appreciated. Still need a path to those numbers by 4pm — please don't drop that thread.",
    18,
    {
      authorName: "Avery Bloomfield",
      channel: "email",
      sentimentAtTime: "angry",
      visibleToCustomer: true,
    },
  ),

  // T-4825 — billing dispute
  m(
    "msg-4825-1",
    "T-4825",
    "customer_message",
    "Hi — we just got a past-due notice on invoice #INV-8821, but our finance team confirms the wire went out April 14. Can you verify on your end? This is the second time we've had to clear this up.",
    240,
    {
      authorName: "Renée Okafor",
      channel: "email",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4825-2",
    "T-4825",
    "agent_reply",
    "Hi Renée — thanks for flagging. I'm pulling this up with our finance team to verify against our wire log. Could you also forward the wire confirmation receipt + the PO reference you used? That'll let me match it precisely.",
    230,
    {
      authorId: "ag_priya",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4825-3",
    "T-4825",
    "internal_note",
    "Heads up — Brightlane has the ongoing PO split issue (CX dept + IT dept). Likely the wire came in but didn't match either PO cleanly so finance held it. Asked customer for wire conf + PO ref.",
    225,
    { authorId: "ag_priya" },
  ),
  m(
    "msg-4825-4",
    "T-4825",
    "customer_message",
    "I'll have to pull this from our AP team — give me until tomorrow morning. We split this across the CX department PO (PO-7188) and the IT department PO (PO-7211), so I'm guessing that's the snag.",
    96,
    {
      authorName: "Renée Okafor",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4825-5",
    "T-4825",
    "agent_reply",
    "Got it Renée — that confirms what I suspected. Asking finance to manually reconcile against PO-7188 and PO-7211. I'll come back to you once I hear from them.",
    30,
    {
      authorId: "ag_priya",
      channel: "email",
      visibleToCustomer: true,
    },
  ),

  // T-4827 — angry pattern complaint
  m(
    "msg-4827-1",
    "T-4827",
    "customer_message",
    "I need to be candid. We're approaching the 1-year mark and the support experience has been deteriorating. Three of our team have raised tickets this month that took 2+ days to resolve. Our previous vendor was more responsive at half the price. I'd like to schedule a conversation with someone senior — not to threaten cancellation, but to honestly evaluate whether we should be looking elsewhere when our renewal comes up. Can you set that up this week?",
    360,
    {
      authorName: "Theo Hartmann",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4827-2",
    "T-4827",
    "agent_reply",
    "Hi Theo — I hear you and I'm sorry the experience has been short of what you expected. Pulling our Support Manager (Sloane) and your CSM (Inés) into this. We'll get back to you within 4 hours with a proposed time.",
    340,
    {
      authorId: "ag_dante",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4827-3",
    "T-4827",
    "internal_note",
    "Pattern is real — Aldridge has had 5 tickets in 30d, average resolution time 2.1d. Their own previous tickets confirm Theo's claim. Need to escalate AND own this.",
    330,
    { authorId: "ag_dante" },
  ),
  m(
    "msg-4827-4",
    "T-4827",
    "system_event",
    "Escalated to Avery Sinclair (Escalation Specialist)",
    90,
  ),
  m(
    "msg-4827-5",
    "T-4827",
    "internal_note",
    "@ines @sloane — we need a save plan in 24h. I'm proposing: 1) exec touchpoint from Sloane, 2) pre-built review of all 5 tickets w/ root cause, 3) commitment to a quarterly review going forward. Will draft.",
    80,
    { authorId: "es_avery" },
  ),
  m(
    "msg-4827-6",
    "T-4827",
    "customer_message",
    "Following up. Are we doing this or not?",
    220,
    {
      authorName: "Theo Hartmann",
      channel: "email",
      sentimentAtTime: "angry",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4827-7",
    "T-4827",
    "agent_reply",
    "Theo — Avery from our escalation team here. We're absolutely doing this. Sloane (Support Manager) and Inés (your CSM) are both freed up tomorrow morning ET. Sending a calendar invite for 10am ET — let me know if a different time is easier.",
    120,
    {
      authorId: "es_avery",
      channel: "email",
      visibleToCustomer: true,
    },
  ),

  // T-4828 — engineering handoff
  m(
    "msg-4828-1",
    "T-4828",
    "customer_message",
    "We're seeing intermittent 502s on POST /v1/events for the last 90 min. Maybe 1 in 10 requests. Tested from two regions, same result.",
    70,
    {
      authorName: "Elena Petrova",
      channel: "api",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4828-2",
    "T-4828",
    "agent_reply",
    "Hi Elena — confirmed, this is part of an active incident (INC-241) on our side. Engineering is on it. I'll keep this ticket open and ping you when it's mitigated.",
    55,
    {
      authorId: "es_kenji",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4828-3",
    "T-4828",
    "system_event",
    "Linked to incident INC-241",
    54,
  ),
  m(
    "msg-4828-4",
    "T-4828",
    "internal_note",
    "Letting Elena be — she's technical and patient, she just wanted confirmation. Will reply on resolution.",
    50,
    { authorId: "es_kenji" },
  ),
  m(
    "msg-4828-5",
    "T-4828",
    "customer_message",
    "Cool, thanks. Will keep an eye on the status page.",
    40,
    {
      authorName: "Elena Petrova",
      channel: "email",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4828-6",
    "T-4828",
    "agent_reply",
    "👍",
    20,
    {
      authorId: "es_kenji",
      channel: "email",
      visibleToCustomer: true,
    },
  ),

  // T-4829 — duplicate
  m(
    "msg-4829-1",
    "T-4829",
    "customer_message",
    "API events not showing up in our dashboard for the last hour or so. Sent a separate ticket about 502s — possibly related?",
    25,
    {
      authorName: "Elena Petrova",
      channel: "email",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),

  // T-4830 — quick mobile issue
  m(
    "msg-4830-1",
    "T-4830",
    "customer_message",
    "hey, mobile app keeps crashing when I try to attach a product photo (10MB-ish). web works fine. iOS 17.5 if that matters",
    12,
    {
      authorName: "Sasha Berger",
      channel: "chat",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),

  // T-4831 — waiting on customer
  m(
    "msg-4831-1",
    "T-4831",
    "customer_message",
    "Can't reset my password. Click the link in the email and get 'invalid token' every time.",
    320,
    {
      authorName: "Carter Yates",
      channel: "email",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4831-2",
    "T-4831",
    "agent_reply",
    "Hi Carter — usually that means the token expired in transit (most often a corporate email scanner clicking the link first). Could you tell me your browser + OS, and I'll send a fresh link directly?",
    290,
    {
      authorId: "ag_dante",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4831-3",
    "T-4831",
    "internal_note",
    "Likely Mimecast/Proofpoint scanning consuming the token. Standard fix.",
    285,
    { authorId: "ag_dante" },
  ),
  m(
    "msg-4831-4",
    "T-4831",
    "agent_reply",
    "Following up — still need browser/OS to send a fresh link 👋",
    180,
    {
      authorId: "ag_dante",
      channel: "email",
      visibleToCustomer: true,
    },
  ),

  // T-4832 — scope promise
  m(
    "msg-4832-1",
    "T-4832",
    "customer_message",
    "Hi — at signing your sales team committed to a Salesforce sync within 30 days of go-live. We're at day 38 and I haven't heard a status update. Where are we?",
    240,
    {
      authorName: "Avery Bloomfield",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4832-2",
    "T-4832",
    "internal_note",
    "Reviewed the handoff doc — sales DID promise 30d. Implementation flagged a 60d exception during onboarding (PM-approved). Customer was told via Inés at the time but it's been a while. Need to be transparent.",
    230,
    { authorId: "es_avery" },
  ),
  m(
    "msg-4832-3",
    "T-4832",
    "agent_reply",
    "Hi Avery — full transparency: the 30-day target slipped to 60 days during onboarding (your CSM Inés flagged this in week 2). The actual delivery target is now May 18. I'll get Inés to send you a written confirmation + status today, and I'll personally make sure it lands by May 18. Apologies for the lack of follow-through on comms.",
    60,
    {
      authorId: "es_avery",
      channel: "email",
      visibleToCustomer: true,
    },
  ),

  // T-4833 — positive
  m(
    "msg-4833-1",
    "T-4833",
    "customer_message",
    "I just want to say — every interaction we've had with your support team has been excellent. Yuki helped us last week with the admin user setup and was great. Just wanted to flag for whoever rates these things. Thanks!",
    60,
    {
      authorName: "Eitan Halevi",
      channel: "email",
      sentimentAtTime: "positive",
      visibleToCustomer: true,
    },
  ),

  // T-4834 — French / SSO
  m(
    "msg-4834-1",
    "T-4834",
    "customer_message",
    "Bonjour — depuis ce matin, plusieurs membres de notre équipe ne peuvent pas se connecter via SAML/SSO. Erreur \"signature mismatch\". Pouvez-vous regarder?",
    35,
    {
      authorName: "Cameron Liu",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),

  // T-4837 — webhook failure
  m(
    "msg-4837-1",
    "T-4837",
    "customer_message",
    "Our webhook receiver shows nothing from your side for the last ~12 hours. We're losing event data. Can you investigate?",
    200,
    {
      authorName: "Elena Petrova",
      channel: "email",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4837-2",
    "T-4837",
    "agent_reply",
    "Hi Elena — looking now. To scope quickly, can you share a sample event ID we should have delivered + the receiver endpoint URL? I'll trace the delivery log for those specifically.",
    190,
    {
      authorId: "ag_priya",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4837-3",
    "T-4837",
    "customer_message",
    "Endpoint is webhooks.cobaltcloud.io/inbound. Sample IDs from this morning: evt_8a2k, evt_8a2x, evt_8b11. None of those arrived.",
    130,
    {
      authorName: "Elena Petrova",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4837-4",
    "T-4837",
    "internal_note",
    "Got the IDs. Pulling delivery logs. If these aren't in the queue at all that's a delivery-layer bug, not their endpoint.",
    125,
    { authorId: "ag_priya" },
  ),
  m(
    "msg-4837-5",
    "T-4837",
    "customer_message",
    "Following up — any progress? We're losing data in real time.",
    90,
    {
      authorName: "Elena Petrova",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),

  // T-4838 — VIP report
  m(
    "msg-4838-1",
    "T-4838",
    "customer_message",
    "hey — need to pull a usage report for tomorrow's board meeting. specifically need MAU broken down by feature module for the last 90 days. is that a standard export?",
    18,
    {
      authorName: "Iris Mendez",
      channel: "chat",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4838-2",
    "T-4838",
    "agent_reply",
    "Hi Iris — feature-level MAU isn't in the standard exports unfortunately. I can run it for you manually and send by EOD today though. Confirm: 90d window, broken down by which feature modules specifically?",
    16,
    {
      authorId: "ag_morgan",
      channel: "chat",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4838-3",
    "T-4838",
    "customer_message",
    "Engagement, Reporting, Integrations. EOD works. Thank you 🙏",
    4,
    {
      authorName: "Iris Mendez",
      channel: "chat",
      sentimentAtTime: "positive",
      visibleToCustomer: true,
    },
  ),

  // T-4841 — VIP escalation
  m(
    "msg-4841-1",
    "T-4841",
    "customer_message",
    "Our custom integration broke after your last release. Specifically, calls to /v2/contacts now require a parameter that wasn't required before, and there was no migration notice. We're getting 400s on every request.",
    380,
    {
      authorName: "Nadia Costa",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4841-2",
    "T-4841",
    "agent_reply",
    "Hi Nadia — apologies, getting eyes on this immediately. Can you share a sample failing request (curl or raw HTTP) + the endpoint and a recent timestamp? I'll have engineering trace it.",
    360,
    {
      authorId: "ag_morgan",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4841-3",
    "T-4841",
    "system_event",
    "Escalated to Kenji Park (Senior Escalation Specialist)",
    120,
  ),
  m(
    "msg-4841-4",
    "T-4841",
    "internal_note",
    "Vega is the largest portfolio account. Filed engineering ticket BUG-8830, asking for owner. If this was an intended deprecation we owe Vega a written apology + a workaround. If it's a regression we need to revert.",
    115,
    { authorId: "es_kenji" },
  ),
  m(
    "msg-4841-5",
    "T-4841",
    "agent_reply",
    "Nadia — escalation specialist here. Confirmed engineering is investigating. We'll have a definitive answer (regression vs intended change + path forward) within 4 hours.",
    60,
    {
      authorId: "es_kenji",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4841-6",
    "T-4841",
    "customer_message",
    "Thanks. Sample below:\n\nPOST /v2/contacts\nAuthorization: Bearer ***\n{\n  \"email\": \"x@y.com\",\n  \"name\": \"Test\"\n}\n\nResponse: 400 — \"missing required field: source\"\n\nWe weren't sending source before and it worked.",
    30,
    {
      authorName: "Nadia Costa",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),

  // T-4842 — cancel my account
  m(
    "msg-4842-1",
    "T-4842",
    "customer_message",
    "Please cancel my account and stop billing.",
    1440,
    {
      authorName: "Faisal Rahman",
      channel: "email",
      sentimentAtTime: "frustrated",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4842-2",
    "T-4842",
    "agent_reply",
    "Hi Faisal — sorry to hear that. You're on a free trial so there's nothing being billed yet. Before I close out the account, would you mind sharing what wasn't working for you? It's enormously helpful for us, and there might be a way we can solve the underlying issue.",
    720,
    {
      authorId: "es_avery",
      channel: "email",
      visibleToCustomer: true,
    },
  ),

  // T-4844 — short positive
  m(
    "msg-4844-1",
    "T-4844",
    "agent_reply",
    "Hi Daniel — sending over the SOC 2 packet via secure share. Let me know if you need anything else for the security review.",
    110,
    {
      authorId: "ag_priya",
      channel: "email",
      visibleToCustomer: true,
    },
  ),
  m(
    "msg-4844-2",
    "T-4844",
    "customer_message",
    "Got it, thanks Priya. Will review and circle back.",
    60,
    {
      authorName: "Daniel Ortiz",
      channel: "email",
      sentimentAtTime: "positive",
      visibleToCustomer: true,
    },
  ),

  // T-4843 — new
  m(
    "msg-4843-1",
    "T-4843",
    "customer_message",
    "Can't access my account. Says 'something went wrong.'",
    5,
    {
      authorName: "Carter Yates",
      channel: "email",
      sentimentAtTime: "neutral",
      visibleToCustomer: true,
    },
  ),
];

export const messages = _msgs;

export const messagesByTicket = (ticketId: string) =>
  messages
    .filter((x) => x.ticketId === ticketId)
    .sort((a, b) => (a.at < b.at ? -1 : 1));

// Helpers
export const fmtMoney = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return `$${n.toLocaleString()}`;
};
