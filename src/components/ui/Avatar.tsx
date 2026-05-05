import { teamById } from "../../data/team";
import { initials } from "../../lib/format";

type Props = {
  name?: string;
  ownerId?: string;
  size?: "xs" | "sm" | "md" | "lg";
  showOnline?: boolean;
};

const sizeClass = {
  xs: "h-4 w-4 text-[8px]",
  sm: "h-5 w-5 text-[9px]",
  md: "h-7 w-7 text-[11px]",
  lg: "h-9 w-9 text-[13px]",
};

export function Avatar({ name, ownerId, size = "sm", showOnline }: Props) {
  const t = ownerId ? teamById[ownerId] : undefined;
  const display = t?.name ?? name ?? "?";
  const color = t?.avatarColor ?? "#5b6379";
  const init = t?.initials ?? initials(display);
  return (
    <span className="relative inline-flex shrink-0">
      <span
        title={display}
        className={`inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0 ${sizeClass[size]}`}
        style={{ backgroundColor: color }}
      >
        {init}
      </span>
      {showOnline && t && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-white ${
            t.online ? "bg-success-500" : "bg-ink-300"
          }`}
        />
      )}
    </span>
  );
}
