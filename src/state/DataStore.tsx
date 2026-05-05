import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type {
  Ticket,
  Message,
  TicketStatus,
  Priority,
  AuditEvent,
} from "../data/types";
import { tickets as seedTickets, messages as seedMessages } from "../data/tickets";

let nextId = 9000;
const newId = (prefix: string) => `${prefix}-${++nextId}`;

type StoreValue = {
  tickets: Ticket[];
  ticketById: (id: string) => Ticket | undefined;
  messages: Message[];
  messagesByTicket: (ticketId: string) => Message[];
  audit: AuditEvent[];

  // Actions
  sendReply: (input: {
    ticketId: string;
    actorId: string;
    body: string;
    internal?: boolean;
  }) => void;
  changeStatus: (input: {
    ticketId: string;
    actorId: string;
    to: TicketStatus;
  }) => void;
  changePriority: (input: {
    ticketId: string;
    actorId: string;
    to: Priority;
  }) => void;
  assign: (input: {
    ticketId: string;
    actorId: string;
    ownerId: string | null;
  }) => void;
  escalate: (input: {
    ticketId: string;
    actorId: string;
    toUserId: string;
    reason?: string;
  }) => void;
  addTag: (input: { ticketId: string; actorId: string; tag: string }) => void;
  removeTag: (input: { ticketId: string; actorId: string; tag: string }) => void;
  snooze: (input: {
    ticketId: string;
    actorId: string;
    minsFromNow: number;
  }) => void;
  resolve: (input: { ticketId: string; actorId: string }) => void;
  markRead: (ticketId: string) => void;
  mergeIntoParent: (input: {
    childTicketId: string;
    parentTicketId: string;
    actorId: string;
  }) => void;
};

