import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { AppStateProvider } from "./state/AppState";
import { DataStoreProvider } from "./state/DataStore";
import { ToasterProvider } from "./state/Toaster";
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
              <Route element={<AppShell />}>
                <Route path="/" element={<TriagePage />} />
                <Route path="/escalations" element={<EscalationsPage />} />
                <Route path="/macros" element={<MacrosPage />} />
                <Route path="/knowledge" element={<KnowledgePage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </HashRouter>
        </AppStateProvider>
      </ToasterProvider>
    </DataStoreProvider>
  );
}

export default App;
