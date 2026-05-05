# Support Triage Desk

A polished operator workstation for triaging support tickets, managing
escalations, and protecting SLAs in real time.

**Live demo:** https://jeflor.github.io/support-triage-desk/

This is intentionally **not a dashboard**. It's a 3-pane support console
modeled on Intercom Inbox / Zendesk / Front / Linear — dense, fast,
operational.

## What's inside

- **3-pane workstation** as the primary surface:
  - Left pane — dense ticket queue with tabs (All, Unassigned, Mine, Urgent,
    Escalated, Waiting · customer, SLA risk, Resolved), channel filter,
    inline search, sentiment dots, priority pills, AI-signal hints, SLA
    timers.
  - Center pane — ticket header (status, priority, SLA pills, escalation /
    blocked / snooze banners), conversation thread with channel-aware
    rendering and internal-note distinction, reply composer with
    macros & internal-note toggle, fast-actions row (Assign, Priority,
    Tag, Escalate, Merge, Snooze, Wait on customer, Resolve).
  - Right pane — customer + account profile, account flags (churn risk,
    expansion likely, invoice failure), AI summary, AI signals (duplicate
    suspected, incident match, scope-promise, billing dispute,
    sentiment shift, missing context), issue intelligence (category, area,
    sentiment trajectory bars, urgency score), linked incident card with
    live status, related tickets from the same account, related known
    issues, tags, recent activity timestamps.

- **3 distinct role modes** (top bar switcher):
  - **Support Agent** — default tab `All`, full reply + macro experience.
  - **Escalation Specialist** — defaults to `Escalated` tab.
  - **Support Manager** — adds a top "live queue health" strip showing SLA
    breached, SLA at risk, escalated, unassigned, angry sentiment counts;
    defaults to `SLA risk` tab.

- **Embedded AI Copilot** — slide-out panel (`⌘/`) with quick actions:
  summarize, draft reply, detect sentiment, classify, suggest escalation,
  likely root cause, flag duplicate, recommend macro. Drafts can be sent
  directly as the next reply.

- **Macros** — 8 realistic macros (first-touch ack, INC-241 incident
  response, refund pro-rated, SSO clock-skew workaround, mobile attachment
  workaround, etc.) with shortcuts, usage counts, and `{{first_name}}` /
  `{{agent_name}}` interpolation.

- **Knowledge** — 3 active incidents (with status + affected accounts +
  owning team) and 4 known issues with workarounds.

## Mess by design

Realistic chaos seeded across the queue:
- Angry customer with 3-message sentiment escalation tied to active
  incident
- Billing dispute (PO mismatch — "we paid Apr 14")
- Churn-risk pattern complaint from a $128k Enterprise account
- Duplicate ticket suggested with merge action
- Sales-promise coming back as support ("where's the Salesforce sync?")
- French-language SSO ticket with translation hint
- Scope ambiguity, snoozed feature request, social-channel outage claim
- VIP needing a custom report before tomorrow's board meeting

## Stack

- Vite + React + TypeScript
- Tailwind CSS (custom dense indigo palette · slate-cool ink scale)
- Lucide icons, JetBrains Mono for IDs and SLA timers
- React Router (HashRouter — works on GH Pages without server-side rewrites)
- 100% mock data, no backend

## Develop

```bash
npm install
npm run dev    # http://localhost:5173/support-triage-desk/
npm run build  # outputs dist/
npm run deploy # builds and pushes to gh-pages branch
```
