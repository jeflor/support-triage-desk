import { useStore } from "../state/DataStore";
import { team, roleLabel } from "../data/team";
import { Avatar } from "../components/ui/Avatar";
import { Users2 } from "lucide-react";

export function TeamPage() {
  const store = useStore();

  const loadFor = (memberId: string) => {
    const open = store.tickets.filter(
      (t) =>
        t.ownerId === memberId &&
        t.status !== "resolved" &&
        t.status !== "closed",
    );
    return {
      open: open.length,
      urgent: open.filter((t) => t.priority === "urgent").length,
      escalated: open.filter((t) => t.status === "escalated").length,
      unread: open.filter((t) => t.unread).length,
    };
  };

  return (
    <div className="h-full overflow-y-auto bg-ink-100">
      <div className="max-w-[1100px] mx-auto px-4 py-4">
        <h1 className="text-[18px] font-semibold text-ink-900 tracking-tight inline-flex items-center gap-2 mb-3">
          <Users2 className="h-4 w-4 text-brand-600" />
          Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {team.map((m) => {
            const load = loadFor(m.id);
            return (
              <div
                key={m.id}
                className="panel rounded-md p-3"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar ownerId={m.id} size="lg" showOnline />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-ink-900">
                      {m.name}
                    </div>
                    <div className="text-[11px] text-ink-500">
                      {roleLabel[m.role]} · {m.title}
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 grid grid-cols-4 gap-1 text-center">
                  <Mini label="Open" value={load.open} />
                  <Mini
                    label="Urgent"
                    value={load.urgent}
                    tone={load.urgent > 0 ? "warning" : "neutral"}
                  />
                  <Mini
                    label="Esc"
                    value={load.escalated}
                    tone={load.escalated > 0 ? "danger" : "neutral"}
                  />
                  <Mini
                    label="Unread"
                    value={load.unread}
                    tone={load.unread > 0 ? "brand" : "neutral"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Mini({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "warning" | "danger" | "brand";
}) {
  const cls =
    tone === "danger"
      ? "text-urgent-700 bg-urgent-50"
      : tone === "warning"
        ? "text-warning-700 bg-warning-50"
        : tone === "brand"
          ? "text-brand-700 bg-brand-50"
          : "text-ink-700 bg-ink-50";
  return (
    <div className={`rounded p-1 ${cls}`}>
      <div className="text-[9px] uppercase tracking-wider font-semibold text-ink-400">
        {label}
      </div>
      <div className="text-[13px] font-semibold tabular-nums">{value}</div>
    </div>
  );
}
