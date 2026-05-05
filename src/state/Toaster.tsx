import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

type ToastTone = "success" | "info" | "warning";
type Toast = {
  id: string;
  body: string;
  tone: ToastTone;
};

type Ctx = {
  push: (input: Omit<Toast, "id">) => void;
  success: (body: string) => void;
  info: (body: string) => void;
  warning: (body: string) => void;
};

const ToastCtx = createContext<Ctx | null>(null);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback<Ctx["push"]>(
    (input) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { id, ...input }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  const value: Ctx = {
    push,
    success: (body) => push({ body, tone: "success" }),
    info: (body) => push({ body, tone: "info" }),
    warning: (body) => push({ body, tone: "warning" }),
  };

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-2 w-[300px] max-w-[calc(100vw-2rem)]">
        {toasts.map((t) => {
          const Icon =
            t.tone === "success"
              ? CheckCircle2
              : t.tone === "warning"
                ? AlertTriangle
                : Info;
          const ring =
            t.tone === "success"
              ? "ring-success-200"
              : t.tone === "warning"
                ? "ring-warning-200"
                : "ring-ink-200";
          const iconColor =
            t.tone === "success"
              ? "text-success-600"
              : t.tone === "warning"
                ? "text-warning-600"
                : "text-brand-600";
          return (
            <div
              key={t.id}
              className={`pointer-events-auto bg-white border border-ink-200 ring-1 ${ring} shadow-pop rounded-md px-2.5 py-2 flex items-start gap-2`}
            >
              <Icon className={`h-3.5 w-3.5 mt-0.5 ${iconColor}`} />
              <div className="flex-1 text-[12px] text-ink-800">{t.body}</div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="text-ink-400 hover:text-ink-700"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside ToasterProvider");
  return ctx;
}
