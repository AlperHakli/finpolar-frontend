import { useNavigate } from "react-router-dom";
import { useAnalysisContext } from "../../../contexts/AnalysisContext";

export function MarketGridOverview({ watchList, headerContent }) {
    const navigate = useNavigate();
    const { setTicker } = useAnalysisContext();

    const handleRowClick = (symbol) => {
        setTicker(symbol); // Backend için ham veri: "SASA.IS"
        navigate("/stocks"); // Sayfa yönlendirmesi
    };
    if(watchList == []){
        return (
            <div className="h-1/3 w-full bg-blue-400 border-slate-400 rounded-xl "></div>
        )
    }

    return (
        <div className="w-full bg-white border border-slate-100 rounded-xl flex flex-col overflow-hidden shadow-sm">
            
            {/* Üst Başlık Alanı */}
            <div className="border-b pl-3 border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-xs text-left font-extrabold text-slate-800 tracking-tight uppercase">
                    {headerContent || "Piyasa Takip Tablosu"}
                </h3>
            </div>

            {/* 📊 SQL TABLO YAPISI KAPSAYICISI */}
            <div className="w-full overflow-x-auto">
                <div className="flex flex-col gap-2 px-2 py-2">
                    
                    {/* 1. KISIM: TABLO BAŞLIKLARI (Thead Görevi Görür) */}
                    <div className="grid grid-cols-6 bg-slate-50/50 border-b border-slate-100 text-center text-[8px] font-bold text-slate-400 uppercase tracking-wider select-none">
                        <div className="col-span-1">Sembol</div>
                        <div className="col-span-1 ">Açılış</div>
                        <div className="col-span-1 ">En Yüksek</div>
                        <div className="col-span-1 ">En Düşük</div>
                        <div className="col-span-1 ">Önc. Kapanış</div>
                        <div className="col-span-1 ">Değişim (%)</div>
                    </div>

                    {/* 2. KISIM: TABLO SATIRLARI (Tbody Görevi Görür) */}
                    <div className="flex flex-col divide-y gap-2 divide-slate-50 gap-1">
                        {watchList?.length === 0 && (
                            <div className="bg-gray-400 rounded-xs h-1/2"></div>



                        )}
                        {watchList?.map((data) => {
                            // Yüzde değişim hesabı
                            const changePercent = data.previousClose 
                                ? ((data.open - data.previousClose) / data.previousClose) * 100 
                                : 0;
                                
                            const isPositive = changePercent >= 0;
                            const cleanSymbol = data.symbol?.split(".")[0];

                            return (
                                <button
                                    key={data.symbol}
                                    onClick={() => handleRowClick(data.symbol)}
                                    className="grid grid-cols-6 gap-10 items-center text-left text-[11px] transition-all duration-150 hover:bg-blue-50/30 group select-none"
                                >
                                    {/* Sembol (.IS kısmı atılmış, kalın maviye duyarlı) */}
                                    <div className="col-span-1 text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {cleanSymbol}
                                    </div>

                                    {/* Açılış (Open) */}
                                    <div className="col-span-1 text-right text-xs font-medium text-slate-700 tabular-nums">
                                        {data.open?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    {/* En Yüksek (Day High - İnce Yeşil Tonu) */}
                                    <div className="col-span-1 text-right text-xs font-semibold text-emerald-600 tabular-nums">
                                        {data.dayHigh?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    {/* En Düşük (Day Low - İnce Kırmızı Tonu) */}
                                    <div className="col-span-1 text-right text-xs font-semibold text-rose-600 tabular-nums">
                                        {data.dayLow?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    {/* Önceki Kapanış */}
                                    <div className="col-span-1 text-right text-xs font-medium text-slate-500 tabular-nums">
                                        {data.previousClose?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    {/* Dinamik Değişim Yüzdesi (Hizalı ve Renkli) */}
                                    <div className={`col-span-1 text-right text-xs font-bold tabular-nums ${
                                        isPositive ? 'text-emerald-500' : 'text-rose-500'
                                    }`}>
                                        {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
}