import { useEffect, useState } from "react";
import {
  X,
  Sparkles,
  Mail,
  ShieldAlert,
  Tag as TagIcon,
  Wand2,
  Copy,
  Send,
  Check,
  AlertOctagon,
  GitMerge,
  ArrowRightCircle,
  Activity,
} from "lucide-react";
import { useAppState } from "../../state/AppState";
import { useStore } from "../../state/DataStore";
import { customersById, accountsById } from "../../data/accounts";
import { incidentsById } from "../../data/incidents";

type Action =
  | "summarize"
  | "draft_reply"
  | "detect_sentiment"
  | "classify"
  | "suggest_escalation"
  | "root_cause"
  | "flag_duplicate"
  | "recommend_macro";

const actionMeta: Record<
  Action,
  {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    chip: string;
  }
> = {
  summarize: { label: "Summarize this issue", icon: Activity, chip: "Summary" },
  draft_reply: { label: "Draft a reply", icon: Mail, chip: "Reply" },
  detect_sentiment: {
    label: "Detect sentiment",
    icon: AlertOctagon,
    chip: "Sentiment",
  },
  classify: { label: "Classify this issue", icon: TagIcon, chip: "Class" },
  suggest_escalation: {
    label: "Suggest escalation",
    icon: ShieldAlert,
    chip: "Escalate",
  },
  root_cause: { label: "Likely root cause", icon: Wand2, chip: "Root cause" },
  flag_duplicate: { label: "Flag duplicate", icon: GitMerge, chip: "Duplicate" },
  recommend_macro: {
    label: "Recommend a macro",
    icon: Wand2,
    chip: "Macro",
  },
};

type Msg = {
  id: string;
  role: "user" | "assistant";
  body: string;
  meta?: string;
};

function newId() {
  return Math.random().toString(36).slice(2, 9);
}

