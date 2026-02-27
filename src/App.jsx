import { ChatProvider } from "./contexts/ChatContext";
import { AnalysisProvider} from "./contexts/AnalysisContext";
import { useUIContext } from "./contexts/UIContext";
import { Header } from "./components/Header";
import {SideBar} from "./components/SideBar"
import {TabHeaders} from "./components/TabHeaders";
import {ChatBottomPart} from "./tabs/chat/ChatBottomPart"
import {MainTabOrganizer} from "./tabs/MainTabOrganizer"
import { UIProvider } from "./contexts/UIContext";
function AppContent() {

  const { activeTabId } = useUIContext();

  return (
    <div className="flex flex-col h-screen bg-white font-sans antialiased text-slate-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 flex flex-col bg-slate-50">
          <TabHeaders />
          <MainTabOrganizer />
          {activeTabId === "chat" && <ChatBottomPart />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <UIProvider>
    <AnalysisProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </AnalysisProvider>
    </UIProvider>
  );
}

export default App;