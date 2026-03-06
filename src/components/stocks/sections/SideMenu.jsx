import { useAnalysisContext } from "../../../contexts/AnalysisContext";

export function SideMenu({ watchList }) {
    const { setTicker, ticker: currentTicker, loadingWatchList } = useAnalysisContext();

    if (loadingWatchList || !watchList) {
        return <div className="w-64 h-full border-l border-slate-100 p-2 text-[10px] text-slate-400">Yükleniyor...</div>;
    }

    return (
        <div className="w-85 h-full bg-white border-l border-slate-100 flex flex-col">

            <div className="p-2.5 border-b border-slate-50 bg-slate-50/30">
                <h2 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase">İzleme Listesi</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                {watchList.map((data) => {
                    const isPositive = data.changePercent >= 0;

                    return (
                        <button
                            key={data.symbol}
                            onClick={() => setTicker(data.symbol)}
                           
                            className={`w-full flex items-center justify-between px-3 py-1.5 transition-all border-l-2 
                                ${currentTicker === data.symbol
                                    ? "bg-blue-50/50 border-blue-500"
                                    : "bg-transparent border-transparent hover:bg-slate-50"
                                }`}
                        >
                          
                            <div className="text-left flex flex-col leading-none">
                                <span className="text-[11px] font-bold text-slate-700">
                                    {data.symbol}
                                </span>
                            </div>

                           
                            <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-medium text-slate-800 tabular-nums">
                                    {data.price?.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                                </span>
                                <span className={`text-[10px] font-bold min-w-[42px] text-right ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {isPositive ? '+' : ''}{data.changePercent?.toFixed(2)}%
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}