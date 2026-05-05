import { useEffect, useRef, useState } from "react";
import {
  Send,
  Paperclip,
  Wand2,
  StickyNote,
  CheckCircle2,
  Flame,
  ArrowRightCircle,
  GitMerge,
  MoonStar,
  Tag as TagIcon,
  ChevronDown,
  AlertOctagon,
  Sparkles,
  User,
  Mail,
  MessageCircle,
  Phone,
  Code,
  AtSign,
  Hash,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useStore } from "../../state/DataStore";
import { useAppState } from "../../state/AppState";
import { useToast } from "../../state/Toaster";
import { Avatar } from "../ui/Avatar";
import {
  ChannelIcon,
  channelLabel,
  priorityClass,
  priorityLabel,
  sentimentDot,
  sentimentLabel,
} from "../ui/icons";
import type {
  Channel,
  Message,
  MessageKind,
  Priority,
  TicketStatus,
} from "../../data/types";
import { compactTime, fmtTime, relativeTime } from "../../lib/format";
import { customersById } from "../../data/accounts";
import { teamById, team } from "../../data/team";
import { macros } from "../../data/macros";

const channelInline: Record<
  Channel,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  email: Mail,
  chat: MessageCircle,
  voice: Phone,
  api: Code,
  social: AtSign,
};

