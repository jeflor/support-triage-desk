import { BookOpen, AlertOctagon } from "lucide-react";
import { incidents, knownIssues } from "../data/incidents";
import { accountsById } from "../data/accounts";
import { relativeTime } from "../lib/format";

export function KnowledgePage() {
  return (
    <div className="h-full overflow-y-auto bg-ink-100">
      <div className="max-w-[1100px] mx-auto px-4 py-4 space-y-5">
        <section>
          <h1 className="text-[18px] font-semibold text-ink-900 tracking-tight inline-flex items-center gap-2 mb-3">
            <AlertOctagon className="h-4 w-4 text-warning-600" />
            Active incidents
          </h1>
          <div className="panel rounded-md overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {incidents.map((i) => {
                const affected = (i.affectedAccountIds ?? [])
                  .map((id) => accountsById[id]?.name)
                  .filter(Boolean);
                return (
                  <li key={i.id} className="px-3 py-2.5">
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-1 h-1.5 w-1.5 rounded-full ${
                          i.status === "investigating"
                            ? "bg-urgent-500"
                            : i.status === "identified"
                              ? "bg-warning-500"
                              : i.status === "monitoring"
                                ? "bg-brand-500"
                                : "bg-success-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10.5px] text-ink-400 tabular-nums">
                            {i.id}
                          </span>
                          <span className="text-[12.5px] font-semibold text-ink-900">
                            {i.title}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-warning-700 bg-warning-50 px-1 rounded">
                            {i.status.replace(/_/g, " ")}
                          </span>
                        </div>
                        <div className="text-[11px] text-ink-500 mt-0.5">
                          {i.productArea} · started{" "}
                          {relativeTime(i.startedAt)} · owned by {i.ownerTeam}
                        </div>
                        <p className="mt-1 text-[12px] text-ink-700 leading-snug">
                          {i.summary}
                        </p>
                        {affected.length > 0 && (
                          <div className="mt-1 text-[10.5px] text-ink-500">
                            Affected: {affected.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold text-ink-900 inline-flex items-center gap-2 mb-2">
            <BookOpen className="h-3.5 w-3.5 text-brand-600" />
            Known issues
          </h2>
          <div className="panel rounded-md overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {knownIssues.map((k) => (
                <li key={k.id} className="px-3 py-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10.5px] text-ink-400">
                      {k.id}
                    </span>
                    <span className="text-[12.5px] font-semibold text-ink-900">
                      {k.title}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold px-1 rounded ${
                        k.status === "fix_shipped"
                          ? "text-success-700 bg-success-50"
                          : k.status === "fix_in_progress"
                            ? "text-brand-700 bg-brand-50"
                            : "text-warning-700 bg-warning-50"
                      }`}
                    >
                      {k.status.replace(/_/g, " ")}
                    </span>
                    {k.trackedBugId && (
                      <span className="text-[10px] font-mono text-ink-500">
                        {k.trackedBugId}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    Affects {k.affectsArea}
                  </div>
                  {k.workaround && (
                    <p className="mt-0.5 text-[11.5px] text-ink-700">
                      Workaround: {k.workaround}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
