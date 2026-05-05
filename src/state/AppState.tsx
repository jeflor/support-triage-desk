import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { defaultUserId, teamById } from "../data/team";
import type { Role } from "../data/types";

export type QueueTab =
  | "all"
  | "unassigned"
  | "mine"
  | "urgent"
  | "escalated"
  | "waiting_customer"
  | "sla_risk"
  | "resolved";

type AIState = {
  open: boolean;
  contextTicketId: string | null;
};

type AppStateValue = {
  role: Role;
  setRole: (r: Role) => void;
  currentUserId: string;
  currentUser: ReturnType<typeof getUser>;
  // Selected ticket
  activeTicketId: string | null;
  setActiveTicketId: (id: string | null) => void;
  // Queue tab
  activeTab: QueueTab;
  setActiveTab: (t: QueueTab) => void;
  // Channel filter
  channelFilter: string | "all";
  setChannelFilter: (c: string | "all") => void;
  // AI panel
  ai: AIState;
  openAI: (ticketId?: string | null) => void;
  closeAI: () => void;
};

function getUser(role: Role) {
  return teamById[defaultUserId[role]];
}

const Ctx = createContext<AppStateValue | null>(null);

const defaultTabForRole: Record<Role, QueueTab> = {
  agent: "all",
  escalation: "escalated",
  manager: "sla_risk",
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("agent");
  const [activeTicketId, setActiveTicketId] = useState<string | null>(
    "T-4823",
  );
  const [activeTab, setActiveTab] = useState<QueueTab>("all");
  const [channelFilter, setChannelFilter] = useState<string | "all">("all");
  const [ai, setAI] = useState<AIState>({
    open: false,
    contextTicketId: null,
  });

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    setActiveTab(defaultTabForRole[r]);
  }, []);

  const openAI = useCallback(
    (ticketId: string | null = null) =>
      setAI({ open: true, contextTicketId: ticketId }),
    [],
  );
  const closeAI = useCallback(() => setAI((s) => ({ ...s, open: false })), []);

  // ⌘K focuses search (no-op for now), ⌘/ opens AI on the active ticket
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setAI({ open: true, contextTicketId: activeTicketId });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTicketId]);

  const currentUserId = defaultUserId[role];
  const value = useMemo<AppStateValue>(
    () => ({
      role,
      setRole,
      currentUserId,
      currentUser: getUser(role),
      activeTicketId,
      setActiveTicketId,
      activeTab,
      setActiveTab,
      channelFilter,
      setChannelFilter,
      ai,
      openAI,
      closeAI,
    }),
    [
      role,
      setRole,
      currentUserId,
      activeTicketId,
      activeTab,
      channelFilter,
      ai,
      openAI,
      closeAI,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
