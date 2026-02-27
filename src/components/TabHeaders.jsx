import { useUIContext } from "../contexts/UIContext";

export function TabHeaders() {

const {tabs , activeTabId , setActiveTabId , closeTab} = useUIContext();

return(

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



);




}