const Ctx = createContext<StoreValue | null>(null);

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(() => [...seedTickets]);
  const [messages, setMessages] = useState<Message[]>(() => [...seedMessages]);
  const [audit, setAudit] = useState<AuditEvent[]>([]);

  const recordAudit = useCallback(
    (actor: string, action: string, ticketId?: string) => {
      setAudit((prev) => [
        {
          id: newId("au"),
          at: new Date().toISOString(),
          actor,
          action,
          ticketId,
        },
        ...prev,
      ]);
    },
    [],
  );

  const updateTicket = useCallback(
    (ticketId: string, patch: (t: Ticket) => Ticket) => {
      setTickets((prev) => prev.map((t) => (t.id === ticketId ? patch(t) : t)));
    },
    [],
  );

  const addMessage = useCallback((msg: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { id: newId("msg"), ...msg }]);
  }, []);

  const sendReply: StoreValue["sendReply"] = useCallback(
    ({ ticketId, actorId, body, internal }) => {
      const at = new Date().toISOString();
      addMessage({
        ticketId,
        kind: internal ? "internal_note" : "agent_reply",
        authorId: actorId,
        body,
        at,
        visibleToCustomer: !internal,
      });
      if (!internal) {
        updateTicket(ticketId, (t) => ({
          ...t,
          lastAgentReplyAt: at,
          firstResponseAt: t.firstResponseAt ?? at,
          status: t.status === "new" ? "open" : t.status,
          unread: false,
        }));
      }
      recordAudit(
        actorId,
        internal ? "Posted internal note" : "Replied to customer",
        ticketId,
      );
    },
    [addMessage, updateTicket, recordAudit],
  );

  const changeStatus: StoreValue["changeStatus"] = useCallback(
    ({ ticketId, actorId, to }) => {
      updateTicket(ticketId, (t) => ({ ...t, status: to }));
      addMessage({
        ticketId,
        kind: "system_event",
        body: `Status → ${to.replace(/_/g, " ")}`,
        at: new Date().toISOString(),
        authorId: actorId,
      });
      recordAudit(actorId, `Status → ${to}`, ticketId);
    },
    [updateTicket, addMessage, recordAudit],
  );

  const changePriority: StoreValue["changePriority"] = useCallback(
    ({ ticketId, actorId, to }) => {
      updateTicket(ticketId, (t) => ({ ...t, priority: to }));
      recordAudit(actorId, `Priority → ${to}`, ticketId);
    },
    [updateTicket, recordAudit],
  );

  const assign: StoreValue["assign"] = useCallback(
    ({ ticketId, actorId, ownerId }) => {
      updateTicket(ticketId, (t) => ({
        ...t,
        ownerId: ownerId ?? undefined,
      }));
      recordAudit(
        actorId,
        ownerId ? `Assigned to ${ownerId}` : "Unassigned",
        ticketId,
      );
    },
    [updateTicket, recordAudit],
  );

  const escalate: StoreValue["escalate"] = useCallback(
    ({ ticketId, actorId, toUserId, reason }) => {
      const at = new Date().toISOString();
      updateTicket(ticketId, (t) => ({
        ...t,
        status: "escalated",
        escalatedAt: at,
        escalatedTo: toUserId,
        escalationReason: reason ?? t.escalationReason,
        ownerId: toUserId,
      }));
      addMessage({
        ticketId,
        kind: "system_event",
        body: `Escalated to ${toUserId}${reason ? ` · ${reason}` : ""}`,
        at,
        authorId: actorId,
      });
      recordAudit(actorId, `Escalated to ${toUserId}`, ticketId);
    },
    [updateTicket, addMessage, recordAudit],
  );

  const addTag: StoreValue["addTag"] = useCallback(
    ({ ticketId, actorId, tag }) => {
      updateTicket(ticketId, (t) =>
        t.tags.includes(tag) ? t : { ...t, tags: [...t.tags, tag] },
      );
      recordAudit(actorId, `Tag +${tag}`, ticketId);
    },
    [updateTicket, recordAudit],
  );

  const removeTag: StoreValue["removeTag"] = useCallback(
    ({ ticketId, actorId, tag }) => {
      updateTicket(ticketId, (t) => ({
        ...t,
        tags: t.tags.filter((x) => x !== tag),
      }));
      recordAudit(actorId, `Tag −${tag}`, ticketId);
    },
    [updateTicket, recordAudit],
  );

  const snooze: StoreValue["snooze"] = useCallback(
    ({ ticketId, actorId, minsFromNow }) => {
      const until = new Date(Date.now() + minsFromNow * 60_000).toISOString();
      updateTicket(ticketId, (t) => ({
        ...t,
        status: "snoozed",
        snoozeUntil: until,
      }));
      recordAudit(actorId, `Snoozed ${minsFromNow}m`, ticketId);
    },
    [updateTicket, recordAudit],
  );

  const resolve: StoreValue["resolve"] = useCallback(
    ({ ticketId, actorId }) => {
      updateTicket(ticketId, (t) => ({ ...t, status: "resolved" }));
      addMessage({
        ticketId,
        kind: "system_event",
        body: "Ticket resolved",
        at: new Date().toISOString(),
        authorId: actorId,
      });
      recordAudit(actorId, "Resolved", ticketId);
    },
    [updateTicket, addMessage, recordAudit],
  );

  const markRead: StoreValue["markRead"] = useCallback(
    (ticketId) => {
      updateTicket(ticketId, (t) =>
        t.unread === false ? t : { ...t, unread: false },
      );
    },
    [updateTicket],
  );

  const mergeIntoParent: StoreValue["mergeIntoParent"] = useCallback(
    ({ childTicketId, parentTicketId, actorId }) => {
      updateTicket(childTicketId, (t) => ({
        ...t,
        status: "closed",
        duplicateOf: parentTicketId,
      }));
      updateTicket(parentTicketId, (t) => ({
        ...t,
        relatedTicketIds: [
          ...new Set([...(t.relatedTicketIds ?? []), childTicketId]),
        ],
      }));
      recordAudit(actorId, `Merged ${childTicketId} → ${parentTicketId}`);
    },
    [updateTicket, recordAudit],
  );

  const ticketById = useCallback(
    (id: string) => tickets.find((t) => t.id === id),
    [tickets],
  );

  const messagesByTicketFn = useCallback(
    (ticketId: string) =>
      messages
        .filter((m) => m.ticketId === ticketId)
        .sort((a, b) => (a.at < b.at ? -1 : 1)),
    [messages],
  );

  const value = useMemo<StoreValue>(
    () => ({
      tickets,
      ticketById,
      messages,
      messagesByTicket: messagesByTicketFn,
      audit,
      sendReply,
      changeStatus,
      changePriority,
      assign,
      escalate,
      addTag,
      removeTag,
      snooze,
      resolve,
      markRead,
      mergeIntoParent,
    }),
    [
      tickets,
      ticketById,
      messages,
      messagesByTicketFn,
      audit,
      sendReply,
      changeStatus,
      changePriority,
      assign,
      escalate,
      addTag,
      removeTag,
      snooze,
      resolve,
      markRead,
      mergeIntoParent,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside DataStoreProvider");
  return ctx;
}