function generate(action: Action, ticketId: string | null, store: ReturnType<typeof useStore>): string {
  const t = ticketId ? store.ticketById(ticketId) : null;
  if (!t) {
    if (action === "summarize")
      return [
        "Across the open queue right now:",
        "",
        "• 5 tickets likely tied to active incident INC-241 (events API latency)",
        "• 1 angry escalation from a churn-risk Enterprise account (Aldridge — T-4827)",
        "• 1 SLA breach risk on T-4823 (Helix, $7k/mo enterprise)",
        "• 2 unassigned tickets — Lumen mobile crash (M-008 covers it) and Granite Peak login",
        "• 1 billing dispute waiting on customer (T-4825 PO mismatch)",
        "",
        "Suggested order: T-4827 → T-4823 → T-4830 (quick) → T-4825 chase.",
      ].join("\n");
    return "Pick a ticket and reopen me — my answers are sharper with context.";
  }
  const customer = customersById[t.customerId];
  const account = accountsById[t.accountId];
  const incident = t.incidentId ? incidentsById[t.incidentId] : undefined;
  const firstName = customer?.name.split(" ")[0] ?? "there";

  switch (action) {
    case "summarize":
      return [
        `${t.id} · ${t.subject}`,
        "",
        t.aiSummary ?? "No prior AI summary.",
        "",
        `Account: ${account?.name} · ${account?.tier} · $${account?.mrr}/mo`,
        `Status: ${t.status} · Sentiment: ${t.sentiment}`,
        incident ? `Linked incident: ${incident.id} (${incident.status})` : "",
      ]
        .filter(Boolean)
        .join("\n");
    case "draft_reply":
      return [
        `Hi ${firstName},`,
        "",
        incident
          ? `I want to be straight with you — what you're seeing is part of an active incident on our side (${incident.id}). Engineering is on it; ETA to mitigation is roughly 30 minutes from now. I'll personally email you the moment it's resolved.`
          : `Thanks for the message. I'm digging in now and will have a substantive update within the hour.`,
        "",
        t.sentiment === "angry"
          ? "I also want to acknowledge that this isn't the experience you should be getting, especially as a long-time account. I'm pulling our engineering lead in for a 15-min walk-through with you tomorrow on what we're changing structurally — separate calendar invite incoming."
          : "If anything else pops up before then — screenshots, exact timestamps, the workspace ID — please send my way.",
        "",
        "Best,",
        `Morgan`,
      ].join("\n");
    case "detect_sentiment":
      return [
        `Sentiment trajectory across last ${t.sentimentHistory.length} customer messages:`,
        "",
        t.sentimentHistory.map((s, i) => `  ${i + 1}. ${s}`).join("\n"),
        "",
        `Current: ${t.sentiment}.`,
        t.sentiment === "angry"
          ? "Recommend: ack the emotion explicitly, surface a structural fix (not just a tactical one), offer a human touchpoint."
          : t.sentiment === "frustrated"
            ? "Recommend: respond inside 30 min with a concrete next step, not just an ack."
            : "Standard cadence is fine. No special handling needed.",
      ].join("\n");
    case "classify":
      return [
        `Suggested classification:`,
        "",
        `  Category: ${t.category ?? "Unclassified"}`,
        `  Product area: ${t.productArea ?? "—"}`,
        `  Recommended priority: ${t.priority}`,
        `  Channel: ${t.channel}`,
        "",
        `Confidence: ${t.urgencyScore >= 70 ? "high" : "medium"}`,
      ].join("\n");
    case "suggest_escalation":
      return [
        t.status === "escalated"
          ? `${t.id} is already escalated to ${t.escalatedTo}.`
          : t.urgencyScore >= 80
            ? `Recommend escalating to Avery Sinclair (Escalation Specialist).`
            : `Doesn't yet need escalation — current urgency ${t.urgencyScore}/100.`,
        "",
        account?.churnRisk
          ? "⚠ Account is flagged churn-risk — also loop CSM into the next reply."
          : "",
        account?.tier === "Enterprise" && t.sentiment === "angry"
          ? "⚠ Enterprise + angry sentiment combo — escalation specialist + manager visibility recommended."
          : "",
      ]
        .filter(Boolean)
        .join("\n");
    case "root_cause":
      return [
        `Likely root cause for ${t.id}:`,
        "",
        incident
          ? `1. Linked to active ${incident.id} — ${incident.summary}`
          : `1. ${t.aiSummary?.split(".")[0] ?? "Initial assessment based on subject + sentiment."}.`,
        t.duplicateOf
          ? `2. Same underlying issue as ${t.duplicateOf} — recommend merge.`
          : "",
        `3. Most relevant macro to send: ${t.aiSuggestedMacroId ?? "(none yet)"}.`,
      ]
        .filter(Boolean)
        .join("\n");
    case "flag_duplicate":
      if (t.duplicateOf)
        return `${t.id} is suspected duplicate of ${t.duplicateOf} (same account · same product area · opened within 1h). Recommend merging.`;
      return `No duplicate suspected for ${t.id}.`;
    case "recommend_macro":
      return t.aiSuggestedMacroId
        ? `Recommended macro: ${t.aiSuggestedMacroId}. It's pre-mapped to this category and the customer's tier.`
        : `No macro stands out — recommend a custom reply.`;
  }
}

