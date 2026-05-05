import {
  Building2,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Link2,
  Receipt,
  Activity,
  Crown,
  Mail,
  Phone,
  Clock3,
  AlertOctagon,
  Wand2,
  BookOpen,
  Copy,
  ChevronRight,
} from "lucide-react";
import { useStore } from "../../state/DataStore";
import { useAppState } from "../../state/AppState";
import { Avatar } from "../ui/Avatar";
import { sentimentDot, sentimentLabel } from "../ui/icons";
import { customersById, accountsById } from "../../data/accounts";
import {
  incidentsById,
  knownIssuesById,
} from "../../data/incidents";
import { teamById } from "../../data/team";
import { fmtMoney } from "../../data/tickets";
import { relativeTime } from "../../lib/format";
import type { AISignal } from "../../data/types";

export function ContextPanel() {
  const store = useStore();
  const { activeTicketId, setActiveTicketId, openAI } = useAppState();
  const ticket = activeTicketId ? store.ticketById(activeTicketId) : null;

  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center text-[12px] text-ink-400 border-l border-ink-200 bg-white">
        Pick a ticket to see context.
      </div>
    );
  }

  const customer = customersById[ticket.customerId];
  const account = accountsById[ticket.accountId];
  const owner = ticket.ownerId ? teamById[ticket.ownerId] : null;
  const incident = ticket.incidentId
    ? incidentsById[ticket.incidentId]
    : undefined;
  // Tickets from the same account, excluding this one
  const otherTickets = store.tickets
    .filter(
      (t) =>
        t.accountId === ticket.accountId &&
        t.id !== ticket.id &&
        t.status !== "closed",
    )
    .sort((a, b) => (a.lastCustomerMessageAt < b.lastCustomerMessageAt ? 1 : -1))
    .slice(0, 4);
  // Known issues touching the same product area
  const relatedKI = Object.values(knownIssuesById).filter(
    (k) =>
      ticket.productArea &&
      k.affectsArea.toLowerCase().includes(ticket.productArea.split(" ")[0].toLowerCase()),
  );

  const highSignals = ticket.aiSignals.filter((s) => s.weight === "high");
  const otherSignals = ticket.aiSignals.filter((s) => s.weight !== "high");

  return (
    <aside className="w-[320px] shrink-0 hidden lg:flex flex-col border-l border-ink-200 bg-white overflow-y-auto">
      {/* Customer / account */}
      <Section title="Customer">
        <div className="flex items-center gap-2">
          <Avatar name={customer?.name ?? "?"} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[12.5px] font-semibold text-ink-900 truncate">
                {customer?.name}
              </span>
              {customer?.vip && (
                <Crown
                  className="h-3 w-3 text-warning-600"
                  aria-label="VIP"
                />
              )}
            </div>
            <div className="text-[11px] text-ink-500 truncate">
              {customer?.title}
            </div>
          </div>
        </div>
        <div className="mt-2 space-y-0.5 text-[11px]">
          <div className="flex items-center gap-1.5 text-ink-500">
            <Mail className="h-3 w-3 text-ink-400" />
            <span className="font-mono text-ink-700 truncate">
              {customer?.email}
            </span>
          </div>
          {customer?.preferredChannel && (
            <div className="flex items-center gap-1.5 text-ink-500">
              <Phone className="h-3 w-3 text-ink-400" />
              prefers {customer.preferredChannel}
            </div>
          )}
          {customer?.timezone && (
            <div className="flex items-center gap-1.5 text-ink-500">
              <Clock3 className="h-3 w-3 text-ink-400" />
              {customer.timezone}
            </div>
          )}
        </div>
      </Section>

      <Section title="Account">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded bg-ink-900 text-white flex items-center justify-center">
            <Building2 className="h-3.5 w-3.5" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[12.5px] font-semibold text-ink-900 truncate">
                {account?.name}
              </span>
              <span className="badge-brand">{account?.tier}</span>
            </div>
            <div className="text-[11px] text-ink-500">
              {account?.industry}
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <Mini label="MRR" value={fmtMoney(account?.mrr ?? 0)} />
          <Mini
            label="Health"
            value={String(account?.healthScore ?? "—")}
            tone={
              (account?.healthScore ?? 0) >= 75
                ? "success"
                : (account?.healthScore ?? 0) >= 50
                  ? "neutral"
                  : "warning"
            }
          />
          <Mini
            label="Tenure"
            value={`${account?.tenureMonths ?? 0}mo`}
          />
        </div>
        {/* Account flags */}
        <div className="mt-2 flex items-center gap-1 flex-wrap">
          {account?.churnRisk && (
            <span className="badge-danger">Churn risk</span>
          )}
          {account?.expansionLikely && (
            <span className="badge-success">Expansion likely</span>
          )}
          {account?.recentInvoiceFailure && (
            <span className="badge-warning">
              <Receipt className="h-2.5 w-2.5" />
              Invoice failure
            </span>
          )}
        </div>
        {account?.notes && (
          <p className="mt-2 text-[11px] text-ink-600 italic leading-snug">
            "{account.notes}"
          </p>
        )}
        {owner && (
          <div className="mt-2 text-[11px] text-ink-500 inline-flex items-center gap-1">
            <span>Support owner</span>
            <Avatar ownerId={owner.id} size="xs" />
            <span className="text-ink-700 font-medium">
              {owner.name.split(" ")[0]}
            </span>
          </div>
        )}
      </Section>

      {/* AI summary + signals — operational intelligence */}
      <Section
        title="AI summary"
        right={
          <button
            type="button"
            onClick={() => openAI(ticket.id)}
            className="text-[10.5px] text-brand-700 font-semibold hover:underline inline-flex items-center gap-0.5"
          >
            Open
            <ChevronRight className="h-2.5 w-2.5" />
          </button>
        }
      >
        {ticket.aiSummary ? (
          <div className="rounded-md border border-brand-200 bg-gradient-to-br from-brand-50/50 to-white p-2">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="h-3 w-3 text-brand-700" />
              <span className="text-[9.5px] font-semibold uppercase tracking-wider text-brand-700">
                Summary
              </span>
            </div>
            <p className="text-[12px] text-ink-800 leading-relaxed">
              {ticket.aiSummary}
            </p>
          </div>
        ) : (
          <div className="text-[11px] text-ink-400 italic">No AI summary.</div>
        )}
        {/* High-priority signals */}
        {highSignals.length > 0 && (
          <ul className="mt-2 space-y-1">
            {highSignals.map((s) => (
              <SignalRow key={s.id} signal={s} onJump={setActiveTicketId} />
            ))}
          </ul>
        )}
        {otherSignals.length > 0 && (
          <ul className="mt-1.5 space-y-0.5">
            {otherSignals.map((s) => (
              <SignalRow key={s.id} signal={s} onJump={setActiveTicketId} compact />
            ))}
          </ul>
        )}
      </Section>

      {/* Issue intel */}
      <Section title="Issue intelligence">
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <Field label="Category" value={ticket.category ?? "—"} />
          <Field label="Product area" value={ticket.productArea ?? "—"} />
          <Field
            label="Sentiment"
            value={
              <span className="inline-flex items-center gap-1">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${sentimentDot[ticket.sentiment]}`}
                />
                {sentimentLabel[ticket.sentiment]}
              </span>
            }
          />
          <Field
            label="Urgency"
            value={
              <span
                className={`tabular-nums font-semibold ${
                  ticket.urgencyScore >= 80
                    ? "text-urgent-700"
                    : ticket.urgencyScore >= 60
                      ? "text-warning-700"
                      : "text-ink-700"
                }`}
              >
                {ticket.urgencyScore}
              </span>
            }
          />
        </div>
        {/* Sentiment trajectory */}
        {ticket.sentimentHistory.length > 1 && (
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold mb-1">
              Sentiment over messages
            </div>
            <div className="flex items-center gap-0.5">
              {ticket.sentimentHistory.map((s, i) => (
                <span
                  key={i}
                  className={`h-2 w-3 rounded-sm ${sentimentDot[s]}`}
                  title={sentimentLabel[s]}
                />
              ))}
              <span className="text-[10px] text-ink-400 ml-1">
                · {sentimentLabel[ticket.sentimentHistory[ticket.sentimentHistory.length - 1]]} now
              </span>
            </div>
          </div>
        )}
        {ticket.missingContext && ticket.missingContext.length > 0 && (
          <div className="mt-2 rounded bg-warning-50/40 border border-warning-100 p-1.5">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-warning-700 inline-flex items-center gap-0.5 mb-0.5">
              <AlertTriangle className="h-2.5 w-2.5" />
              Missing context
            </div>
            <ul className="text-[11px] text-warning-800 space-y-0.5">
              {ticket.missingContext.map((c, i) => (
                <li key={i}>· {c}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Linked incident */}
      {incident && (
        <Section title={`Linked incident · ${incident.id}`}>
          <div className="rounded-md border border-warning-200 bg-warning-50/40 p-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <AlertOctagon className="h-3 w-3 text-warning-700" />
              <span className="text-[12px] font-semibold text-ink-900">
                {incident.title}
              </span>
            </div>
            <div className="text-[10.5px] text-ink-500 mb-1">
              {incident.productArea} · started{" "}
              {relativeTime(incident.startedAt)} · {incident.ownerTeam}
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] text-warning-700 font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-warning-500 animate-pulse" />
              {incident.status.replace(/_/g, " ")}
            </div>
            <p className="mt-1 text-[11.5px] text-ink-700 leading-snug">
              {incident.summary}
            </p>
          </div>
        </Section>
      )}

      {/* Other tickets from this account */}
      {otherTickets.length > 0 && (
        <Section title={`Other open from ${account?.name}`}>
          <ul className="space-y-1">
            {otherTickets.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActiveTicketId(t.id)}
                  className="w-full text-left px-1.5 py-1 rounded hover:bg-ink-100 flex items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] text-ink-400 tabular-nums shrink-0">
                    {t.id}
                  </span>
                  <span className="text-[11.5px] text-ink-800 truncate flex-1">
                    {t.subject}
                  </span>
                  <span className="text-[10px] text-ink-400 shrink-0">
                    {relativeTime(t.lastCustomerMessageAt)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Known issues */}
      {relatedKI.length > 0 && (
        <Section title="Related known issues">
          <ul className="space-y-1">
            {relatedKI.slice(0, 3).map((k) => (
              <li
                key={k.id}
                className="rounded border border-ink-200 bg-ink-50/40 p-1.5"
              >
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3 text-ink-500 shrink-0" />
                  <span className="text-[11.5px] font-semibold text-ink-900">
                    {k.title}
                  </span>
                </div>
                <div className="text-[10.5px] text-ink-500">
                  {k.id} · {k.affectsArea} · status{" "}
                  <span
                    className={
                      k.status === "fix_shipped"
                        ? "text-success-700 font-semibold"
                        : k.status === "fix_in_progress"
                          ? "text-brand-700 font-semibold"
                          : "text-warning-700 font-semibold"
                    }
                  >
                    {k.status.replace(/_/g, " ")}
                  </span>
                </div>
                {k.workaround && (
                  <p className="mt-0.5 text-[11px] text-ink-700">
                    Workaround: {k.workaround}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Tags */}
      {ticket.tags.length > 0 && (
        <Section title="Tags">
          <div className="flex items-center gap-1 flex-wrap">
            {ticket.tags.map((t) => (
              <span key={t} className="text-[10px] text-ink-600 bg-ink-100 px-1.5 py-0 rounded">
                {t}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Recent activity (timestamps) */}
      <Section title="Activity">
        <div className="space-y-0.5 text-[11px] text-ink-500">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-ink-400" />
            Created{" "}
            <span className="text-ink-700 tabular-nums">
              {relativeTime(ticket.createdAt)}
            </span>
          </div>
          {ticket.firstResponseAt && (
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-ink-400" />
              First response{" "}
              <span className="text-ink-700 tabular-nums">
                {relativeTime(ticket.firstResponseAt)}
              </span>
            </div>
          )}
          {ticket.lastAgentReplyAt && (
            <div className="flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-ink-400" />
              Last agent reply{" "}
              <span className="text-ink-700 tabular-nums">
                {relativeTime(ticket.lastAgentReplyAt)}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-ink-400" />
            Last customer message{" "}
            <span className="text-ink-700 tabular-nums">
              {relativeTime(ticket.lastCustomerMessageAt)}
            </span>
          </div>
        </div>
      </Section>
    </aside>
  );
}

function Section({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="px-3 py-2.5 border-b border-ink-100">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-400">
          {title}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[9.5px] uppercase tracking-wider text-ink-400 font-semibold">
        {label}
      </div>
      <div className="text-[11.5px] text-ink-800">{value}</div>
    </div>
  );
}

function Mini({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "success" | "warning" | "neutral";
}) {
  const cls =
    tone === "success"
      ? "text-success-700 bg-success-50"
      : tone === "warning"
        ? "text-warning-700 bg-warning-50"
        : "text-ink-700 bg-ink-50";
  return (
    <div className={`rounded p-1.5 ${cls}`}>
      <div className="text-[9px] uppercase tracking-wider font-semibold text-ink-400">
        {label}
      </div>
      <div className="text-[12px] font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function SignalRow({
  signal,
  onJump,
  compact,
}: {
  signal: AISignal;
  onJump: (id: string) => void;
  compact?: boolean;
}) {
  const tone =
    signal.weight === "high"
      ? "border-warning-200 bg-warning-50/40"
      : "border-ink-200 bg-ink-50/40";
  const dot =
    signal.weight === "high"
      ? "bg-warning-500"
      : signal.weight === "medium"
        ? "bg-brand-500"
        : "bg-ink-300";
  const Icon =
    signal.kind === "duplicate_suspected"
      ? Copy
      : signal.kind === "incident_match"
        ? AlertOctagon
        : signal.kind === "macro_suggested"
          ? Wand2
          : signal.kind === "vip_account"
            ? Crown
            : signal.kind === "billing_dispute"
              ? Receipt
              : signal.kind === "scope_promise"
                ? AlertTriangle
                : signal.kind === "language_other"
                  ? Sparkles
                  : signal.kind === "missing_context"
                    ? AlertTriangle
                    : signal.kind === "escalation_recommended"
                      ? AlertOctagon
                      : signal.kind === "churn_risk"
                        ? AlertTriangle
                        : Sparkles;
  return (
    <li
      className={`rounded border ${tone} ${compact ? "p-1.5" : "p-2"}`}
    >
      <div className="flex items-start gap-1.5">
        <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${dot}`} />
        <Icon className="h-3 w-3 text-ink-500 mt-0.5 shrink-0" />
        <span className="text-[11.5px] text-ink-800 leading-snug flex-1">
          {signal.body}
        </span>
      </div>
      {(signal.targetTicketId || signal.targetMacroId || signal.targetIncidentId) && (
        <div className="mt-1 ml-3 flex items-center gap-2">
          {signal.targetTicketId && (
            <button
              type="button"
              onClick={() => onJump(signal.targetTicketId!)}
              className="text-[10.5px] text-brand-700 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              <Link2 className="h-2.5 w-2.5" />
              Open {signal.targetTicketId}
            </button>
          )}
          {signal.targetIncidentId && (
            <span className="text-[10.5px] text-warning-700 font-semibold inline-flex items-center gap-0.5">
              <AlertOctagon className="h-2.5 w-2.5" />
              {signal.targetIncidentId}
            </span>
          )}
          {signal.targetMacroId && (
            <span className="text-[10.5px] text-ink-600 inline-flex items-center gap-0.5">
              <Wand2 className="h-2.5 w-2.5" />
              {signal.targetMacroId}
            </span>
          )}
        </div>
      )}
    </li>
  );
}
