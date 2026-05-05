import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Inbox,
  AlertTriangle,
  Flame,
  UserMinus,
  Clock3,
  CheckCircle2,
  User,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useStore } from "../../state/DataStore";
import { useAppState } from "../../state/AppState";
import type { QueueTab } from "../../state/AppState";
import { Avatar } from "../ui/Avatar";
import {
  ChannelIcon,
  priorityClass,
  priorityLabel,
  sentimentDot,
} from "../ui/icons";
import type { Channel, Ticket } from "../../data/types";
import { compactTime, relativeTime } from "../../lib/format";
import { accountsById, customersById } from "../../data/accounts";

type TabConfig = {
  id: QueueTab;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  match: (t: Ticket, currentUserId: string) => boolean;
};

const tabs: TabConfig[] = [
  {
    id: "all",
    label: "All",
    icon: Inbox,
    match: (t) => t.status !== "closed",
  },
  {
    id: "unassigned",
    label: "Unassigned",
    icon: UserMinus,
    match: (t) => !t.ownerId && t.status !== "resolved" && t.status !== "closed",
  },
  {
    id: "mine",
    label: "Mine",
    icon: User,
    match: (t, uid) =>
      t.ownerId === uid && t.status !== "resolved" && t.status !== "closed",
  },
  {
    id: "urgent",
    label: "Urgent",
    icon: Flame,
    match: (t) =>
      t.priority === "urgent" && t.status !== "resolved" && t.status !== "closed",
  },
  {
    id: "escalated",
    label: "Escalated",
    icon: AlertTriangle,
    match: (t) => t.status === "escalated",
  },
  {
    id: "waiting_customer",
    label: "Waiting · customer",
    icon: Clock3,
    match: (t) => t.status === "waiting_on_customer",
  },
  {
    id: "sla_risk",
    label: "SLA risk",
    icon: AlertTriangle,
    match: (t) => {
      // Either response or resolution due in <30 min OR breached
      const now = Date.now();
      const respDue = new Date(t.slaResponseDueAt).getTime();
      const resDue = new Date(t.slaResolutionDueAt).getTime();
      const noFirstResp = !t.firstResponseAt;
      const respPressure = noFirstResp && respDue - now < 30 * 60_000;
      const resPressure =
        t.status !== "resolved" &&
        t.status !== "closed" &&
        resDue - now < 60 * 60_000;
      return respPressure || resPressure;
    },
  },
  {
    id: "resolved",
    label: "Resolved",
    icon: CheckCircle2,
    match: (t) => t.status === "resolved",
  },
];

const channels: ("all" | Channel)[] = [
  "all",
  "email",
  "chat",
  "voice",
  "api",
  "social",
];

