import { Flame, AlertOctagon, Sparkles } from "lucide-react";
import { useStore } from "../state/DataStore";
import { useAppState } from "../state/AppState";
import { useToast } from "../state/Toaster";
import { Avatar } from "../components/ui/Avatar";
import {
  ChannelIcon,
  priorityClass,
  priorityLabel,
  sentimentDot,
  sentimentLabel,
} from "../components/ui/icons";
import { customersById, accountsById } from "../data/accounts";
import { teamById } from "../data/team";
import { compactTime, relativeTime } from "../lib/format";

export function EscalationsPage() {
  const store = useStore();
  const { setActiveTicketId, currentUserId } = useAppState();
  const toast = useToast();
  const escalated = store.tickets
    .filter((t) => t.status === "escalated")
    .sort(
      (a, b) =>
        new Date(b.escalatedAt ?? b.createdAt).getTime() -
        new Date(a.escalatedAt ?? a.createdAt).getTime(),
    );

  return (
    <div className="h-full overflow-y-auto bg-ink-100">
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <header className="mb-3 flex items-end justify-between">
          <div>
            <h1 className="text-[18px] font-semibold text-ink-900 tracking-tight inline-flex items-center gap-2">
              <Flame className="h-4 w-4 text-urgent-600" />
              Escalations
            </h1>
            <p className="text-[12px] text-ink-500 mt-0.5">
              {escalated.length} active escalation
              {escalated.length === 1 ? "" : "s"}. Sorted by most recent.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[11px] text-warning-700 bg-warning-50 ring-1 ring-warning-100 rounded px-1.5 py-0.5">
            <Sparkles className="h-3 w-3" />
            <span>
              <span className="font-semibold">AI:</span> Aldridge (T-4827) is
              the highest-leverage save right now — pattern-match to a churned
              account from 2024.
            </span>
          </div>
        </header>

        <div className="panel rounded-md overflow-hidden">
          {escalated.length === 0 ? (
            <div className="px-4 py-8 text-center text-[12px] text-ink-500">
              No active escalations. Quiet desk.
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {escalated.map((t) => {
                const customer = customersById[t.customerId];
                const account = accountsById[t.accountId];
                const escTo = t.escalatedTo ? teamById[t.escalatedTo] : null;
                return (
                  <li
                    key={t.id}
                    onClick={() => {
                      setActiveTicketId(t.id);
                      window.location.hash = "#/";
                    }}
                    className="px-3 py-2.5 hover:bg-ink-50/60 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ChannelIcon channel={t.channel} className="text-ink-400 shrink-0" />
                      <span className="font-mono text-[10.5px] text-ink-400 tabular-nums shrink-0">
                        {t.id}
                      </span>
                      <span
                        className={`px-1 py-0 rounded text-[9.5px] font-semibold ring-1 ring-inset uppercase tracking-wider ${priorityClass[t.priority]}`}
                      >
                        {priorityLabel[t.priority]}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${sentimentDot[t.sentiment]}`}
                        title={sentimentLabel[t.sentiment]}
                      />
                      <span className="text-[12.5px] font-semibold text-ink-900 truncate flex-1">
                        {t.subject}
                      </span>
                      <span className="text-[10.5px] text-ink-500 tabular-nums shrink-0">
                        Esc{" "}
                        {t.escalatedAt
                          ? relativeTime(t.escalatedAt)
                          : "—"}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-ink-500 min-w-0">
                      <span className="truncate">
                        {customer?.name}{" "}
                        <span className="text-ink-400">· {account?.name}</span>
                        {account?.tier === "Enterprise" && (
                          <span className="ml-1 text-[9px] text-brand-700 font-semibold uppercase tracking-wider">
                            ENT
                          </span>
                        )}
                        {account?.churnRisk && (
                          <span className="ml-1 text-[9px] text-urgent-700 font-semibold uppercase tracking-wider">
                            CHURN
                          </span>
                        )}
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 shrink-0">
                        Owner
                        {escTo ? <Avatar ownerId={escTo.id} size="xs" /> : null}
                        <span className="text-ink-700">
                          {escTo?.name.split(" ")[0]}
                        </span>
                      </span>
                    </div>
                    {t.escalationReason && (
                      <p className="mt-1 text-[11px] text-urgent-700 italic leading-snug bg-urgent-50/40 rounded px-1.5 py-0.5 inline-block">
                        <AlertOctagon className="h-2.5 w-2.5 inline -mt-0.5 mr-0.5" />
                        {t.escalationReason}
                      </p>
                    )}
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[10.5px] text-ink-400 tabular-nums">
                        Last customer reply{" "}
                        {relativeTime(t.lastCustomerMessageAt)} · Res SLA{" "}
                        {compactTime(t.slaResolutionDueAt)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          store.changeStatus({
                            ticketId: t.id,
                            actorId: currentUserId,
                            to: "open",
                          });
                          toast.info("De-escalated");
                        }}
                        className="text-[10.5px] text-ink-500 hover:text-ink-800 font-medium"
                      >
                        De-escalate
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
