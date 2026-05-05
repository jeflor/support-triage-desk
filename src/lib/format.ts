export function relativeTime(iso: string, now: Date = new Date()): string {
  const t = new Date(iso).getTime();
  const diff = t - now.getTime();
  const abs = Math.abs(diff);
  const min = 60_000;
  const hr = 60 * min;
  const day = 24 * hr;
  const future = diff > 0;
  let text = "";
  if (abs < min) text = "now";
  else if (abs < hr) text = `${Math.round(abs / min)}m`;
  else if (abs < day) text = `${Math.round(abs / hr)}h`;
  else text = `${Math.round(abs / day)}d`;
  if (text === "now") return text;
  return future ? `in ${text}` : `${text} ago`;
}

// Compact, no "ago" — for SLA timers in the queue
export function compactTime(iso: string, now: Date = new Date()): string {
  const t = new Date(iso).getTime();
  const diff = t - now.getTime();
  const abs = Math.abs(diff);
  const min = 60_000;
  const hr = 60 * min;
  const day = 24 * hr;
  const sign = diff < 0 ? "-" : "";
  if (abs < min) return `${sign}<1m`;
  if (abs < hr) return `${sign}${Math.round(abs / min)}m`;
  if (abs < day) return `${sign}${Math.round(abs / hr)}h`;
  return `${sign}${Math.round(abs / day)}d`;
}

export function fmtTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