export function ActiveTicketWorkspace() {
  const store = useStore();
  const { activeTicketId, currentUserId, openAI } = useAppState();
  const toast = useToast();
  const ticket = activeTicketId ? store.ticketById(activeTicketId) : null;
  const [draft, setDraft] = useState("");
  const [internal, setInternal] = useState(false);
  const [showMacros, setShowMacros] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);

  // Reset composer when switching ticket; auto-scroll to thread end
  useEffect(() => {
    setDraft("");
    setInternal(false);
    setShowMacros(false);
    setAssignOpen(false);
    setPriorityOpen(false);
    setTimeout(() => {
      threadEndRef.current?.scrollIntoView({ block: "end" });
    }, 0);
  }, [activeTicketId]);

  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center text-[12px] text-ink-400">
        Pick a ticket from the queue to start working.
      </div>
    );
  }

  const messages = store.messagesByTicket(ticket.id);
  const customer = customersById[ticket.customerId];
  const owner = ticket.ownerId ? teamById[ticket.ownerId] : null;
  const ChannelI = channelInline[ticket.channel];

  const insertMacro = (id: string) => {
    const m = macros.find((x) => x.id === id);
    if (!m) return;
    const filled = m.body
      .replace(/\{\{first_name\}\}/g, customer?.name.split(" ")[0] ?? "")
      .replace(
        /\{\{agent_name\}\}/g,
        teamById[currentUserId]?.name.split(" ")[0] ?? "",
      )
      .replace(/\{\{sla_response\}\}/g, "1")
      .replace(/\{\{eta\}\}/g, "4 hours")
      .replace(/\{\{csat_link\}\}/g, "csat.northwind.io/...");
    setDraft(filled);
    setShowMacros(false);
    composerRef.current?.focus();
    toast.info(`Macro inserted · ${m.name}`);
  };

  const send = () => {
    if (!draft.trim()) return;
    store.sendReply({
      ticketId: ticket.id,
      actorId: currentUserId,
      body: draft.trim(),
      internal,
    });
    setDraft("");
    toast.success(internal ? "Internal note posted" : "Reply sent");
    setTimeout(() => {
      threadEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };

  const sendAndResolve = () => {
    if (draft.trim()) send();
    store.resolve({ ticketId: ticket.id, actorId: currentUserId });
    toast.success("Ticket resolved");
  };

  const escalate = () => {
    store.escalate({
      ticketId: ticket.id,
      actorId: currentUserId,
      toUserId: "es_avery",
      reason: "Escalated from triage workstation",
    });
    toast.warning("Escalated to Escalation Specialist");
  };

  const addTag = () => {
    const tag = window.prompt("Add a tag:");
    if (tag && tag.trim())
      store.addTag({
        ticketId: ticket.id,
        actorId: currentUserId,
        tag: tag.trim(),
      });
  };

  return (
    <div className="flex flex-col h-full bg-ink-50/40 min-w-0">
      {/* Header */}
      <div className="px-4 pt-2.5 pb-2 border-b border-ink-200 bg-white shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <ChannelIcon channel={ticket.channel} className="text-ink-400" />
          <span className="font-mono text-[11px] text-ink-400 tabular-nums">
            {ticket.id}
          </span>
          <span
            className={`px-1 py-0 rounded text-[10px] font-semibold ring-1 ring-inset uppercase tracking-wider ${priorityClass[ticket.priority]}`}
          >
            {priorityLabel[ticket.priority]}
          </span>
          <StatusPill status={ticket.status} />
          {ticket.duplicateOf && (
            <span className="badge-warning">
              Duplicate of {ticket.duplicateOf}
            </span>
          )}
          {ticket.incidentId && (
            <span className="badge-brand">
              <AlertOctagon className="h-2.5 w-2.5" />
              {ticket.incidentId}
            </span>
          )}
          <span className="ml-auto text-[10.5px] text-ink-500 tabular-nums">
            FR SLA{" "}
            <span
              className={
                !ticket.firstResponseAt &&
                new Date(ticket.slaResponseDueAt).getTime() < Date.now()
                  ? "text-urgent-700 font-semibold"
                  : "text-ink-700"
              }
            >
              {compactTime(ticket.slaResponseDueAt)}
            </span>{" "}
            · Res SLA{" "}
            <span
              className={
                ticket.status !== "resolved" &&
                new Date(ticket.slaResolutionDueAt).getTime() < Date.now()
                  ? "text-urgent-700 font-semibold"
                  : "text-ink-700"
              }
            >
              {compactTime(ticket.slaResolutionDueAt)}
            </span>
          </span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 min-w-0">
          <h2 className="text-[15px] font-semibold text-ink-900 truncate">
            {ticket.subject}
          </h2>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] text-ink-500">Owner</span>
            <button
              type="button"
              onClick={() => setAssignOpen((v) => !v)}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-ink-100 relative"
            >
              {owner ? (
                <>
                  <Avatar ownerId={owner.id} size="xs" />
                  <span className="text-[11px] font-medium text-ink-800">
                    {owner.name.split(" ")[0]}
                  </span>
                </>
              ) : (
                <>
                  <User className="h-3 w-3 text-ink-400" />
                  <span className="text-[11px] text-ink-500">Unassigned</span>
                </>
              )}
              <ChevronDown className="h-3 w-3 text-ink-400" />
              {assignOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-ink-200 rounded shadow-pop z-30 py-1 text-left">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      store.assign({
                        ticketId: ticket.id,
                        actorId: currentUserId,
                        ownerId: currentUserId,
                      });
                      setAssignOpen(false);
                      toast.success("Assigned to me");
                    }}
                    className="w-full px-2 py-1 text-[11.5px] text-brand-700 font-semibold hover:bg-ink-50 text-left"
                  >
                    Assign to me
                  </button>
                  <div className="my-1 border-t border-ink-100" />
                  {team.map((tm) => (
                    <button
                      key={tm.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        store.assign({
                          ticketId: ticket.id,
                          actorId: currentUserId,
                          ownerId: tm.id,
                        });
                        setAssignOpen(false);
                        toast.success(`Assigned to ${tm.name}`);
                      }}
                      className="w-full px-2 py-1 text-[11.5px] text-ink-700 hover:bg-ink-50 text-left flex items-center gap-1.5"
                    >
                      <Avatar ownerId={tm.id} size="xs" />
                      {tm.name}
                    </button>
                  ))}
                </div>
              )}
            </button>
          </div>
        </div>
        {ticket.escalationReason && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-urgent-700 bg-urgent-50/70 ring-1 ring-urgent-500/30 rounded px-1.5 py-0.5">
            <Flame className="h-3 w-3" />
            <span>
              <span className="font-semibold">Escalated:</span>{" "}
              {ticket.escalationReason}
            </span>
          </div>
        )}
        {ticket.blockedReason && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-warning-800 bg-warning-50/70 ring-1 ring-warning-100 rounded px-1.5 py-0.5">
            <AlertOctagon className="h-3 w-3" />
            <span>
              <span className="font-semibold">Blocked:</span>{" "}
              {ticket.blockedReason}
            </span>
          </div>
        )}
        {ticket.snoozeUntil && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-ink-700 bg-ink-100 rounded px-1.5 py-0.5">
            <MoonStar className="h-3 w-3" />
            Snoozed until{" "}
            <span className="font-semibold">
              {fmtTime(ticket.snoozeUntil)}
            </span>
          </div>
        )}
      </div>

      {/* Conversation thread */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            msg={msg}
            customerName={customer?.name}
            channel={ticket.channel}
          />
        ))}
        {/* Typing indicator if customer replied recently */}
        {Date.now() - new Date(ticket.lastCustomerMessageAt).getTime() <
          5 * 60_000 && (
          <div className="text-[11px] text-ink-500 italic">
            {customer?.name?.split(" ")[0]} replied{" "}
            {relativeTime(ticket.lastCustomerMessageAt)}
          </div>
        )}
        <div ref={threadEndRef} />
      </div>

      {/* Reply composer */}
      <div className="border-t border-ink-200 bg-white px-3 pt-2 pb-2 shrink-0">
        {/* Mode toggle + macro launcher */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setInternal(false)}
              className={`px-2 py-0.5 rounded font-medium ${
                !internal
                  ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                  : "text-ink-500 hover:text-ink-800"
              }`}
            >
              Reply to{" "}
              <ChannelI className="h-3 w-3 inline -mt-0.5" />{" "}
              {channelLabel[ticket.channel]}
            </button>
            <button
              type="button"
              onClick={() => setInternal(true)}
              className={`px-2 py-0.5 rounded font-medium inline-flex items-center gap-1 ${
                internal
                  ? "bg-warning-50 text-warning-700 ring-1 ring-warning-100"
                  : "text-ink-500 hover:text-ink-800"
              }`}
            >
              <StickyNote className="h-3 w-3" />
              Internal note
            </button>
          </div>
          <div className="flex items-center gap-1 relative">
            <button
              type="button"
              onClick={() => setShowMacros((v) => !v)}
              className="btn-ghost text-[11px]"
            >
              <Wand2 className="h-3 w-3" />
              Macros
            </button>
            <button
              type="button"
              onClick={() => openAI(ticket.id)}
              className="btn-ghost text-[11px] text-brand-600"
              title="AI copilot"
            >
              <Sparkles className="h-3 w-3" />
              AI draft
            </button>
            {showMacros && (
              <div className="absolute right-0 bottom-full mb-1 w-72 bg-white border border-ink-200 rounded shadow-pop z-40 py-1 max-h-72 overflow-y-auto">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-400 border-b border-ink-100">
                  Insert a macro
                </div>
                {ticket.aiSuggestedMacroId && (
                  <div className="px-2 py-1 bg-brand-50/40 border-b border-ink-100">
                    <div className="text-[9.5px] uppercase tracking-wider font-semibold text-brand-700 inline-flex items-center gap-0.5">
                      <Sparkles className="h-2.5 w-2.5" />
                      AI suggested
                    </div>
                    {(() => {
                      const m = macros.find(
                        (x) => x.id === ticket.aiSuggestedMacroId,
                      );
                      if (!m) return null;
                      return (
                        <button
                          type="button"
                          onClick={() => insertMacro(m.id)}
                          className="w-full text-left text-[12px] font-medium text-ink-900 hover:underline"
                        >
                          {m.name}
                        </button>
                      );
                    })()}
                  </div>
                )}
                {macros
                  .filter((m) => m.id !== ticket.aiSuggestedMacroId)
                  .map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => insertMacro(m.id)}
                      className="w-full text-left px-2 py-1.5 hover:bg-ink-50 border-b border-ink-100 last:border-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11.5px] font-medium text-ink-800 truncate">
                          {m.name}
                        </span>
                        {m.shortcut && (
                          <span className="font-mono text-[10px] text-ink-400">
                            {m.shortcut}
                          </span>
                        )}
                      </div>
                      <div className="text-[10.5px] text-ink-500">
                        {m.category} · {m.uses} uses
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
        <textarea
          ref={composerRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder={
            internal
              ? "Internal note (only visible to your team)…"
              : `Reply to ${customer?.name ?? "customer"}…`
          }
          className={`w-full text-[12.5px] leading-snug rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-brand-400/40 ${
            internal
              ? "bg-warning-50/40 border border-warning-100 placeholder:text-warning-700/50"
              : "bg-white border border-ink-200"
          }`}
        />
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className="btn-ghost text-[11px]"
              title="Attach"
            >
              <Paperclip className="h-3 w-3" />
            </button>
            <span className="text-[10px] text-ink-400">
              ⌘⏎ to send
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={sendAndResolve}
              className="btn-secondary text-[11px]"
              title="Send and mark resolved"
            >
              <CheckCircle2 className="h-3 w-3" />
              Send + resolve
            </button>
            <button
              type="button"
              onClick={send}
              disabled={!draft.trim()}
              className={
                internal ? "btn-secondary text-[11px]" : "btn-primary text-[11px]"
              }
            >
              <Send className="h-3 w-3" />
              {internal ? "Post note" : "Send"}
            </button>
          </div>
        </div>

        {/* Fast actions row */}
        <div className="mt-2 pt-2 border-t border-ink-100 flex items-center gap-1 flex-wrap">
          <FastAction icon={User} label="Assign" onClick={() => setAssignOpen((v) => !v)} />
          <div className="relative">
            <FastAction
              icon={Hash}
              label={priorityLabel[ticket.priority]}
              onClick={() => setPriorityOpen((v) => !v)}
            />
            {priorityOpen && (
              <div className="absolute left-0 bottom-full mb-1 w-32 bg-white border border-ink-200 rounded shadow-pop z-30 py-1">
                {(["urgent", "high", "normal", "low"] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      store.changePriority({
                        ticketId: ticket.id,
                        actorId: currentUserId,
                        to: p,
                      });
                      setPriorityOpen(false);
                      toast.info(`Priority → ${priorityLabel[p]}`);
                    }}
                    className={`w-full text-left px-2 py-1 text-[11px] hover:bg-ink-50 ${
                      ticket.priority === p
                        ? "text-brand-700 font-semibold"
                        : "text-ink-700"
                    }`}
                  >
                    {priorityLabel[p]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <FastAction icon={TagIcon} label="Tag" onClick={addTag} />
          <FastAction
            icon={Flame}
            label="Escalate"
            tone="danger"
            onClick={escalate}
          />
          <FastAction
            icon={GitMerge}
            label="Merge"
            onClick={() => {
              if (ticket.duplicateOf) {
                store.mergeIntoParent({
                  childTicketId: ticket.id,
                  parentTicketId: ticket.duplicateOf,
                  actorId: currentUserId,
                });
                toast.success(`Merged into ${ticket.duplicateOf}`);
              } else {
                toast.info("Pick a parent ticket from the AI suggestions");
              }
            }}
          />
          <FastAction
            icon={MoonStar}
            label="Snooze 4h"
            onClick={() => {
              store.snooze({
                ticketId: ticket.id,
                actorId: currentUserId,
                minsFromNow: 240,
              });
              toast.info("Snoozed 4h");
            }}
          />
          <FastAction
            icon={ArrowRightCircle}
            label={
              ticket.status === "waiting_on_customer"
                ? "Open ticket"
                : "Wait on customer"
            }
            onClick={() => {
              const to: TicketStatus =
                ticket.status === "waiting_on_customer"
                  ? "open"
                  : "waiting_on_customer";
              store.changeStatus({
                ticketId: ticket.id,
                actorId: currentUserId,
                to,
              });
              toast.info(`Status → ${to.replace(/_/g, " ")}`);
            }}
          />
          <FastAction
            icon={CheckCircle2}
            label="Resolve"
            tone="success"
            onClick={() => {
              store.resolve({ ticketId: ticket.id, actorId: currentUserId });
              toast.success("Resolved");
            }}
          />
        </div>
      </div>
    </div>
  );
}

function FastAction({
  icon: Icon,
  label,
  onClick,
  tone,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
  tone?: "danger" | "success";
}) {
  const toneClass =
    tone === "danger"
      ? "text-urgent-700 hover:bg-urgent-50"
      : tone === "success"
        ? "text-success-700 hover:bg-success-50"
        : "text-ink-700 hover:bg-ink-100";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium ${toneClass}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

function StatusPill({ status }: { status: TicketStatus }) {
  const map: Record<TicketStatus, { label: string; cls: string }> = {
    new: {
      label: "New",
      cls: "bg-brand-50 text-brand-700 ring-brand-200",
    },
    open: {
      label: "Open",
      cls: "bg-ink-100 text-ink-700 ring-ink-200",
    },
    waiting_on_customer: {
      label: "Waiting · customer",
      cls: "bg-warning-50 text-warning-700 ring-warning-100",
    },
    waiting_on_internal: {
      label: "Waiting · internal",
      cls: "bg-warning-50 text-warning-700 ring-warning-100",
    },
    escalated: {
      label: "Escalated",
      cls: "bg-urgent-50 text-urgent-700 ring-urgent-500/30",
    },
    snoozed: {
      label: "Snoozed",
      cls: "bg-ink-100 text-ink-500 ring-ink-200",
    },
    resolved: {
      label: "Resolved",
      cls: "bg-success-50 text-success-700 ring-success-100",
    },
    closed: {
      label: "Closed",
      cls: "bg-ink-100 text-ink-500 ring-ink-200",
    },
  };
  const m = map[status];
  return (
    <span
      className={`px-1 py-0 rounded text-[10px] font-semibold ring-1 ring-inset uppercase tracking-wider ${m.cls}`}
    >
      {m.label}
    </span>
  );
}

const messageHeader: Record<MessageKind, { wrap: string; eyebrow: string }> = {
  customer_message: {
    wrap: "border-l-2 border-brand-500 bg-brand-50/30",
    eyebrow: "text-brand-700",
  },
  agent_reply: {
    wrap: "border-l-2 border-ink-300 bg-white",
    eyebrow: "text-ink-700",
  },
  internal_note: {
    wrap: "border-l-2 border-warning-500 bg-warning-50/40",
    eyebrow: "text-warning-700",
  },
  system_event: {
    wrap: "border-l-2 border-ink-200 bg-ink-50/60",
    eyebrow: "text-ink-500",
  },
  ai_suggestion: {
    wrap: "border-l-2 border-brand-400 bg-brand-50/40",
    eyebrow: "text-brand-700",
  },
};

function MessageItem({
  msg,
  customerName,
  channel,
}: {
  msg: Message;
  customerName?: string;
  channel: Channel;
}) {
  const cfg = messageHeader[msg.kind];
  if (msg.kind === "system_event") {
    return (
      <div className="text-[11px] text-ink-500 inline-flex items-center gap-1 px-2 py-1 rounded bg-ink-100 mx-auto w-fit">
        <Sparkles className="h-3 w-3 text-ink-400" />
        {msg.body} · <span className="tabular-nums">{relativeTime(msg.at)}</span>
      </div>
    );
  }
  const author =
    msg.kind === "customer_message"
      ? msg.authorName ?? customerName ?? "Customer"
      : msg.authorId
        ? teamById[msg.authorId]?.name
        : "Internal";
  const ChannelI = channelInline[msg.channel ?? channel];
  return (
    <div className={`rounded-r-md p-2.5 ${cfg.wrap}`}>
      <div className="flex items-center gap-2 mb-1">
        {msg.kind === "customer_message" ? (
          <Avatar name={author ?? "?"} size="xs" />
        ) : (
          msg.authorId && <Avatar ownerId={msg.authorId} size="xs" />
        )}
        <span className={`text-[11.5px] font-semibold ${cfg.eyebrow}`}>
          {author}
        </span>
        {msg.kind === "internal_note" && (
          <span className="text-[9.5px] uppercase tracking-wider font-bold text-warning-700 bg-warning-100 px-1 rounded">
            Internal
          </span>
        )}
        {(msg.kind === "customer_message" || msg.kind === "agent_reply") && (
          <span className="text-[10px] text-ink-400 inline-flex items-center gap-0.5">
            <ChannelI className="h-2.5 w-2.5" />
            {channelLabel[msg.channel ?? channel]}
          </span>
        )}
        {msg.sentimentAtTime && msg.kind === "customer_message" && (
          <span className="inline-flex items-center gap-0.5 text-[10px] text-ink-500">
            <span
              className={`h-1.5 w-1.5 rounded-full ${sentimentDot[msg.sentimentAtTime]}`}
            />
            {sentimentLabel[msg.sentimentAtTime]}
          </span>
        )}
        <span className="ml-auto text-[10.5px] text-ink-400 tabular-nums">
          {fmtTime(msg.at)} · {relativeTime(msg.at)}
        </span>
      </div>
      <p className="text-[12.5px] text-ink-800 whitespace-pre-wrap leading-relaxed">
        {msg.body}
      </p>
      {msg.attachments && msg.attachments.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1 flex-wrap">
          {msg.attachments.map((a) => (
            <span
              key={a.name}
              className="inline-flex items-center gap-1 text-[10.5px] text-ink-700 border border-ink-200 rounded px-1.5 py-0.5"
            >
              <Paperclip className="h-2.5 w-2.5" />
              {a.name}
              <span className="text-ink-400">· {a.size}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
