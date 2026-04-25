import { ChatProvider } from "./contexts/ChatContext";
import { AnalysisProvider } from "./contexts/AnalysisContext";
import { UIProvider } from "./contexts/UIContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BottomBar } from "./components/Bottombar";
import { OuterPart } from "./components/OuterPart";
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { NewsPage } from "./pages/NewsPage";
import { StocksPage } from "./pages/StocksPage";
import { SingleStockPage } from "./pages/SingleStockPage";
import { ErrorPage } from "./pages/ErrorPage";
import { SideBarButton } from "./components/SideBarButton";
import { SideBar } from "./components/SideBar";


function AppContent() {
  return (
    <div className="flex flex-col h-screen bg-white font-sans antialiased text-slate-900">


      <header className="w-full py-3 px-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">

        <div className="flex items-center gap-2">
          <SideBarButton />


          <h1 className="text-blue-600 text-xl font-black tracking-tighter">
            FINPOLAR <span className="text-slate-400 font-medium">AI</span>
          </h1>


        </div>

      </header>




      <div className="flex flex-1 overflow-hidden">


        <SideBar />


        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ai" element={<ChatPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/stocks/:ticker" element={<SingleStockPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

          <OuterPart />

        </main>
      </div>
      <BottomBar />



    </div>
  );
}

function App() {
  return (
    <Router>
      <UIProvider>
        <AnalysisProvider>
          <ChatProvider>
            <AppContent />
          </ChatProvider>
        </AnalysisProvider>
      </UIProvider>
    </Router>
  );
}

export default App;