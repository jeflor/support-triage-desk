import { Outlet, Link } from "react-router-dom";
import { ArrowRight, Code2 } from "lucide-react";

export function LandingShell() {
  return (
    <div className="min-h-screen w-full bg-white text-ink-700 flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}

function LandingHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-ink-200">
      <div className="max-w-[1200px] mx-auto h-14 px-4 sm:px-6 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-ink-900 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="h-4 w-4">
              <path
                d="M7 9h14a2 2 0 012 2v9a2 2 0 01-2 2h-7l-4 3v-3H7a2 2 0 01-2-2v-9a2 2 0 012-2z"
                fill="#4f46e5"
              />
              <circle cx="11" cy="15" r="1.3" fill="#fff" />
              <circle cx="15" cy="15" r="1.3" fill="#fff" />
              <circle cx="19" cy="15" r="1.3" fill="#fff" />
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-ink-900 tracking-tight">
            Support Triage Desk
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 ml-4 text-[12.5px] text-ink-600">
          <a href="#what-changes" className="px-2 py-1 rounded hover:text-ink-900 hover:bg-ink-100">
            What changes
          </a>
          <a href="#how-it-works" className="px-2 py-1 rounded hover:text-ink-900 hover:bg-ink-100">
            How it works
          </a>
          <a href="#safety" className="px-2 py-1 rounded hover:text-ink-900 hover:bg-ink-100">
            Safety
          </a>
          <a href="#integrations" className="px-2 py-1 rounded hover:text-ink-900 hover:bg-ink-100">
            Integrations
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://github.com/jeflor/support-triage-desk"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[12px] text-ink-500 hover:text-ink-800"
            title="View source"
          >
            <Code2 className="h-3.5 w-3.5" />
            Source
          </a>
          <Link
            to="/triage"
            className="inline-flex items-center gap-1 rounded-md bg-brand-600 hover:bg-brand-700 text-white px-2.5 py-1.5 text-[12.5px] font-medium"
          >
            Open the desk
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-3 flex-wrap text-[11.5px] text-ink-500">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-ink-900 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="h-3 w-3">
              <path
                d="M7 9h14a2 2 0 012 2v9a2 2 0 01-2 2h-7l-4 3v-3H7a2 2 0 01-2-2v-9a2 2 0 012-2z"
                fill="#4f46e5"
              />
            </svg>
          </div>
          <span>Support Triage Desk · Northwind</span>
          <span className="text-ink-400">·</span>
          <span>Operator workstation for SaaS support teams</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-ink-800">
            Privacy
          </a>
          <a href="#" className="hover:text-ink-800">
            Security
          </a>
          <a
            href="https://github.com/jeflor/support-triage-desk"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink-800 inline-flex items-center gap-1"
          >
            <Code2 className="h-3 w-3" />
            jeflor/support-triage-desk
          </a>
        </div>
      </div>
    </footer>
  );
}
