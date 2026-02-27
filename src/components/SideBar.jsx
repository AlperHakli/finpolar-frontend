import { useUIContext } from "../contexts/UIContext";



const stocks = ["THYAO" , "AEFES" , "AKBNK" , "GARAN" , "YKBNK"];

export function SideBar () {

  const {openTab , activeTabId} = useUIContext();

    return (
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

    );


}