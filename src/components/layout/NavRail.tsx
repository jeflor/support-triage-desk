import { NavLink, Link } from "react-router-dom";
import {
  Inbox,
  Flame,
  BookOpen,
  Wand2,
  Users2,
  Settings,
  ArrowLeft,
} from "lucide-react";

const items = [
  { to: "/triage", label: "Triage", icon: Inbox },
  { to: "/escalations", label: "Escalations", icon: Flame },
  { to: "/macros", label: "Macros", icon: Wand2 },
  { to: "/knowledge", label: "Knowledge", icon: BookOpen },
  { to: "/team", label: "Team", icon: Users2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function NavRail() {
  return (
    <nav className="w-12 shrink-0 hidden md:flex flex-col items-center bg-ink-900 border-r border-ink-200 py-2 gap-1">
      {/* Logo — links back to landing */}
      <Link
        to="/"
        className="h-9 w-9 rounded-md bg-brand-600 flex items-center justify-center mb-1 hover:bg-brand-500 transition-colors"
        title="Back to landing"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <path
            d="M7 9h14a2 2 0 012 2v9a2 2 0 01-2 2h-7l-4 3v-3H7a2 2 0 01-2-2v-9a2 2 0 012-2z"
            fill="#fff"
          />
        </svg>
      </Link>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          title={label}
          className={({ isActive }) =>
            isActive ? "rail-item-active" : "rail-item"
          }
        >
          <Icon className="h-4 w-4" />
        </NavLink>
      ))}
      <div className="mt-auto">
        <Link to="/" className="rail-item" title="Back to landing">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}