export function AICopilotPanel() {
  const { ai, closeAI, currentUserId } = useAppState();
  const store = useStore();
  const ticket = ai.contextTicketId ? store.ticketById(ai.contextTicketId) : null;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!ai.open) return;
    setMessages([
      {
        id: newId(),
        role: "assistant",
        body: ticket
          ? `I've loaded ${ticket.id} (${ticket.subject}). I can summarize, draft a reply, classify, recommend a macro, flag duplicates, or suggest escalation. What would you like?`
          : "Hi — I'm your support copilot. Ask me about the queue, or pick a ticket to get sharper answers.",
        meta: ticket ? `Context: ${ticket.id}` : "Queue-wide",
      },
    ]);
  }, [ai.open, ai.contextTicketId, ticket]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAI();
    };
    if (ai.open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ai.open, closeAI]);

  if (!ai.open) return null;

  const runAction = (a: Action) => {
    const meta = actionMeta[a];
    setMessages((m) => [
      ...m,
      { id: newId(), role: "user", body: meta.label },
    ]);
    setGenerating(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: newId(),
          role: "assistant",
          body: generate(a, ai.contextTicketId, store),
          meta: ticket ? `${meta.chip} · ${ticket.id}` : meta.chip,
        },
      ]);
      setGenerating(false);
    }, 600);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { id: newId(), role: "user", body: text }]);
    setInput("");
    setGenerating(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: newId(),
          role: "assistant",
          body: ticket
            ? `Working on ${ticket.id}: ${ticket.aiSummary ?? "no prior summary"}.`
            : `Across the queue, the highest-leverage focus right now is the angry escalation from Aldridge (T-4827) and the SLA-breach-risk on Helix (T-4823).`,
          meta: ticket ? `Reply · ${ticket.id}` : "Reply",
        },
      ]);
      setGenerating(false);
    }, 600);
  };

  const insertReplyToComposer = (body: string) => {
    if (!ticket) return;
    store.sendReply({
      ticketId: ticket.id,
      actorId: currentUserId,
      body,
    });
    closeAI();
  };

  return (
    <>
      <div
        onClick={closeAI}
        className="fixed inset-0 bg-ink-900/30 backdrop-blur-sm z-40"
      />
      <aside className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white shadow-drawer z-50 flex flex-col">
        <div className="px-3 pt-2.5 pb-2 border-b border-ink-200">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded bg-brand-700 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </span>
              <div>
                <div className="text-[12px] font-semibold text-ink-900 leading-tight">
                  Support Copilot
                </div>
                <div className="text-[10px] text-ink-500">
                  {ticket
                    ? `Context: ${ticket.id} · ${ticket.subject.slice(0, 40)}${ticket.subject.length > 40 ? "…" : ""}`
                    : "Queue-wide"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={closeAI}
              className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-ink-100 text-ink-500"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="px-3 py-2 border-b border-ink-200">
          <div className="text-[9.5px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">
            Quick actions
          </div>
          <div className="grid grid-cols-2 gap-1">
            {(Object.keys(actionMeta) as Action[]).map((a) => {
              const meta = actionMeta[a];
              const Icon = meta.icon;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => runAction(a)}
                  className="flex items-center gap-1.5 text-left px-2 py-1.5 rounded border border-ink-200 hover:border-brand-300 hover:bg-brand-50/40 text-[11px]"
                >
                  <Icon className="h-3 w-3 text-brand-600" />
                  <span className="text-ink-800 font-medium leading-tight">
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-ink-50/40">
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} onInsert={insertReplyToComposer} />
          ))}
          {generating && (
            <div className="flex items-start gap-2">
              <span className="h-6 w-6 rounded bg-brand-700 flex items-center justify-center shrink-0">
                <Sparkles className="h-3 w-3 text-white" />
              </span>
              <div className="bg-white border border-ink-200 rounded px-2 py-1.5 inline-flex items-center gap-1">
                <Dot />
                <Dot delay={120} />
                <Dot delay={240} />
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={send}
          className="px-3 pt-2 pb-2.5 border-t border-ink-200 bg-white"
        >
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(e);
                }
              }}
              rows={2}
              placeholder={
                ticket ? `Ask about ${ticket.id}…` : "Ask about the queue…"
              }
              className="w-full resize-none rounded border border-ink-200 bg-white px-2 py-1.5 pr-8 text-[12px] text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-300"
            />
            <button
              type="submit"
              className="absolute right-1 bottom-1 h-6 w-6 inline-flex items-center justify-center rounded bg-brand-600 hover:bg-brand-700 text-white"
              aria-label="Send"
            >
              <Send className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-1 flex items-center justify-between text-[9.5px] text-ink-400">
            <span>Demo · responses simulated</span>
            <span>⌘/ to open · ⏎ to send</span>
          </div>
        </form>
      </aside>
    </>
  );
}

function Bubble({
  msg,
  onInsert,
}: {
  msg: Msg;
  onInsert: (body: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] bg-brand-700 text-white rounded px-2 py-1 text-[12px]">
          {msg.body}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <span className="h-6 w-6 rounded bg-brand-700 flex items-center justify-center shrink-0">
        <Sparkles className="h-3 w-3 text-white" />
      </span>
      <div className="max-w-[88%] flex-1">
        {msg.meta && (
          <div className="text-[9.5px] font-semibold text-brand-700 uppercase tracking-wider mb-0.5">
            {msg.meta}
          </div>
        )}
        <div className="bg-white border border-ink-200 rounded px-2 py-1.5 text-[12px] text-ink-800 whitespace-pre-wrap leading-relaxed">
          {msg.body}
        </div>
        <div className="mt-1 flex items-center gap-2 text-[10.5px]">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(msg.body);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="text-ink-500 hover:text-ink-800 inline-flex items-center gap-0.5"
          >
            {copied ? (
              <>
                <Check className="h-2.5 w-2.5 text-success-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-2.5 w-2.5" />
                Copy
              </>
            )}
          </button>
          {msg.meta?.includes("Reply") && (
            <button
              type="button"
              onClick={() => onInsert(msg.body)}
              className="text-brand-700 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              <ArrowRightCircle className="h-2.5 w-2.5" />
              Send as reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full bg-ink-300 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
