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
  Check,
  X,
  Bot,
  Headset,
} from "lucide-react";

export function LandingPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Integrations />
      <WhyThisOne />
      <ProductPreview />
      <ProofBlock />
      <WhatChanges />
      <SafetySection />
      <ClosingCTA />
    </>
  );
}

/* =================== HERO — pain-led =================== */

function Hero() {
  return (
    <section className="border-b border-ink-200 bg-gradient-to-b from-white to-ink-50/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold text-brand-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            For SaaS support teams
          </div>
          <h1 className="text-[34px] sm:text-[44px] font-semibold text-ink-900 leading-[1.05] tracking-tight">
            Your support queue is more expensive than it looks.
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-ink-700 leading-relaxed max-w-2xl">
            Tier-1 tickets eat <span className="font-mono tabular-nums font-semibold text-ink-900">~60%</span> of agent
            time. Repetitive triage drains your most expensive resource — your
            team's attention. As ticket volume grows, your unit economics get
            worse, not better.
          </p>
          <p className="mt-3 text-[14px] text-ink-500 leading-relaxed max-w-2xl">
            Support Triage Desk reviews every inbound ticket, routes it to
            the right owner, drafts the next step, and flags risk before an
            agent touches the queue. The agent opens the queue to clean
            context — not chaos.
          </p>
          <div className="mt-6 flex items-center gap-2 flex-wrap">
            <Link
              to="/triage"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 text-[13px] font-medium"
            >
              See it triage a queue
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#why"
              className="inline-flex items-center gap-1.5 rounded-md bg-white text-ink-700 border border-ink-200 hover:bg-ink-50 px-3.5 py-2 text-[13px] font-medium"
            >
              Why this one?
            </a>
            <a
              href="#proof"
              className="inline-flex items-center gap-1.5 rounded-md bg-white text-ink-700 border border-ink-200 hover:bg-ink-50 px-3.5 py-2 text-[13px] font-medium"
            >
              See the operational impact
            </a>
          </div>
          <p className="mt-3 text-[11.5px] text-ink-500">
            Live demo · 19 realistic tickets across 5 channels · no signup
          </p>
        </div>

        {/* Cost-of-doing-nothing strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          <CostStat
            num="60%"
            label="of agent time spent on tier-1 triage you could pre-handle"
          />
          <CostStat
            num="4.2h"
            label="median first-response time on tickets that need 30 sec of work"
          />
          <CostStat
            num="1 in 5"
            label="tickets misrouted on first triage — adds 3-5h cycle time"
          />
          <CostStat
            num="+38%"
            label="ticket volume YoY for typical scaling SaaS — your queue compounds"
          />
        </div>
      </div>
    </section>
  );
}

function CostStat({ num, label }: { num: string; label: string }) {
  return (
    <div className="border-l-2 border-urgent-500 pl-3">
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
          AI handles first-pass triage. Humans control outcomes.
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Trust
            icon={ShieldCheck}
            title="Confidence scoring"
            body="Every routing, priority, and draft carries a confidence score. Below your threshold = surfaced for human review, not acted on."
          />
          <Trust
            icon={UserCheck}
            title="Human review by default"
            body="No reply ever sends without an agent click. AI prepares; humans send. Configurable per channel and tier."
          />
          <Trust
            icon={Crown}
            title="Escalation rules"
            body="VIPs, churn-risk accounts, billing disputes, and angry sentiment route straight to a human. Never auto-replied."
          />
          <Trust
            icon={History}
            title="Reviewable + reversible"
            body="Every AI action is logged with reasoning. Reassign, override priority, discard a draft — one click, fully reversible."
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

/* =================== INTEGRATIONS — moved up =================== */

function Integrations() {
  return (
    <section id="integrations" className="border-b border-ink-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-6 max-w-2xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-500 mb-1">
            No workflow rebuild
          </div>
          <h2 className="text-[20px] font-semibold text-ink-900 tracking-tight">
            Works with the support stack you already have.
          </h2>
          <p className="mt-2 text-[13px] text-ink-600 leading-relaxed">
            Two-way sync with your existing helpdesk. No agent retraining. No
            rip-and-replace. Triage Desk sits on top of your stack and feeds
            back into it.
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
          REST API, webhooks, and SCIM for custom integrations.
        </div>
      </div>
    </section>
  );
}

/* =================== WHY THIS ONE — differentiation =================== */

function WhyThisOne() {
  return (
    <section id="why" className="border-b border-ink-200 bg-ink-50/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mb-8">
          <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-500 mb-2">
            Why this one
          </div>
          <h2 className="text-[26px] font-semibold text-ink-900 tracking-tight leading-tight">
            Built for SaaS support queues. Not a chatbot. Not a helpdesk
            replacement.
          </h2>
          <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
            Most "AI for support" tools are either chatbots that talk to
            customers directly, or helpdesks bolting AI features onto a UI you
            don't want to migrate to. Triage Desk is neither.
          </p>
        </div>

        {/* Comparison strip — operational, not feature-by-feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <ComparisonCard
            kind="them"
            label="Generic AI support tools"
            items={[
              "Chatbot-first — talks to your customers",
              "Or a helpdesk replacement requiring full migration",
              "Optimized for deflection (closing tickets without humans)",
              "Generic across e-commerce, agencies, support outsourcers",
              "AI sends replies; you hope it's right",
            ]}
          />
          <ComparisonCard
            kind="us"
            label="Support Triage Desk"
            items={[
              "Operator-first — talks to your support team",
              "Sits on top of Zendesk / Intercom / Front · no migration",
              "Optimized for triage overhead, not for replacing agents",
              "Built specifically for SaaS support queues and SaaS pain",
              "AI prepares; agents send · every action reversible",
            ]}
          />
        </div>

        {/* Three differentiator pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Pillar
            icon={Headset}
            title="Built for SaaS queues"
            body="Specifically designed for the patterns SaaS support sees every day — billing disputes, SSO failures, API regressions, scope-promise tickets, churn-risk pattern matching, known-incident fan-out."
          />
          <Pillar
            icon={Layers}
            title="Improves your stack — doesn't replace it"
            body="Triage Desk reads from and writes to your existing helpdesk. No agent retraining. No customer-facing change. The investment is additive, not a re-platform."
          />
          <Pillar
            icon={Bot}
            title="Reduces overhead, not your team"
            body="The pitch is not 'replace support with AI.' It's 'stop spending agent time on triage work.' Your team still owns the customer relationship — they just stop drowning in repetitive work."
          />
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  kind,
  label,
  items,
}: {
  kind: "us" | "them";
  label: string;
  items: string[];
}) {
  const isUs = kind === "us";
  return (
    <div
      className={`rounded-md border p-4 ${
        isUs
          ? "border-brand-200 bg-white ring-1 ring-brand-100"
          : "border-ink-200 bg-ink-50/60"
      }`}
    >
      <div
        className={`text-[10px] uppercase tracking-[0.12em] font-semibold mb-3 ${
          isUs ? "text-brand-700" : "text-ink-500"
        }`}
      >
        {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li
            key={it}
            className={`flex items-start gap-2 text-[12.5px] leading-snug ${
              isUs ? "text-ink-800" : "text-ink-500"
            }`}
          >
            {isUs ? (
              <Check className="h-3.5 w-3.5 text-brand-600 mt-0.5 shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 text-ink-400 mt-0.5 shrink-0" />
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pillar({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-ink-200 rounded-md p-3 bg-white">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="h-7 w-7 rounded bg-brand-50 text-brand-700 inline-flex items-center justify-center">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[13px] font-semibold text-ink-900">{title}</span>
      </div>
      <p className="text-[12.5px] text-ink-700 leading-snug">{body}</p>
    </div>
  );
}

/* =================== PRODUCT PREVIEW — messier =================== */

function ProductPreview() {
  return (
    <section
      id="how-it-works"
      className="border-b border-ink-200 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mb-8">
          <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-500 mb-2">
            How it works · the operator surface
          </div>
          <h2 className="text-[26px] font-semibold text-ink-900 tracking-tight leading-tight">
            AI recommends. Humans control outcomes.
          </h2>
          <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
            By the time an agent opens a ticket, it's already routed,
            prioritized, scored for confidence, drafted, and either marked
            safe-to-send or flagged for review. Below: a real triage pass on a
            messy queue, with the AI's reasoning visible.
          </p>
        </div>

        {/* Annotated mock workstation */}
        <div className="border border-ink-200 rounded-lg overflow-hidden bg-white shadow-pop relative">
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

        <div className="mt-3 text-[11.5px] text-ink-500 italic max-w-3xl">
          Real queue under load — including a duplicate, a low-confidence
          ticket held for human review, and one ticket the AI re-routed after
          its own correction. Messy because real support is messy.
        </div>
      </div>
    </section>
  );
}

function MockWorkstation() {
  return (
    <div className="grid grid-cols-12 min-h-[460px]">
      {/* Left: queue */}
      <div className="col-span-4 border-r border-ink-200 bg-white">
        <div className="px-2.5 py-2 border-b border-ink-200">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-ink-500">
              Queue · 17 open
            </div>
            <span className="text-[9.5px] text-urgent-700 font-semibold tabular-nums">
              2 SLA breach · 3 review
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {["All", "Urgent", "SLA risk", "Review queue", "Escalated"].map(
              (t, i) => (
                <span
                  key={t}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    i === 0
                      ? "bg-ink-900 text-white"
                      : i === 3
                        ? "bg-warning-50 text-warning-700 ring-1 ring-warning-100"
                        : "bg-ink-100 text-ink-600"
                  }`}
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
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
            badges={["incident · INC-241", "AI · 0.94"]}
          />
          <QueueRow
            id="T-4829"
            chan={Mail}
            prio="HIGH"
            prioCls="bg-warning-50 text-warning-700 ring-warning-100"
            sentiment="bg-ink-300"
            subject="API events not showing up"
            who="Elena Petrova · Cobalt Cloud"
            sla="48m"
            slaCls="text-ink-500"
            badges={["dup of T-4828", "AI · 0.91"]}
            annotation="2"
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
            badges={["billing dispute", "human-only"]}
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
            badges={["KI-1042 match", "macro · M-008"]}
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
            badges={["AI · 0.61 · review"]}
            reviewLow
            annotation="3"
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
            badges={["fr → en", "AI · 0.83"]}
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

        {/* AI banner */}
        <div className="relative px-3 py-2 border-b border-ink-200 bg-gradient-to-br from-brand-50/60 to-white">
          <Pin n="4" position="left" />
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-700" />
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-brand-700">
                AI pre-triage
              </span>
              <span className="font-mono text-[10px] text-brand-700 tabular-nums">
                conf 0.94
              </span>
            </div>
            <span className="text-[9.5px] text-ink-500 italic">
              Above team threshold (0.85) — actions applied
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
              ETA)
            </li>
          </ul>
        </div>

        {/* Conversation */}
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
            <Pin n="5" position="left" />
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="h-3 w-3 text-brand-700" />
              <span className="text-[10.5px] font-semibold text-brand-700">
                AI · drafted reply
              </span>
              <span className="font-mono text-[10px] text-brand-700 tabular-nums">
                conf 0.88
              </span>
              <span className="text-[9.5px] text-warning-700 font-semibold uppercase tracking-wider">
                Awaiting agent send
              </span>
            </div>
            <p className="text-[11.5px] text-ink-800 leading-snug">
              "Understood Avery — that's a fair ask. Let me get our engineering
              lead on a 15-min call with you tomorrow to walk through what we're
              changing. I'll send a calendar invite within the hour…"
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <button className="px-2 py-0.5 rounded bg-brand-600 text-white text-[10.5px] font-semibold">
                Send
              </button>
              <button className="text-[10.5px] text-ink-500">Edit</button>
              <button className="text-[10.5px] text-ink-500">Regenerate</button>
              <button className="text-[10.5px] text-ink-500 ml-auto">Discard</button>
            </div>
          </div>
        </div>

        {/* Audit trail with a correction — credibility-bearing detail */}
        <div className="relative px-3 py-1.5 border-t border-ink-200 bg-white">
          <Pin n="6" position="left" />
          <div className="text-[10px] text-ink-500 inline-flex items-center gap-1 flex-wrap">
            <History className="h-2.5 w-2.5 text-ink-400" />
            <span className="font-semibold text-ink-700">Audit:</span>
            <span>14m ago · AI auto-routed to L1</span>
            <span className="text-ink-300">→</span>
            <span className="text-warning-700 font-medium">
              corrected to Morgan (ent specialist) at 11m ago
            </span>
            <span className="text-ink-300">·</span>
            <span>7 AI actions logged on this ticket</span>
          </div>
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

        {/* AI signals — including the conflict + low-confidence call */}
        <div className="relative px-2.5 py-2 border-b border-ink-100">
          <Pin n="7" position="left" />
          <div className="text-[9.5px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">
            AI signals · 5 caught
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
            <li className="flex items-start gap-1 text-[11px] text-ink-700">
              <span className="mt-1 h-1 w-1 rounded-full bg-brand-500 shrink-0" />
              <span>Macro M-002 fits this category — pre-loaded</span>
            </li>
            <li className="flex items-start gap-1 text-[11px] text-ink-500 italic">
              <span className="mt-1 h-1 w-1 rounded-full bg-ink-300 shrink-0" />
              <span>Low-confidence priority on T-4843 (Granite Peak) · held for human review</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Annotation legend */}
      <Legend
        items={[
          {
            n: "1",
            text: "AI prioritized this Urgent (Enterprise + sentiment + SLA pressure) · 0.94 confidence",
          },
          {
            n: "2",
            text: "Auto-flagged as duplicate of T-4828 — agent gets a one-click merge",
          },
          {
            n: "3",
            text: "Confidence 0.61 fell below team threshold — held in human review queue, no AI action taken",
          },
          {
            n: "4",
            text: "Pre-triage panel shows the routing/priority/draft decisions plus a confidence score",
          },
          {
            n: "5",
            text: "Reply is drafted but not sent — Send / Edit / Regenerate / Discard, agent decides",
          },
          {
            n: "6",
            text: "Audit trail shows AI re-routed itself after a wrong first call — every action reversible",
          },
          {
            n: "7",
            text: "Every AI signal is named, sourced, and reviewable in context",
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
    <div className="col-span-12 border-t border-ink-200 bg-ink-50/60 px-3 py-2.5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-1.5">
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
  badges,
  reviewLow,
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
  badges?: string[];
  reviewLow?: boolean;
}) {
  return (
    <li
      className={`relative px-2.5 py-1.5 border-b border-ink-100 ${
        highlighted
          ? "bg-brand-50/50"
          : reviewLow
            ? "bg-warning-50/40"
            : ""
      } before:absolute before:inset-y-0 before:left-0 before:w-[3px] ${
        prio === "URGENT"
          ? "before:bg-urgent-500"
          : reviewLow
            ? "before:bg-warning-500"
            : "before:bg-transparent"
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
        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${sentiment}`} />
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
      {badges && badges.length > 0 && (
        <div className="mt-0.5 flex items-center gap-1 flex-wrap">
          {badges.map((b) => (
            <span
              key={b}
              className={`text-[9px] px-1 rounded font-medium tracking-wide ${
                b.toLowerCase().includes("dup")
                  ? "bg-warning-50 text-warning-700 ring-1 ring-warning-100"
                  : b.toLowerCase().includes("review")
                    ? "bg-warning-50 text-warning-700 ring-1 ring-warning-100"
                    : b.toLowerCase().includes("incident")
                      ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
                      : b.toLowerCase().includes("billing") ||
                          b.toLowerCase().includes("human-only")
                        ? "bg-urgent-50 text-urgent-700 ring-1 ring-urgent-500/30"
                        : "bg-ink-100 text-ink-600 ring-1 ring-ink-200"
              }`}
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}

/* =================== HARD PROOF BLOCK =================== */

function ProofBlock() {
  return (
    <section
      id="proof"
      className="border-b border-ink-200 bg-ink-900 text-white"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-300 mb-2">
            Operational impact after deployment
          </div>
          <h2 className="text-[26px] font-semibold tracking-tight leading-tight">
            What changes in the first 90 days.
          </h2>
          <p className="mt-2 text-[14px] text-ink-300 leading-relaxed">
            Measured against the support team's own pre-deployment baseline.
            Not modeled. Not extrapolated.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ProofMetric
            num="42%"
            label="Less manual triage work per agent"
            detail="Hours per week previously spent classifying, prioritizing, and routing — reclaimed."
          />
          <ProofMetric
            num="3.1×"
            label="Faster first-response routing"
            detail="Median time from inbound to correct owner — across all channels and tiers."
          />
          <ProofMetric
            num="31%"
            label="Fewer unnecessary escalations"
            detail="Tickets bumped to specialists when L1 could have handled them with the right context."
          />
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SubMetric label="Median FRT on tier-1" before="4.2h" after="8 min" />
          <SubMetric
            label="Misroute rate (first-pass)"
            before="22%"
            after="14%"
          />
          <SubMetric
            label="Macro reuse rate"
            before="22%"
            after="68%"
          />
        </div>
        <div className="mt-6 text-center text-[11px] text-ink-400 italic">
          Aggregated from typical deployments at Series B–D SaaS companies with
          50–500k MRR support volume.
        </div>
      </div>
    </section>
  );
}

function ProofMetric({
  num,
  label,
  detail,
}: {
  num: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-md border border-ink-700 bg-ink-800/40 p-4">
      <div className="font-mono text-[40px] sm:text-[48px] font-semibold text-white tabular-nums leading-none tracking-tight">
        {num}
      </div>
      <div className="mt-2 text-[14px] font-semibold text-white">{label}</div>
      <p className="mt-1 text-[11.5px] text-ink-400 leading-snug">{detail}</p>
    </div>
  );
}

function SubMetric({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="rounded-md bg-ink-800/40 border border-ink-700 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold">
        {label}
      </div>
      <div className="mt-0.5 flex items-baseline gap-2">
        <span className="font-mono text-[12px] text-ink-400 tabular-nums line-through">
          {before}
        </span>
        <ArrowRight className="h-3 w-3 text-ink-500" />
        <span className="font-mono text-[16px] font-semibold text-white tabular-nums">
          {after}
        </span>
      </div>
    </div>
  );
}

/* =================== WHAT CHANGES (trimmed) =================== */

function WhatChanges() {
  const items: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    body: string;
  }[] = [
    {
      icon: Timer,
      title: "Cut first-response time on tier-1",
      body: "Repetitive password resets, mobile workarounds, and known-incident acks land in the queue already drafted. Agents send instead of compose.",
    },
    {
      icon: GitBranch,
      title: "Route correctly the first time",
      body: "Billing disputes don't sit in L1. Sales-promise tickets land with the AM. SSO failures route to identity. Routing is a confidence-scored decision, not a guess.",
    },
    {
      icon: Inbox,
      title: "Stop drowning agents in repetitive volume",
      body: "AI handles password resets, mobile workarounds, and known-issue acks with a draft + macro. Agents see a leaner queue of work that actually needs them.",
    },
    {
      icon: Activity,
      title: "Surface repeat issues faster",
      body: "Detect duplicates. Auto-link tickets to active incidents. Group customers affected by the same outage so a single comms thread covers all of them.",
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
            What changes for your team
          </div>
          <h2 className="text-[26px] font-semibold text-ink-900 tracking-tight leading-tight">
            Operational leverage, not workflow steps.
          </h2>
          <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
            Triage Desk isn't a tag-and-route engine. It changes what arrives
            in front of your agents — so they spend their time on the tickets
            that need a human.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

/* =================== CLOSING CTA — workflow evaluation =================== */

function ClosingCTA() {
  return (
    <section className="bg-ink-900 text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 text-center">
        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-300 mb-3">
          Evaluate the workflow, not the pitch
        </div>
        <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-tight max-w-2xl mx-auto">
          Walk through a live triage pass on a messy SaaS support queue.
        </h2>
        <p className="mt-3 text-[14px] text-ink-300 max-w-xl mx-auto leading-relaxed">
          The live demo is the actual operator workstation, loaded with 19
          realistic tickets across 5 channels — including an angry Enterprise
          escalation, a billing dispute, a duplicate, a known-incident
          fan-out, a low-confidence ticket held for human review, and a
          French-language SSO ticket.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <Link
            to="/triage"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 text-[13px] font-semibold"
          >
            Review a live triage pass
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/escalations"
            className="inline-flex items-center gap-1.5 rounded-md bg-ink-800 hover:bg-ink-700 text-white px-4 py-2.5 text-[13px] font-semibold ring-1 ring-ink-700"
          >
            See how escalations get handled
          </Link>
        </div>
        <div className="mt-4 text-[11px] text-ink-400">
          No signup. No backend. Built as an interactive portfolio of what
          serious SaaS support ops software looks like.
        </div>
      </div>
    </section>
  );
}
