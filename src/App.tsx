import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { LandingShell } from "./components/landing/LandingShell";
import { AppStateProvider } from "./state/AppState";
import { DataStoreProvider } from "./state/DataStore";
import { ToasterProvider } from "./state/Toaster";
import { LandingPage } from "./pages/Landing";
import { TriagePage } from "./pages/Triage";
import { EscalationsPage } from "./pages/Escalations";
import { MacrosPage } from "./pages/Macros";
import { KnowledgePage } from "./pages/Knowledge";
import { TeamPage } from "./pages/Team";
import { SettingsPage } from "./pages/Settings";

function App() {
  return (
    <DataStoreProvider>
      <ToasterProvider>
        <AppStateProvider>
          <HashRouter>
            <Routes>
              {/* Marketing landing — public-facing entry */}
              <Route element={<LandingShell />}>
                <Route path="/" element={<LandingPage />} />
              </Route>
              {/* Live workstation + product surfaces */}
              <Route element={<AppShell />}>
                <Route path="/triage" element={<TriagePage />} />
                <Route path="/escalations" element={<EscalationsPage />} />
                <Route path="/macros" element={<MacrosPage />} />
                <Route path="/knowledge" element={<KnowledgePage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </AppStateProvider>
      </ToasterProvider>
    </DataStoreProvider>
  );
}

export default App;