export function TicketQueue() {
  const store = useStore();
  const {
    activeTicketId,
    setActiveTicketId,
    activeTab,
    setActiveTab,
    channelFilter,
    setChannelFilter,
    currentUserId,
  } = useAppState();
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const tab of tabs) {
      out[tab.id] = store.tickets.filter((t) => tab.match(t, currentUserId))
        .length;
    }
    return out;
  }, [store.tickets, currentUserId]);

  const visibleTab = tabs.find((x) => x.id === activeTab) ?? tabs[0];
  const filtered = useMemo(() => {
    return store.tickets
      .filter((t) => visibleTab.match(t, currentUserId))
      .filter((t) =>
        channelFilter === "all" ? true : t.channel === channelFilter,
      )
      .filter((t) => {
        if (!query) return true;
        const q = query.toLowerCase();
        const cust = customersById[t.customerId];
        const acct = accountsById[t.accountId];
        return `${t.id} ${t.subject} ${cust?.name} ${acct?.name}`
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => {
        // Urgent first, then breached SLA, then most-recent
        if (a.priority === "urgent" && b.priority !== "urgent") return -1;
        if (b.priority === "urgent" && a.priority !== "urgent") return 1;
        return (
          new Date(b.lastCustomerMessageAt).getTime() -
          new Date(a.lastCustomerMessageAt).getTime()
        );
      });
  }, [store.tickets, visibleTab, channelFilter, query, currentUserId]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-ink-200 min-w-0">
      {/* Header */}
      <div className="px-3 pt-2.5 pb-2 border-b border-ink-200 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[12px] font-semibold text-ink-900 uppercase tracking-wider">
            Queue
          </h2>
          <span className="text-[10px] text-ink-500 tabular-nums">
            {filtered.length} of{" "}
            {store.tickets.filter((t) => t.status !== "closed").length}
          </span>
        </div>
        <div className="relative">
          <Search className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter…"
            className="w-full pl-7 pr-2 h-6 rounded bg-ink-50 border border-ink-200 text-[11.5px] text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-300 focus:bg-white"
          />
        </div>
        {/* Tab strip */}
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            const count = counts[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={active ? "queue-tab-active" : "queue-tab"}
              >
                <Icon className="h-3 w-3" />
                {t.label}
                {count > 0 && (
                  <span
                    className={`tnum ml-0.5 text-[10px] ${
                      active ? "text-white/80" : "text-ink-400"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {/* Channel filter */}
        <div className="flex items-center gap-1 text-[10.5px]">
          <Filter className="h-3 w-3 text-ink-400" />
          {channels.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChannelFilter(c)}
              className={`px-1.5 py-0 rounded uppercase tracking-wider font-semibold ${
                channelFilter === c
                  ? "bg-ink-200 text-ink-800"
                  : "text-ink-500 hover:bg-ink-100"
              }`}
            >
              {c}
            </button>
          ))}
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-0.5 text-ink-500 hover:text-ink-800"
            title="Saved views"
          >
            <ChevronDown className="h-3 w-3" />
            views
          </button>
        </div>
      </div>

      {/* Ticket list */}
      <ul className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <li className="px-3 py-6 text-center text-[11.5px] text-ink-400">
            No tickets in this view.
          </li>
        )}
        {filtered.map((t) => (
          <TicketRow
            key={t.id}
            ticket={t}
            active={t.id === activeTicketId}
            onClick={() => {
              setActiveTicketId(t.id);
              if (t.unread) store.markRead(t.id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

function TicketRow({
  ticket: t,
  active,
  onClick,
}: {
  ticket: Ticket;
  active: boolean;
  onClick: () => void;
}) {
  const customer = customersById[t.customerId];
  const account = accountsById[t.accountId];
  const now = Date.now();
  const noFirstResp = !t.firstResponseAt;
  const respDue = new Date(t.slaResponseDueAt).getTime();
  const resDue = new Date(t.slaResolutionDueAt).getTime();
  const respBreach = noFirstResp && respDue - now <= 0;
  const respPressure = noFirstResp && respDue - now > 0 && respDue - now < 30 * 60_000;
  const resBreach =
    t.status !== "resolved" && t.status !== "closed" && resDue - now <= 0;
  const resPressure =
    t.status !== "resolved" &&
    t.status !== "closed" &&
    resDue - now > 0 &&
    resDue - now < 60 * 60_000;
  const slaTone =
    respBreach || resBreach
      ? "text-urgent-700 font-semibold"
      : respPressure || resPressure
        ? "text-warning-700 font-semibold"
        : "text-ink-500";
  const leftAccent =
    t.priority === "urgent"
      ? "before:bg-urgent-500"
      : t.priority === "high"
        ? "before:bg-warning-500"
        : "before:bg-transparent";
  return (
    <li
      onClick={onClick}
      className={`relative cursor-pointer select-none border-b border-ink-100 px-3 py-2 ${
        active
          ? "bg-brand-50/60"
          : t.unread
            ? "bg-white hover:bg-ink-50/60"
            : "bg-white hover:bg-ink-50/60"
      } before:absolute before:inset-y-0 before:left-0 before:w-[3px] ${leftAccent}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${
            t.unread ? "bg-brand-500" : "bg-transparent"
          }`}
        />
        <ChannelIcon channel={t.channel} className="text-ink-400 shrink-0" />
        <span className="font-mono text-[10.5px] text-ink-400 tabular-nums shrink-0">
          {t.id}
        </span>
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${sentimentDot[t.sentiment]}`}
          title={t.sentiment}
        />
        <span
          className={`shrink-0 px-1 py-0 rounded text-[9.5px] font-semibold ring-1 ring-inset uppercase tracking-wider ${priorityClass[t.priority]}`}
        >
          {priorityLabel[t.priority]}
        </span>
        <span className={`ml-auto text-[10.5px] tabular-nums shrink-0 ${slaTone}`}>
          {noFirstResp ? "FR " : ""}
          {compactTime(t.firstResponseAt ? t.slaResolutionDueAt : t.slaResponseDueAt)}
        </span>
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 min-w-0">
        <span
          className={`truncate text-[12.5px] ${
            t.unread ? "font-semibold text-ink-900" : "text-ink-800"
          }`}
        >
          {t.subject}
        </span>
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-ink-500 min-w-0">
        <span className="truncate">
          {customer?.name}{" "}
          <span className="text-ink-400">· {account?.name}</span>
          {account?.tier === "Enterprise" && (
            <span className="ml-1 text-[9px] text-brand-700 font-semibold uppercase tracking-wider">
              ENT
            </span>
          )}
        </span>
        <span className="ml-auto shrink-0 text-ink-400 tabular-nums">
          {relativeTime(t.lastCustomerMessageAt)}
        </span>
      </div>
      {/* Tag/AI signal hint row */}
      {(t.tags.length > 0 || t.aiSignals.some((s) => s.weight === "high")) && (
        <div className="mt-1 flex items-center gap-1 flex-wrap">
          {t.aiSignals.find((s) => s.weight === "high") && (
            <span className="inline-flex items-center gap-0.5 text-[9.5px] font-semibold text-brand-700 bg-brand-50 px-1 rounded">
              <Sparkles className="h-2.5 w-2.5" />
              AI
            </span>
          )}
          {t.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9.5px] text-ink-500 px-1 rounded bg-ink-100"
            >
              {tag}
            </span>
          ))}
          {t.ownerId && (
            <span className="ml-auto inline-flex items-center gap-0.5">
              <Avatar ownerId={t.ownerId} size="xs" />
            </span>
          )}
        </div>
      )}
    </li>
  );
}
