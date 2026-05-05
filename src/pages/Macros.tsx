import { Wand2 } from "lucide-react";
import { macros } from "../data/macros";

export function MacrosPage() {
  const grouped: Record<string, typeof macros> = {};
  for (const m of macros) (grouped[m.category] ||= []).push(m);

  return (
    <div className="h-full overflow-y-auto bg-ink-100">
      <div className="max-w-[1100px] mx-auto px-4 py-4">
        <header className="mb-3">
          <h1 className="text-[18px] font-semibold text-ink-900 tracking-tight inline-flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-brand-600" />
            Macros
          </h1>
          <p className="text-[12px] text-ink-500 mt-0.5">
            {macros.length} macros across {Object.keys(grouped).length}{" "}
            categories. Available from the reply composer.
          </p>
        </header>
        <div className="space-y-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat} className="panel rounded-md overflow-hidden">
              <div className="px-3 py-1.5 bg-ink-50/60 border-b border-ink-100">
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-ink-500">
                  {cat}
                </span>
                <span className="ml-1 text-[10.5px] text-ink-400 tabular-nums">
                  ({items.length})
                </span>
              </div>
              <ul className="divide-y divide-ink-100">
                {items.map((m) => (
                  <li key={m.id} className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-semibold text-ink-900">
                        {m.name}
                      </span>
                      {m.shortcut && (
                        <span className="font-mono text-[10.5px] text-ink-500 bg-ink-100 px-1 rounded">
                          {m.shortcut}
                        </span>
                      )}
                      <span className="ml-auto text-[10.5px] text-ink-400 tabular-nums">
                        {m.uses} uses
                      </span>
                    </div>
                    <pre className="mt-1.5 whitespace-pre-wrap font-sans text-[11.5px] text-ink-700 leading-snug bg-ink-50/40 border border-ink-100 rounded p-2">
                      {m.body}
                    </pre>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
