import { Search, Bell, Sparkles, Headset, Flame, Briefcase } from "lucide-react";
import { useAppState } from "../../state/AppState";
import { Avatar } from "../ui/Avatar";
import type { Role } from "../../data/types";
import { roleLabel } from "../../data/team";

const roleIcon: Record<Role, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  agent: Headset,
  escalation: Flame,
  manager: Briefcase,
};

export function TopBar() {
  const { role, setRole, currentUser, openAI, activeTicketId } = useAppState();
  return (
    <header className="h-11 bg-white border-b border-ink-200 sticky top-0 z-30 flex items-center px-3 gap-2">
      <div className="flex items-center gap-2 mr-1">
        <span className="text-[12px] font-semibold text-ink-900 tracking-tight">
          Support Triage Desk
        </span>
        <span className="text-[10px] text-ink-400 uppercase tracking-wider hidden sm:inline">
          · Northwind
        </span>
      </div>

      {/* Live status indicator */}
      <div className="hidden md:inline-flex items-center gap-1.5 ml-1 text-[10.5px] text-ink-500">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
        </span>
        <span className="font-medium uppercase tracking-wider">live</span>
      </div>

      <div className="flex-1 max-w-md mx-2">
        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            placeholder="Search tickets, customers, accounts…"
            className="w-full pl-8 pr-12 h-7 rounded bg-ink-50 border border-ink-200 text-[12px] text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-300 focus:bg-white"
          />
          <kbd className="hidden sm:inline-flex absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] font-medium text-ink-400 border border-ink-200 rounded px-1 bg-white">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        {/* Role switcher */}
        <div className="hidden md:flex items-center bg-ink-100 p-0.5 rounded text-[11px] font-medium ring-1 ring-ink-200">
          {(["agent", "escalation", "manager"] as Role[]).map((r) => {
            const Icon = roleIcon[r];
            const active = role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                title={roleLabel[r]}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-all ${
                  active
                    ? "bg-ink-900 text-white"
                    : "text-ink-500 hover:text-ink-800"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span className="hidden lg:inline">
                  {r === "agent"
                    ? "Agent"
                    : r === "escalation"
                      ? "Escal."
                      : "Manager"}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => openAI(activeTicketId)}
          className="btn-secondary"
          title="Open AI copilot (⌘/)"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-600" />
          <span className="hidden md:inline">AI</span>
        </button>

        <button
          type="button"
          className="relative h-7 w-7 inline-flex items-center justify-center rounded hover:bg-ink-100 text-ink-600"
          aria-label="Notifications"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-urgent-500" />
        </button>

        <Avatar ownerId={currentUser?.id} size="sm" showOnline />
      </div>
    </header>
  );
}
