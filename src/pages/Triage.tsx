import { TicketQueue } from "../components/triage/TicketQueue";
import { ActiveTicketWorkspace } from "../components/triage/ActiveTicketWorkspace";
import { ContextPanel } from "../components/triage/ContextPanel";
import { useStore } from "../state/DataStore";
import { useAppState } from "../state/AppState";
import { Activity, AlertOctagon, Flame, Sparkles } from "lucide-react";

export function TriagePage() {
  const { role } = useAppState();
  return (
    <div className="flex flex-col h-full">
      {role === "manager" && <ManagerHealthStrip />}
      <div className="flex-1 flex min-h-0">
        {/* Left: queue */}
        <div className="w-[340px] xl:w-[380px] shrink-0 hidden md:flex flex-col">
          <TicketQueue />
        </div>
        {/* Center: workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <ActiveTicketWorkspace />
        </div>
        {/* Right: context */}
        <ContextPanel />
      </div>
    </div>
  );
}

function ManagerHealthStrip() {
  const store = useStore();
  const open = store.tickets.filter(
    (t) => t.status !== "resolved" && t.status !== "closed",
  );
  const now = Date.now();
  const slaBreached = open.filter((t) => {
    const noFR = !t.firstResponseAt;
    const respDue = new Date(t.slaResponseDueAt).getTime();
    const resDue = new Date(t.slaResolutionDueAt).getTime();
    return (noFR && respDue < now) || resDue < now;
  });
  const slaPressure = open.filter((t) => {
    const noFR = !t.firstResponseAt;
    const respDue = new Date(t.slaResponseDueAt).getTime();
    const resDue = new Date(t.slaResolutionDueAt).getTime();
    const respP = noFR && respDue - now > 0 && respDue - now < 30 * 60_000;
    const resP = resDue - now > 0 && resDue - now < 60 * 60_000;
    return respP || resP;
  });
  const escalated = open.filter((t) => t.status === "escalated");
  const unassigned = open.filter((t) => !t.ownerId);
  const angryOpen = open.filter((t) => t.sentiment === "angry");

  return (
    <div className="bg-ink-900 text-white px-3 py-2 flex items-center gap-3 flex-wrap text-[11px] border-b border-ink-700">
      <span className="text-[10px] uppercase tracking-[0.12em] text-ink-400 font-semibold">
        Manager view · live queue health
      </span>
      <Stat
        icon={Activity}
        label="Open"
        value={open.length}
        tone="neutral"
      />
      <Stat
        icon={AlertOctagon}
        label="SLA breached"
        value={slaBreached.length}
        tone={slaBreached.length > 0 ? "danger" : "neutral"}
      />
      <Stat
        icon={Activity}
        label="SLA at risk"
        value={slaPressure.length}
        tone={slaPressure.length > 0 ? "warning" : "neutral"}
      />
      <Stat
        icon={Flame}
        label="Escalated"
        value={escalated.length}
        tone={escalated.length > 0 ? "warning" : "neutral"}
      />
      <Stat
        icon={Activity}
        label="Unassigned"
        value={unassigned.length}
        tone={unassigned.length > 0 ? "warning" : "neutral"}
      />
      <Stat
        icon={Activity}
        label="Angry sentiment"
        value={angryOpen.length}
        tone={angryOpen.length > 0 ? "danger" : "neutral"}
      />
      <span className="ml-auto inline-flex items-center gap-1 text-ink-300">
        <Sparkles className="h-3 w-3 text-brand-400" />
        AI: 3 tickets likely tied to INC-241 · consider grouped comms
      </span>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number;
  tone: "neutral" | "warning" | "danger";
}) {
  const cls =
    tone === "danger"
      ? "text-urgent-500"
      : tone === "warning"
        ? "text-warning-500"
        : "text-ink-300";
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className={`h-3 w-3 ${cls}`} />
      <span className="text-ink-400 uppercase tracking-wider text-[9.5px]">
        {label}
      </span>
      <span className={`font-mono tabular-nums font-semibold ${cls}`}>
        {value}
      </span>
    </span>
  );
}
