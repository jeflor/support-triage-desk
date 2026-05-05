import type { TeamMember, Role } from "./types";

export const team: TeamMember[] = [
  // Agents
  {
    id: "ag_morgan",
    name: "Morgan Reyes",
    initials: "MR",
    email: "morgan.reyes@northwind.io",
    role: "agent",
    title: "Senior Support Agent",
    avatarColor: "#4f46e5",
    online: true,
  },
  {
    id: "ag_priya",
    name: "Priya Shankar",
    initials: "PS",
    email: "priya.shankar@northwind.io",
    role: "agent",
    title: "Support Agent",
    avatarColor: "#10b981",
    online: true,
  },
  {
    id: "ag_dante",
    name: "Dante Russo",
    initials: "DR",
    email: "dante.russo@northwind.io",
    role: "agent",
    title: "Support Agent",
    avatarColor: "#f59e0b",
    online: false,
  },
  {
    id: "ag_yuki",
    name: "Yuki Tanaka",
    initials: "YT",
    email: "yuki.tanaka@northwind.io",
    role: "agent",
    title: "Support Agent",
    avatarColor: "#0ea5e9",
    online: true,
  },
  // Escalation specialists
  {
    id: "es_avery",
    name: "Avery Sinclair",
    initials: "AS",
    email: "avery.sinclair@northwind.io",
    role: "escalation",
    title: "Escalation Specialist",
    avatarColor: "#7c3aed",
    online: true,
  },
  {
    id: "es_kenji",
    name: "Kenji Park",
    initials: "KP",
    email: "kenji.park@northwind.io",
    role: "escalation",
    title: "Senior Escalation Specialist",
    avatarColor: "#8b5cf6",
    online: true,
  },
  // Manager
  {
    id: "mg_sloane",
    name: "Sloane Whitaker",
    initials: "SW",
    email: "sloane.whitaker@northwind.io",
    role: "manager",
    title: "Support Manager",
    avatarColor: "#0e1322",
    online: true,
  },
];

export const teamById = Object.fromEntries(team.map((t) => [t.id, t]));

export const defaultUserId: Record<Role, string> = {
  agent: "ag_morgan",
  escalation: "es_avery",
  manager: "mg_sloane",
};

export const roleLabel: Record<Role, string> = {
  agent: "Support Agent",
  escalation: "Escalation Specialist",
  manager: "Support Manager",
};
