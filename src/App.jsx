import { ChatProvider } from "./contexts/ChatContext";
import { AnalysisProvider } from "./contexts/AnalysisContext";
import { UIProvider } from "./contexts/UIContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { NewsPage } from "./pages/NewsPage";
import { StocksPage } from "./pages/StocksPage";
import { SingleStockPage } from "./pages/SingleStockPage";
import { ErrorPage } from "./pages/ErrorPage";

import { SideBar } from "./components/SideBar"; // Kendi bileşenini import et
// Diğer importlar (Routes, Providers vb.) aynı kalıyor...

function AppContent() {
  return (
    <div className="flex flex-col h-screen bg-white font-sans antialiased text-slate-900">
      
      {/* 1. ÜST HEADER (Global) */}
      <header className="w-full py-3 px-8 border-b border-slate-100 flex justify-between items-center bg-white z-10">
        <h1 className="text-blue-600 text-xl font-black tracking-tighter">
          FINPOLAR <span className="text-slate-400 font-medium">AI</span>
        </h1>
      </header>

      {/* 2. ANA GÖVDE (Sidebar + Sayfa İçeriği) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Senin SideBar Bileşenin */}
        <SideBar />

        {/* Dinamik Sayfa İçeriği */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ai" element={<ChatPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/stocks/:ticker" element={<SingleStockPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

      </div>
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