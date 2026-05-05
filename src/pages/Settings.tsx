import { Settings as Cog, Plug, Bell, Sparkles, Shield } from "lucide-react";
import { useAppState } from "../state/AppState";
import { Avatar } from "../components/ui/Avatar";
import { roleLabel } from "../data/team";

export function SettingsPage() {
  const { currentUser, role } = useAppState();
  return (
    <div className="h-full overflow-y-auto bg-ink-100">
      <div className="max-w-[800px] mx-auto px-4 py-4 space-y-3">
        <h1 className="text-[18px] font-semibold text-ink-900 tracking-tight inline-flex items-center gap-2">
          <Cog className="h-4 w-4 text-ink-500" />
          Settings
        </h1>

        <section className="panel rounded-md p-3">
          <div className="text-[10.5px] uppercase tracking-wider font-semibold text-ink-400 mb-1.5">
            Profile
          </div>
          <div className="flex items-center gap-2.5">
            <Avatar ownerId={currentUser?.id} size="lg" showOnline />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-ink-900">
                {currentUser?.name}
              </div>
              <div className="text-[11px] text-ink-500">
                {roleLabel[role]} · {currentUser?.email}
              </div>
            </div>
            <button className="btn-secondary">Edit</button>
          </div>
        </section>

        <section className="panel rounded-md p-3">
          <div className="text-[10.5px] uppercase tracking-wider font-semibold text-ink-400 mb-1.5">
            Notifications
          </div>
          <Toggle icon={Bell} label="Urgent ticket alerts" sub="Page me on Urgent assignment" on />
          <Toggle icon={Sparkles} label="AI suggestions" sub="Show inline AI in queue + context" on />
          <Toggle icon={Shield} label="SLA breach alerts" sub="Alert when SLA at risk" on />
        </section>

        <section className="panel rounded-md p-3">
          <div className="text-[10.5px] uppercase tracking-wider font-semibold text-ink-400 mb-1.5">
            Integrations
          </div>
          <Integration label="Gmail" status="connected" detail="Inbound channel · last sync 2m ago" />
          <Integration label="Slack" status="connected" detail="Alerts in #support-ops" />
          <Integration label="Twilio (Voice)" status="connected" detail="Inbound voice channel" />
          <Integration label="Statuspage" status="connected" detail="Auto-link tickets to incidents" />
          <Integration label="Linear" status="not_connected" detail="For engineering handoffs" />
        </section>

        <section className="panel rounded-md p-3">
          <div className="text-[10.5px] uppercase tracking-wider font-semibold text-ink-400 mb-1.5">
            Workspace
          </div>
          <div className="text-[12px] text-ink-700 space-y-0.5">
            <div>
              <span className="text-ink-500">Plan:</span> Enterprise · 12 seats
            </div>
            <div>
              <span className="text-ink-500">Workspace ID:</span>{" "}
              <span className="font-mono text-[11px]">ws_n8j4k2lq</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  icon: Icon,
  label,
  sub,
  on,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  sub: string;
  on?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 py-1.5 border-t border-ink-100 first:border-0">
      <Icon className="h-3.5 w-3.5 text-ink-500" />
      <div className="flex-1">
        <div className="text-[12px] font-medium text-ink-800">{label}</div>
        <div className="text-[11px] text-ink-500">{sub}</div>
      </div>
      <span
        className={`relative h-4 w-7 rounded-full ${on ? "bg-brand-600" : "bg-ink-200"}`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm ${on ? "left-3.5" : "left-0.5"}`}
        />
      </span>
    </div>
  );
}

function Integration({
  label,
  status,
  detail,
}: {
  label: string;
  status: "connected" | "not_connected";
  detail: string;
}) {
  return (
    <div className="flex items-center gap-2.5 py-1.5 border-t border-ink-100 first:border-0">
      <Plug
        className={`h-3.5 w-3.5 ${status === "connected" ? "text-success-600" : "text-ink-400"}`}
      />
      <div className="flex-1">
        <div className="text-[12px] font-medium text-ink-800">{label}</div>
        <div className="text-[11px] text-ink-500">{detail}</div>
      </div>
      {status === "connected" ? (
        <span className="badge-success">Connected</span>
      ) : (
        <button className="btn-secondary text-[11px]" type="button">
          Connect
        </button>
      )}
    </div>
  );
}
