import { Outlet } from "react-router-dom";
import { NavRail } from "./NavRail";
import { TopBar } from "./TopBar";
import { AICopilotPanel } from "../ai/AICopilotPanel";

export function AppShell() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-ink-100 text-ink-700">
      <NavRail />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
      <AICopilotPanel />
    </div>
  );
}
