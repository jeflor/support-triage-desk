import type { Account, Customer } from "./types";

export const accounts: Account[] = [
  {
    id: "A-1001",
    name: "Helix Robotics",
    tier: "Enterprise",
    mrr: 7000,
    tenureMonths: 14,
    healthScore: 71,
    industry: "Industrial Automation",
    notes:
      "Multi-site enterprise. Procurement is ruthless on SLAs — never let a P1 slip without comms.",
  },
  {
    id: "A-1002",
    name: "Brightlane Health",
    tier: "Enterprise",
    mrr: 5200,
    tenureMonths: 6,
    healthScore: 64,
    industry: "Healthcare SaaS",
    recentInvoiceFailure: true,
    notes:
      "HIPAA-sensitive. CISO Daniel Ortiz is responsive. Billing PO split mess unresolved (split CX/IT).",
  },
  {
    id: "A-1003",
    name: "Aldridge Manufacturing",
    tier: "Enterprise",
    mrr: 10700,
    tenureMonths: 9,
    healthScore: 41,
    industry: "Manufacturing",
    churnRisk: true,
    notes:
      "At-risk. Sponsor (Theo Hartmann) is quiet. CSM (Inés) is watching closely.",
  },
  {
    id: "A-1004",
    name: "Lumen & Co.",
    tier: "Growth",
    mrr: 3200,
    tenureMonths: 8,
    healthScore: 88,
    industry: "Consumer Brands",
    expansionLikely: true,
  },
  {
    id: "A-1005",
    name: "Pacific Ridge Logistics",
    tier: "Enterprise",
    mrr: 6000,
    tenureMonths: 5,
    healthScore: 58,
    industry: "Logistics",
    notes: "Post-launch — adoption ramping. Owen is patient but vocal.",
  },
  {
    id: "A-1006",
    name: "Cypress Foods",
    tier: "Enterprise",
    mrr: 5300,
    tenureMonths: 7,
    healthScore: 82,
    industry: "Food & Beverage",
  },
  {
    id: "A-1007",
    name: "Riverstone Realty",
    tier: "Starter",
    mrr: 320,
    tenureMonths: 3,
    healthScore: 76,
    industry: "Real Estate",
  },
  {
    id: "A-1008",
    name: "Solene Beauty",
    tier: "Starter",
    mrr: 480,
    tenureMonths: 4,
    healthScore: 79,
    industry: "Consumer Brands",
    expansionLikely: true,
  },
  {
    id: "A-1009",
    name: "Vega Insurance",
    tier: "Enterprise",
    mrr: 16300,
    tenureMonths: 22,
    healthScore: 73,
    industry: "Insurance",
    notes: "Largest account in portfolio. Always treat as VIP.",
  },
  {
    id: "A-1010",
    name: "Granite Peak Outfitters",
    tier: "Starter",
    mrr: 290,
    tenureMonths: 1,
    healthScore: 70,
    industry: "Retail",
  },
  {
    id: "A-1011",
    name: "Cobalt Cloud",
    tier: "Growth",
    mrr: 2400,
    tenureMonths: 12,
    healthScore: 52,
    industry: "B2B SaaS",
    notes: "Technical buyer. Will dig into API behavior themselves.",
  },
  {
    id: "A-1012",
    name: "Mariner Travel",
    tier: "Free",
    mrr: 0,
    tenureMonths: 2,
    healthScore: 38,
    industry: "Travel & Hospitality",
    churnRisk: true,
    notes: "Free trial, low engagement. Likely to churn.",
  },
];

export const accountsById = Object.fromEntries(accounts.map((a) => [a.id, a]));

export const customers: Customer[] = [
  // Helix
  {
    id: "C-001",
    name: "Avery Bloomfield",
    email: "abloomfield@helixrobotics.com",
    title: "VP, Revenue Operations",
    accountId: "A-1001",
    timezone: "America/Los_Angeles",
    preferredChannel: "email",
    vip: true,
  },
  {
    id: "C-002",
    name: "Jamie Cho",
    email: "jcho@helixrobotics.com",
    title: "IT Director",
    accountId: "A-1001",
    timezone: "America/Los_Angeles",
    preferredChannel: "email",
  },
  // Brightlane
  {
    id: "C-003",
    name: "Renée Okafor",
    email: "renee.okafor@brightlanehealth.com",
    title: "Director of Sales Enablement",
    accountId: "A-1002",
    timezone: "America/Chicago",
    preferredChannel: "email",
  },
  {
    id: "C-004",
    name: "Daniel Ortiz",
    email: "dortiz@brightlanehealth.com",
    title: "CISO",
    accountId: "A-1002",
    vip: true,
  },
  // Aldridge
  {
    id: "C-005",
    name: "Theo Hartmann",
    email: "thartmann@aldridge.co",
    title: "COO",
    accountId: "A-1003",
    vip: true,
  },
  {
    id: "C-006",
    name: "Sarah Liu",
    email: "sliu@aldridge.co",
    title: "Executive Assistant to COO",
    accountId: "A-1003",
  },
  // Lumen
  {
    id: "C-007",
    name: "Sasha Berger",
    email: "sasha.berger@lumenandco.com",
    title: "VP Marketing",
    accountId: "A-1004",
    vip: true,
  },
  {
    id: "C-008",
    name: "Iris Mendez",
    email: "iris.mendez@lumenandco.com",
    title: "CMO",
    accountId: "A-1004",
    vip: true,
  },
  // Pacific Ridge
  {
    id: "C-009",
    name: "Owen Caldwell",
    email: "ocaldwell@pacificridge.io",
    title: "Director of Business Development",
    accountId: "A-1005",
  },
  // Cypress
  {
    id: "C-010",
    name: "Lila Marchetti",
    email: "lila@cypressfoods.com",
    title: "VP Operations",
    accountId: "A-1006",
  },
  // Riverstone
  {
    id: "C-011",
    name: "Eitan Halevi",
    email: "eitan@riverstonerealty.com",
    title: "Founder",
    accountId: "A-1007",
  },
  // Solene
  {
    id: "C-012",
    name: "Yuki Tanaka",
    email: "yuki@solenebeauty.com",
    title: "Head of CX",
    accountId: "A-1008",
  },
  // Vega
  {
    id: "C-013",
    name: "Cameron Liu",
    email: "cliu@vegainsurance.com",
    title: "Chief of Staff",
    accountId: "A-1009",
    vip: true,
  },
  {
    id: "C-014",
    name: "Nadia Costa",
    email: "ncosta@vegainsurance.com",
    title: "VP Operations",
    accountId: "A-1009",
  },
  // Granite Peak
  {
    id: "C-015",
    name: "Carter Yates",
    email: "carter@granitepeak.com",
    title: "Director, Operations",
    accountId: "A-1010",
  },
  // Cobalt Cloud
  {
    id: "C-016",
    name: "Elena Petrova",
    email: "epetrova@cobaltcloud.io",
    title: "VP Engineering",
    accountId: "A-1011",
  },
  // Mariner
  {
    id: "C-017",
    name: "Faisal Rahman",
    email: "frahman@marinertravel.com",
    title: "Director, RevOps",
    accountId: "A-1012",
  },
];

export const customersById = Object.fromEntries(
  customers.map((c) => [c.id, c]),
);
