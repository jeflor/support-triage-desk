import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Crown,
  History,
  Sparkles,
  Inbox,
  Timer,
  GitBranch,
  Layers,
  Activity,
  Mail,
  MessageCircle,
  AtSign,
  AlertOctagon,
  Wand2,
} from "lucide-react";

export function LandingPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductPreview />
      <WhatChanges />
      <SafetySection />
      <Integrations />
      <ClosingCTA />
    </>
  );
}

/* =================== HERO =================== */

function Hero() {
  return (
    <section className="border-b border-ink-200 bg-gradient-to-b from-white to-ink-50/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold text-brand-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            For SaaS support teams
          </div>
          <h1 className="text-[34px] sm:text-[42px] font-semibold text-ink-900 leading-[1.1] tracking-tight">
            Cut support handling time before an agent touches the queue.
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-ink-600 leading-relaxed max-w-2xl">
            Support Triage Desk pre-triages every inbound ticket — routes it to
            the right owner, assigns priority, drafts a reply, and flags what
            needs a human. Your team opens the queue to clean context, not
            chaos.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Link
              to="/triage"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 text-[13px] font-medium"
            >
              See it triage a ticket
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 rounded-md bg-white text-ink-700 border border-ink-200 hover:bg-ink-50 px-3.5 py-2 text-[13px] font-medium"
            >
              How it works
            </a>
          </div>
          <p className="mt-3 text-[11.5px] text-ink-500">
            Live demo · 19 realistic tickets across 5 channels · no signup
          </p>
        </div>

        {/* Hero outcome strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          <Outcome num="60%" label="Tier-1 tickets resolved without an agent reply" />
          <Outcome num="8 min" label="Median first response time, down from 4h" />
          <Outcome num="–35%" label="Misrouted conversations after first month" />
          <Outcome num="100%" label="Tickets graded with confidence + audit log" />
        </div>
      </div>
    </section>
  );
}

function Outcome({ num, label }: { num: string; label: string }) {
  return (
    <div className="border-l-2 border-brand-500 pl-3">
      <div className="font-mono text-[24px] font-semibold text-ink-900 tabular-nums leading-none tracking-tight">
        {num}
      </div>
      <div className="mt-1 text-[11.5px] text-ink-500 leading-snug">
        {label}
      </div>
    </div>
  );
}

/* =================== TRUST STRIP =================== */

function TrustStrip() {
  return (
    <section className="border-b border-ink-200 bg-ink-900 text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-brand-300 mb-2">
          AI handles first-pass triage. Your team stays in control.
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Trust
            icon={ShieldCheck}
            title="Confidence scoring"
            body="Every routing, priority, and draft carries a confidence score. Below your threshold = surfaced for human review."
          />
          <Trust
            icon={UserCheck}
            title="Human review by default"
            body="No reply ever sends without an agent click. AI prepares; humans send. Configurable per channel and tier."
          />
          <Trust
            icon={Crown}
            title="Escalation rules"
            body="VIPs, churn-risk accounts, billing disputes, and angry sentiment are routed straight to a human, never auto-replied."
          />
          <Trust
            icon={History}
            title="Full audit trail"
            body="Every AI action — classification, routing, draft, suggestion — is logged with reasoning. Reviewable per ticket."
          />
        </div>
      </div>
    </section>
  );
}

function Trust({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3.5 w-3.5 text-brand-300" />
        <span className="text-[12.5px] font-semibold text-white">{title}</span>
      </div>
      <p className="text-[11.5px] text-ink-300 leading-snug">{body}</p>
    </div>
  );
}

/* =================== PRODUCT PREVIEW =================== */

function ProductPreview() {
  return (
    <section
      id="how-it-works"
      className="border-b border-ink-200 bg-ink-50/40"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mb-8">
          <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-500 mb-2">
            How it works · the operator surface
          </div>
          <h2 className="text-[26px] font-semibold text-ink-900 tracking-tight leading-tight">
            AI recommends. The agent stays in control.
          </h2>
          <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
            By the time a support agent opens a ticket, it's already routed,
            prioritized, scored for confidence, drafted, and either marked
            safe-to-send or flagged for human attention.
          </p>
        </div>

        {/* Annotated mock workstation */}
        <div className="border border-ink-200 rounded-lg overflow-hidden bg-white shadow-pop relative">
          {/* Fake top bar */}
          <div className="h-7 border-b border-ink-200 bg-ink-50 flex items-center px-2 gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-200" />
            <span className="h-2 w-2 rounded-full bg-ink-200" />
            <span className="h-2 w-2 rounded-full bg-ink-200" />
            <span className="ml-2 text-[10.5px] text-ink-400 tabular-nums">
              support-triage-desk · operator desk
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
              Live
            </span>
          </div>
          <MockWorkstation />
        </div>

        {/* Caption */}
        <div className="mt-3 text-[11.5px] text-ink-500 italic max-w-2xl">
          Live preview of the operator workstation. The numbered annotations
          show where AI prepares the work and where humans stay in control.
        </div>
      </div>
    </section>
  );
}

function MockWorkstation() {
  return (
    <div className="grid grid-cols-12 min-h-[420px]">
      {/* Left: queue */}
      <div className="col-span-4 border-r border-ink-200 bg-white">
        <div className="px-2.5 py-2 border-b border-ink-200">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-ink-500 mb-1.5">
            Queue · 14 open
          </div>
          <div className="flex flex-wrap gap-1">
            {["All", "Urgent", "SLA risk", "Escalated"].map((t, i) => (
              <span
                key={t}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  i === 0
                    ? "bg-ink-900 text-white"
                    : "bg-ink-100 text-ink-600"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        {/* Queue rows */}
        <ul className="text-[11px]">
          <QueueRow
            id="T-4823"
            chan={Mail}
            prio="URGENT"
            prioCls="bg-urgent-50 text-urgent-700 ring-urgent-500/30"
            sentiment="bg-urgent-500"
            subject="Production data NOT loading — third time this month"
            who="Avery Bloomfield · Helix Robotics · ENT"
            sla="-12m"
            slaCls="text-urgent-700"
            highlighted
            annotation="1"
            unread
          />
          <QueueRow
            id="T-4825"
            chan={Mail}
            prio="HIGH"
            prioCls="bg-warning-50 text-warning-700 ring-warning-100"
            sentiment="bg-warning-500"
            subject="Re: Past due invoice notice — we paid this on Apr 14"
            who="Renée Okafor · Brightlane Health · ENT"
            sla="2h"
            slaCls="text-ink-500"
          />
          <QueueRow
            id="T-4830"
            chan={MessageCircle}
            prio="NORMAL"
            prioCls="bg-ink-100 text-ink-600 ring-ink-200"
            sentiment="bg-ink-300"
            subject="Mobile app crashes when uploading photos > 8MB"
            who="Sasha Berger · Lumen & Co."
            sla="3h"
            slaCls="text-ink-500"
            annotation="2"
          />
          <QueueRow
            id="T-4843"
            chan={Mail}
            prio="NORMAL"
            prioCls="bg-ink-100 text-ink-600 ring-ink-200"
            sentiment="bg-ink-300"
            subject="Can't access my account"
            who="Carter Yates · Granite Peak"
            sla="22h"
            slaCls="text-ink-500"
          />
          <QueueRow
            id="T-4834"
            chan={AtSign}
            prio="HIGH"
            prioCls="bg-warning-50 text-warning-700 ring-warning-100"
            sentiment="bg-warning-500"
            subject="Problème de connexion - SAML / SSO"
            who="Cameron Liu · Vega Insurance · ENT"
            sla="38m"
            slaCls="text-warning-700"
          />
        </ul>
      </div>

      {/* Center: workspace */}
      <div className="col-span-5 border-r border-ink-200 bg-ink-50/30 flex flex-col">
        <div className="px-3 py-2 border-b border-ink-200 bg-white">
          <div className="flex items-center gap-1.5 text-[10.5px]">
            <Mail className="h-3 w-3 text-ink-400" />
            <span className="font-mono text-ink-400 tabular-nums">T-4823</span>
            <span className="px-1 rounded text-[9.5px] font-semibold ring-1 ring-inset uppercase tracking-wider bg-urgent-50 text-urgent-700 ring-urgent-500/30">
              Urgent
            </span>
            <span className="px-1 rounded text-[9.5px] font-semibold ring-1 ring-inset uppercase tracking-wider bg-ink-100 text-ink-700 ring-ink-200">
              Open
            </span>
            <span className="px-1 rounded text-[9.5px] font-semibold ring-1 ring-inset uppercase tracking-wider bg-brand-50 text-brand-700 ring-brand-200 inline-flex items-center gap-0.5">
              <AlertOctagon className="h-2.5 w-2.5" />
              INC-241
            </span>
            <span className="ml-auto text-[10px] text-ink-500 tabular-nums">
              FR SLA{" "}
              <span className="text-urgent-700 font-semibold">-12m</span>
            </span>
          </div>
          <div className="mt-1 text-[13.5px] font-semibold text-ink-900">
            Production data NOT loading — third time this month
          </div>
        </div>

        {/* AI banner — annotation 3 */}
        <div className="relative px-3 py-2 border-b border-ink-200 bg-gradient-to-br from-brand-50/60 to-white">
          <Pin n="3" position="left" />
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="h-3 w-3 text-brand-700" />
            <span className="text-[9.5px] uppercase tracking-wider font-semibold text-brand-700">
              AI pre-triage · 0.92 confidence
            </span>
          </div>
          <ul className="text-[11.5px] text-ink-800 space-y-0.5">
            <li>
              <strong>Routed to:</strong> Morgan Reyes (handled 3 prior Helix
              incidents)
            </li>
            <li>
              <strong>Priority:</strong> Urgent (Enterprise + sentiment
              escalation + SLA pressure)
            </li>
            <li>
              <strong>Linked to incident:</strong> INC-241 (events API latency)
            </li>
            <li>
              <strong>Suggested reply:</strong> macro M-002 (incident ack with
              ETA + exec call offer)
            </li>
          </ul>
        </div>

        {/* Conversation snippet */}
        <div className="flex-1 px-3 py-2 space-y-2 overflow-hidden">
          <div className="border-l-2 border-brand-500 bg-brand-50/30 rounded-r p-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="h-4 w-4 rounded-full bg-ink-400 text-white text-[8px] font-semibold inline-flex items-center justify-center">
                AB
              </span>
              <span className="text-[11px] font-semibold text-brand-700">
                Avery Bloomfield
              </span>
              <span className="inline-flex items-center gap-0.5 text-[9.5px] text-ink-500">
                <span className="h-1.5 w-1.5 rounded-full bg-urgent-500" />
                Angry
              </span>
              <span className="ml-auto text-[10px] text-ink-400 tabular-nums">
                18m ago
              </span>
            </div>
            <p className="text-[11.5px] text-ink-800">
              "30 minutes is going to be tight. THIRD time this month. We're
              getting the rough end of this. I want to know what your team is
              doing structurally to prevent this — not just the next mitigation."
            </p>
          </div>
          <div className="relative border-l-2 border-brand-400 bg-brand-50/40 rounded-r p-2">
            <Pin n="4" position="left" />
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="h-3 w-3 text-brand-700" />
              <span className="text-[10.5px] font-semibold text-brand-700">
                AI · drafted reply (awaiting agent send)
              </span>
            </div>
            <p className="text-[11.5px] text-ink-800 leading-snug">
              "Understood Avery — that's a fair ask. Let me get our engineering
              lead on a 15-min call with you tomorrow to walk through what we're
              changing. I'll send a calendar invite within the hour…"
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-[10px] text-ink-500">
                Confidence{" "}
                <span className="text-brand-700 font-semibold">0.88</span>
              </span>
              <span className="text-ink-300 text-[10px]">·</span>
              <button className="text-[10.5px] text-brand-700 font-semibold">
                Send
              </button>
              <button className="text-[10.5px] text-ink-500">Edit</button>
              <button className="text-[10.5px] text-ink-500">Regenerate</button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="px-3 py-1.5 border-t border-ink-200 bg-white text-[10px] text-ink-500 inline-flex items-center gap-1">
          <History className="h-2.5 w-2.5" />
          Audit trail · 7 AI actions on this ticket · last 4m ago
        </div>
      </div>

      {/* Right: context */}
      <div className="col-span-3 bg-white">
        <div className="px-2.5 py-2 border-b border-ink-100">
          <div className="text-[9.5px] uppercase tracking-wider text-ink-400 font-semibold mb-1">
            Customer
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-6 w-6 rounded-full bg-ink-700 text-white text-[10px] font-semibold inline-flex items-center justify-center">
              AB
            </span>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-ink-900 inline-flex items-center gap-1">
                Avery Bloomfield
                <Crown className="h-3 w-3 text-warning-600" />
              </div>
              <div className="text-[10px] text-ink-500">VP, RevOps</div>
            </div>
          </div>
        </div>

        <div className="px-2.5 py-2 border-b border-ink-100">
          <div className="text-[9.5px] uppercase tracking-wider text-ink-400 font-semibold mb-1">
            Account
          </div>
          <div className="text-[11.5px] font-semibold text-ink-900">
            Helix Robotics{" "}
            <span className="px-1 rounded text-[9px] font-semibold ring-1 ring-inset uppercase tracking-wider bg-brand-50 text-brand-700 ring-brand-200">
              ENT
            </span>
          </div>
          <div className="text-[10px] text-ink-500">Industrial Automation</div>
          <div className="mt-1.5 grid grid-cols-3 gap-1 text-[10px]">
            <div className="rounded bg-ink-50 p-1">
              <div className="text-ink-400 font-semibold">MRR</div>
              <div className="font-mono tabular-nums text-ink-700 font-semibold">
                $7k
              </div>
            </div>
            <div className="rounded bg-success-50 p-1">
              <div className="text-ink-400 font-semibold">Health</div>
              <div className="font-mono tabular-nums text-success-700 font-semibold">
                71
              </div>
            </div>
            <div className="rounded bg-ink-50 p-1">
              <div className="text-ink-400 font-semibold">Tenure</div>
              <div className="font-mono tabular-nums text-ink-700 font-semibold">
                14mo
              </div>
            </div>
          </div>
        </div>

        {/* AI signals — annotation 5 */}
        <div className="relative px-2.5 py-2 border-b border-ink-100">
          <Pin n="5" position="left" />
          <div className="text-[9.5px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">
            AI signals · 4 caught
          </div>
          <ul className="space-y-1">
            <li className="flex items-start gap-1 text-[11px] text-ink-800">
              <span className="mt-1 h-1 w-1 rounded-full bg-warning-500 shrink-0" />
              <span>Matches active incident INC-241 — group with 4 others</span>
            </li>
            <li className="flex items-start gap-1 text-[11px] text-ink-800">
              <span className="mt-1 h-1 w-1 rounded-full bg-warning-500 shrink-0" />
              <span>Sentiment escalated frustrated → angry over 3 messages</span>
            </li>
            <li className="flex items-start gap-1 text-[11px] text-ink-800">
              <span className="mt-1 h-1 w-1 rounded-full bg-warning-500 shrink-0" />
              <span>$7k/mo Enterprise · strict SLA terms in contract</span>
            </li>
            <li className="flex items-start gap-1 text-[11px] text-ink-800">
              <span className="mt-1 h-1 w-1 rounded-full bg-brand-500 shrink-0" />
              <span>Macro M-002 fits this category — pre-loaded</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Annotation legend */}
      <Legend
        items={[
          {
            n: "1",
            text: "AI prioritized this Urgent automatically (Enterprise + sentiment + SLA pressure)",
          },
          {
            n: "2",
            text: "Auto-mapped to known issue KI-1042 — agent gets the workaround macro pre-loaded",
          },
          {
            n: "3",
            text: "Routing + priority + draft + linkage shown together with a confidence score",
          },
          {
            n: "4",
            text: "Reply is drafted but not sent — agent reviews, edits, or regenerates",
          },
          {
            n: "5",
            text: "Every AI signal is named, sourced, and reviewable",
          },
        ]}
      />
    </div>
  );
}

function Pin({
  n,
  position,
}: {
  n: string;
  position: "left" | "right";
}) {
  return (
    <span
      className={`absolute -top-2 ${position === "left" ? "-left-2" : "-right-2"} h-5 w-5 rounded-full bg-brand-600 text-white text-[10px] font-bold inline-flex items-center justify-center ring-2 ring-white tabular-nums z-10`}
    >
      {n}
    </span>
  );
}

function Legend({ items }: { items: { n: string; text: string }[] }) {
  return (
    <div className="col-span-12 border-t border-ink-200 bg-ink-50/60 px-3 py-2">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {items.map((it) => (
          <div key={it.n} className="flex items-start gap-1.5">
            <span className="h-4 w-4 rounded-full bg-brand-600 text-white text-[9px] font-bold inline-flex items-center justify-center shrink-0 tabular-nums">
              {it.n}
            </span>
            <span className="text-[11px] text-ink-700 leading-snug">
              {it.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueRow({
  id,
  chan: Chan,
  prio,
  prioCls,
  sentiment,
  subject,
  who,
  sla,
  slaCls,
  unread,
  highlighted,
  annotation,
}: {
  id: string;
  chan: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  prio: string;
  prioCls: string;
  sentiment: string;
  subject: string;
  who: string;
  sla: string;
  slaCls: string;
  unread?: boolean;
  highlighted?: boolean;
  annotation?: string;
}) {
  return (
    <li
      className={`relative px-2.5 py-1.5 border-b border-ink-100 ${
        highlighted ? "bg-brand-50/50" : ""
      } before:absolute before:inset-y-0 before:left-0 before:w-[3px] ${
        prio === "URGENT" ? "before:bg-urgent-500" : "before:bg-transparent"
      }`}
    >
      {annotation && <Pin n={annotation} position="right" />}
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${
            unread ? "bg-brand-500" : "bg-transparent"
          }`}
        />
        <Chan className="h-3 w-3 text-ink-400 shrink-0" />
        <span className="font-mono text-[9.5px] text-ink-400 tabular-nums shrink-0">
          {id}
        </span>
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${sentiment}`}
        />
        <span
          className={`px-1 rounded text-[9px] font-semibold ring-1 ring-inset uppercase tracking-wider shrink-0 ${prioCls}`}
        >
          {prio}
        </span>
        <span
          className={`ml-auto text-[10px] tabular-nums shrink-0 font-medium ${slaCls}`}
        >
          {sla}
        </span>
      </div>
      <div
        className={`mt-0.5 truncate ${
          unread ? "font-semibold text-ink-900" : "text-ink-800"
        } text-[11.5px]`}
      >
        {subject}
      </div>
      <div className="text-[10px] text-ink-500 truncate">{who}</div>
    </li>
  );
}

/* =================== WHAT CHANGES (Outcomes) =================== */

function WhatChanges() {
  const items: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    body: string;
    detail: string;
  }[] = [
    {
      icon: Timer,
      title: "Cut first-response time on tier-1 tickets",
      body: "Repetitive password resets, mobile workarounds, known-incident acks land in the queue already drafted. Agents send instead of compose.",
      detail:
        "Median FRT in a typical SaaS deployment: 4h → 8 min on tier-1.",
    },
    {
      icon: GitBranch,
      title: "Route correctly the first time",
      body: "Billing disputes don't sit in L1. Sales-promise tickets land with the AM. SSO failures route to identity. Routing is a confidence-scored decision, not a guess.",
      detail:
        "~35% reduction in misrouted conversations after first month of tuning.",
    },
    {
      icon: Layers,
      title: "Stop drowning agents in repetitive volume",
      body: "AI handles password resets, mobile attachment workarounds, and known-issue acks with a draft + macro. Agents see a leaner queue of work that actually needs them.",
      detail:
        "Typical L1 ticket reduction: 40% within 30 days.",
    },
    {
      icon: Activity,
      title: "Surface repeat issues faster",
      body: "Detect duplicates across the queue. Auto-link tickets to active incidents and known issues. Group customers affected by the same outage so a single comms thread covers them.",
      detail:
        "Tickets matching active incident INC-241 get auto-grouped and linked.",
    },
    {
      icon: Inbox,
      title: "Give agents cleaner context",
      body: "Customer profile, account tier, sentiment trajectory, related tickets, linked incidents, and AI-prepared reply — all in one panel before the agent types a word.",
      detail:
        "Average context-gather time per ticket: 2 min → 0.",
    },
    {
      icon: Wand2,
      title: "Make every reply better than the last",
      body: "AI suggests the right macro for the situation, learns which ones the team actually uses, and adapts drafts to the customer's tier and tone.",
      detail:
        "Macro reuse rate climbs from ~22% to ~68% in the first quarter.",
    },
  ];
  return (
    <section
      id="what-changes"
      className="border-b border-ink-200 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mb-8">
          <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-500 mb-2">
            What changes
          </div>
          <h2 className="text-[26px] font-semibold text-ink-900 tracking-tight leading-tight">
            Operational leverage, not workflow steps.
          </h2>
          <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
            Triage Desk isn't a tag-and-route engine. It changes what arrives in
            front of your agents — so they spend their time on the tickets that
            need a human.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="border border-ink-200 rounded-md p-3 bg-white hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="h-6 w-6 rounded bg-brand-50 text-brand-700 inline-flex items-center justify-center">
                  <it.icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[13px] font-semibold text-ink-900 leading-tight">
                  {it.title}
                </span>
              </div>
              <p className="text-[12.5px] text-ink-700 leading-snug">
                {it.body}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-ink-500 border-l-2 border-brand-500 pl-2">
                <span className="font-mono tabular-nums">{it.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== SAFETY =================== */

function SafetySection() {
  return (
    <section
      id="safety"
      className="border-b border-ink-200 bg-ink-50/40"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-500 mb-2">
              Safety
            </div>
            <h2 className="text-[26px] font-semibold text-ink-900 tracking-tight leading-tight">
              The trust story is the product.
            </h2>
            <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
              AI handles first-pass triage. Your team handles the customer.
              Every AI action is scored, reviewable, and reversible — the
              system is built so the worst case is "the agent has to write the
              reply themselves," not "we sent a bad reply."
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Safety
              num="1"
              title="Confidence threshold per channel"
              body="Set the bar where AI can act vs. where humans take over. Default thresholds are conservative; tune per channel and tier."
            />
            <Safety
              num="2"
              title="Hold-and-review for sensitive categories"
              body="Billing disputes, churn risk, legal mentions, and angry sentiment never auto-reply. They sit in the agent's queue with the AI draft as a starting point."
            />
            <Safety
              num="3"
              title="VIP and Enterprise routing"
              body="High-tier accounts route straight to a human queue. AI prepares the context but never sends. Configurable per account."
            />
            <Safety
              num="4"
              title="Audit trail per AI action"
              body="Every classification, routing decision, draft, and macro suggestion is logged with reasoning. Reviewable per ticket. Exportable for compliance."
            />
            <Safety
              num="5"
              title="Reversible by design"
              body="Mis-routed? One click reassigns and the AI learns. Bad draft? Discard with no record sent. Wrong priority? Manual override is always available."
            />
            <Safety
              num="6"
              title="Data stays in your workspace"
              body="No customer messages leave your tenant. AI runs against scoped models with retention controls aligned to your DPA."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Safety({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-ink-200 rounded-md p-3 bg-white">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="h-5 w-5 rounded bg-ink-900 text-white text-[10px] font-bold inline-flex items-center justify-center font-mono tabular-nums">
          {num}
        </span>
        <span className="text-[12.5px] font-semibold text-ink-900">{title}</span>
      </div>
      <p className="text-[11.5px] text-ink-600 leading-snug">{body}</p>
    </div>
  );
}

/* =================== INTEGRATIONS =================== */

function Integrations() {
  return (
    <section id="integrations" className="border-b border-ink-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-5">
          <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-500 mb-1">
            Sits on top of your existing stack
          </div>
          <p className="text-[14px] text-ink-700">
            Two-way sync with the support inbox you already use. No rip-and-replace.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 max-w-3xl mx-auto">
          {[
            "Zendesk",
            "Intercom",
            "Front",
            "HubSpot",
            "Help Scout",
            "Slack",
            "Linear",
            "Twilio Voice",
            "Statuspage",
            "Salesforce",
            "Stripe",
            "Segment",
          ].map((n) => (
            <div
              key={n}
              className="border border-ink-200 rounded-md py-2 px-2 text-center bg-white hover:border-brand-300 transition-colors"
            >
              <span className="text-[12px] font-medium text-ink-700">{n}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center text-[11.5px] text-ink-500">
          REST API, webhooks, and SCIM available for custom integrations.
        </div>
      </div>
    </section>
  );
}

/* =================== CLOSING CTA =================== */

function ClosingCTA() {
  return (
    <section className="bg-ink-900 text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 text-center">
        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-300 mb-3">
          See it for yourself
        </div>
        <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-tight max-w-2xl mx-auto">
          See how Support Triage Desk handles a real SaaS support ticket.
        </h2>
        <p className="mt-3 text-[14px] text-ink-300 max-w-xl mx-auto leading-relaxed">
          The live demo is the actual operator workstation, loaded with 19
          realistic tickets across 5 channels — including an angry Enterprise
          escalation, a billing dispute, a duplicate, a known-incident match,
          and a French-language SSO ticket.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Link
            to="/triage"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 text-[13px] font-semibold"
          >
            Walk through the live workstation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/escalations"
            className="inline-flex items-center gap-1.5 rounded-md bg-ink-800 hover:bg-ink-700 text-white px-4 py-2.5 text-[13px] font-semibold ring-1 ring-ink-700"
          >
            Jump to escalations queue
          </Link>
        </div>
        <div className="mt-4 text-[11px] text-ink-400">
          No signup. No backend. Built as an interactive portfolio of what
          serious internal support software looks like.
        </div>
      </div>
    </section>
  );
}
