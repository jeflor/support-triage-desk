// Domain types for the Support Triage Desk

export type Role = "agent" | "escalation" | "manager";

export type Channel = "email" | "chat" | "voice" | "api" | "social";

export type Priority = "urgent" | "high" | "normal" | "low";

export type TicketStatus =
  | "new"
  | "open"
  | "waiting_on_customer"
  | "waiting_on_internal"
  | "escalated"
  | "snoozed"
  | "resolved"
  | "closed";

export type Sentiment = "positive" | "neutral" | "frustrated" | "angry";

export type AccountTier = "Free" | "Starter" | "Growth" | "Enterprise";

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: Role;
  title: string;
  avatarColor: string;
  online?: boolean;
};

// SLA tier configuration: response and resolution targets in minutes
export type SLA = {
  tier: AccountTier;
  responseMin: number;
  resolutionMin: number;
};

export type Account = {
  id: string;
  name: string; // company
  tier: AccountTier;
  mrr: number;
  tenureMonths: number;
  ownerId?: string; // CSM
  healthScore: number; // 0-100
  industry: string;
  // Realism flags
  churnRisk?: boolean;
  expansionLikely?: boolean;
  recentInvoiceFailure?: boolean;
  notes?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  title?: string;
  accountId: string;
  // contact metadata
  timezone?: string;
  preferredChannel?: Channel;
  vip?: boolean;
};

export type MessageKind =
  | "customer_message"
  | "agent_reply"
  | "internal_note"
  | "system_event"
  | "ai_suggestion";

export type Message = {
  id: string;
  ticketId: string;
  kind: MessageKind;
  authorId?: string; // agent or system
  authorName?: string; // for customer messages
  channel?: Channel; // override per-message
  body: string;
  at: string;
  attachments?: { name: string; size: string }[];
  // Realism
  sentimentAtTime?: Sentiment;
  visibleToCustomer?: boolean;
  edited?: boolean;
};

export type Incident = {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  productArea: string;
  startedAt: string;
  resolvedAt?: string;
  affectedAccountIds?: string[];
  ownerTeam?: string; // engineering team
  summary: string;
};

export type KnownIssue = {
  id: string;
  title: string;
  affectsArea: string;
  workaround?: string;
  trackedBugId?: string;
  status: "open" | "fix_in_progress" | "fix_shipped";
};

export type Macro = {
  id: string;
  name: string;
  category: string;
  body: string;
  shortcut?: string; // e.g. ";refund"
  uses: number; // popularity
};

export type AISignalKind =
  | "duplicate_suspected"
  | "churn_risk"
  | "scope_promise" // "they said sales promised X"
  | "billing_dispute"
  | "incident_match"
  | "vip_account"
  | "sentiment_shift"
  | "missing_context"
  | "macro_suggested"
  | "escalation_recommended"
  | "language_other";

export type AISignal = {
  id: string;
  kind: AISignalKind;
  body: string;
  weight: "low" | "medium" | "high";
  detail?: string;
  // optional: link target
  targetTicketId?: string;
  targetIncidentId?: string;
  targetMacroId?: string;
};

export type TicketTag = string;

export type Ticket = {
  id: string; // T-1234
  subject: string;
  customerId: string;
  accountId: string;
  channel: Channel;
  priority: Priority;
  status: TicketStatus;
  ownerId?: string; // assigned agent (or undefined = unassigned)
  createdAt: string;
  lastCustomerMessageAt: string;
  lastAgentReplyAt?: string;
  tags: TicketTag[];
  unread?: boolean;
  // SLA — derived but cached
  slaResponseDueAt: string;
  slaResolutionDueAt: string;
  // Sentiment trajectory — current + recent
  sentiment: Sentiment;
  sentimentHistory: Sentiment[]; // most-recent-last
  // Operational depth
  escalationReason?: string;
  escalatedAt?: string;
  escalatedTo?: string;
  snoozeUntil?: string;
  blockedReason?: string;
  // Linkage
  incidentId?: string;
  duplicateOf?: string;
  relatedTicketIds?: string[];
  // Issue intel
  category?: string; // "Billing", "Login", "Integration", etc.
  productArea?: string;
  urgencyScore: number; // 0-100
  // Realism — sometimes missing
  missingContext?: string[]; // e.g. ["account ID not provided", "screenshots requested but not sent"]
  // AI signals attached at triage time
  aiSignals: AISignal[];
  // Customer-facing summary AI prepared
  aiSummary?: string;
  aiSuggestedReply?: string;
  aiSuggestedMacroId?: string;
  // First response window indicator
  firstResponseAt?: string;
};

export type AuditEvent = {
  id: string;
  at: string;
  actor: string;
  action: string;
  ticketId?: string;
};
