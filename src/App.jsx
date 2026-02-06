import { useState, useRef, useEffect, act } from "react";
import { StockAnalysisPage , StockAnalysisSkeleton } from "./pages";
import  Markdown  from "react-markdown";
import { fetchSingleTickerInformation } from "./api_requests";
import { v4 as uuidv4 } from 'uuid';
import { mainUrl } from "./api_requests";

function App() {
  const [tabs, setTabs] = useState([{ id: "chat", title: "AI Assistant", type: "chat" }]);
  const [activeTabId, setActiveTabId] = useState("chat");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const stocks = ["THYAO", "EREGL", "SASA", "SISE", "KCHOL", "GARAN", "ASELS"];
  const [tickerData , setTickerData] = useState(null)
  const [sessionID , setSessionID]= useState(() => uuidv4 ) 



  const reference = useRef(null);

  const callSingleTickerFetchApi = async ({tickername}) => {
    const data = await fetchSingleTickerInformation({ticker: tickername});
    setTickerData(data)

  }

  const scrollToBottom = () => {

    reference.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {

    scrollToBottom(); 
  }, [messages]);


  useEffect(() => {
    if(activeTabId !=="chat" && activeTabId) {
      const nulldata = {name:"loading...",currentPrice:"loading...",sector:"loading..."}
      setTickerData(null);
      callSingleTickerFetchApi({tickername:activeTabId});
    } 

  },[activeTabId]);

  const openTab = (stock) => {
    const existingTab = tabs.find((t) => t.id === stock);
    if (existingTab) {
      setActiveTabId(stock);
    } else {
      const newTab = { id: stock, title: stock, type: "stock" };
      setTabs([...tabs, newTab]);
      setActiveTabId(stock);
      
    }
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleUserMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", message: query };
    setMessages((prev) => [...prev, userMessage, { role: "assistant", message: "" }]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch(`${mainUrl}/analysis/chat`, {
        method: "POST",
        body: JSON.stringify({ message: query , session_id: sessionID}),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const rawChunk = decoder.decode(value);
          const lines = rawChunk.split("\n");

          lines.forEach((line) => {
            if (line.startsWith("data: ")) {
              try {
                const jsonString = line.replace("data: ", "").trim();
                const parsed = JSON.parse(jsonString);
                const content = parsed.text;

                setMessages((prev) => {
                  const lastIndex = prev.length - 1;
                  return prev.map((msg, i) => {
                    if (i === lastIndex) {
                      return { ...msg, message: msg.message + content };
                    }
                    return msg;
                  });
                });
              } catch (e) {
                console.log("Parsing skip:", line);
              }
            }
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans antialiased text-slate-900">
      {/* HEADER */}
      <header className="w-full py-3 px-6 border-b border-slate-200 flex justify-between items-center bg-white z-10">
        <h1 className="text-blue-600 text-xl font-black tracking-tighter">
          FINPOLAR <span className="text-slate-400 font-medium">AI</span>
        </h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
          <div className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Market Watch
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            {stocks.map((s) => (
              <div
                key={s}
                onClick={() => openTab(s)}
                className={`group flex items-center justify-between px-3 py-2 mb-1 rounded-lg cursor-pointer transition-all ${
                  activeTabId === s ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{s}</span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                  Analyze
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 flex flex-col bg-slate-50">
          <div className="flex bg-slate-100 border-b border-slate-200 px-2 pt-2 gap-1">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-t-lg transition-all border-t border-l border-r ${
                  activeTabId === tab.id
                    ? "bg-white border-slate-200 text-blue-600 font-semibold shadow-[0_-2px_10px_rgba(0,0,0,0.02)]"
                    : "bg-transparent border-transparent text-slate-500 hover:bg-slate-200/50"
                }`}
              >
                <span className="text-xs truncate max-w-[100px]">{tab.title}</span>
                {tab.id !== "chat" && (
                  <button
                    onClick={(e) => closeTab(e, tab.id)}
                    className="hover:bg-slate-200 rounded-md w-5 h-5 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                  >
                    
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 p-8 overflow-y-auto bg-white">
            {activeTabId === "chat" ? (
              messages.length === 0 ? (
                <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-200">
                    <span className="text-white text-2xl font-bold">F</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Financial Intelligence</h2>
                  <p className="text-slate-500 text-center max-w-md">
                    Ask me about market trends, stock analysis, or specific company financial reports.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 max-w-3xl mx-auto">
             {messages.map((item, index) => (
              <div
                key={index}
               
                className={`flex w-full ${item.role === "user" ? "justify-end mb-6" : "justify-start mb-10"}`}
              >
                {item.role === "user" ? (
                
                  <div className="p-4 rounded-2xl max-w-[85%] shadow-sm bg-blue-600 text-white rounded-tr-none ml-12">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {item.message}
                    </div>
                  </div>
                ) : (

                  <div className="w-full max-w-3xl mr-12"> 

                    <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed">
                
                      <Markdown>
                        {item.message}
                      </Markdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
                
                  <div ref={reference} />
                </div>
              )
            ) : (
              <div className="max-w-6xl mx-auto">
                {!tickerData ? (
                <StockAnalysisSkeleton />
              ) : (
                <StockAnalysisPage data={tickerData} />
              )}

            
              </div>
            )}
          </div>

          {activeTabId === "chat" && (
            <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
              <div className="max-w-3xl mx-auto relative group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
                  placeholder="Type your message here..."
                  className="w-full p-4 pr-24 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                />
                <button
                  className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  onClick={handleUserMessage}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "Send"}
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-3 tracking-wide uppercase">
                Not financial advice. AI may provide inaccurate data. Verify important info.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;