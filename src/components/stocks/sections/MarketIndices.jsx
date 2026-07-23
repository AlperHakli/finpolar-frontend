import { useNavigate } from "react-router-dom";
import { useAnalysisContext } from "../../../contexts/AnalysisContext";

export function IndicesOverview({ indicesList, headerContent }) {
    const navigate = useNavigate();
    const { setTicker } = useAnalysisContext();

    const handleRowClick = (symbol) => {
        setTicker(symbol); // Backend için ham veri: "XU100.IS"
        navigate("/stocks"); // Sayfa yönlendirmesi
    };

    if (indicesList?.length === 0) {
        return (
            <div className="bg-gray-400 rounded-xs h-1/2"></div>
        );
    }

    return (
        <div className="w-full bg-white border border-slate-100 rounded-xl flex flex-col overflow-hidden shadow-sm">
            
            {/* Üst Başlık Alanı */}
            <div className="border-b pl-3 border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-xs text-left font-extrabold text-slate-800 tracking-tight uppercase">
                    {headerContent || "Piyasa Endeksleri"}
                </h3>
            </div>

            {/* 📊 SQL TABLO YAPISI KAPSAYICISI */}
            <div className="w-full overflow-x-auto">
                <div className="flex flex-col gap-2 px-2 py-2">
                    
                    {/* 1. KISIM: TABLO BAŞLIKLARI (Thead Görevi Görür - Tam Senin Yazdığın Boyutlarda) */}
                    <div className="grid grid-cols-5 bg-slate-50/50 border-b border-slate-100 text-center text-[8px] font-bold text-slate-400 uppercase tracking-wider select-none">
                        <div className="col-span-1 text-left">Endeks</div>
                        <div className="col-span-1 text-right">Son Fiyat</div>
                        <div className="col-span-1 text-right">Önc. Kapanış</div>
                        <div className="col-span-1 text-right">Değişim</div>
                        <div className="col-span-1 text-right">Değişim (%)</div>
                    </div>

                    {/* 2. KISIM: TABLO SATIRLARI (Tbody Görevi Görür - Küçük ve Kompakt) */}
                    <div className="flex flex-col divide-y gap-2 divide-slate-50 gap-1">
                        {indicesList?.map((indexData) => {
                            const isPositive = indexData.changePercent >= 0;
                            const cleanSymbol = indexData.symbol?.split(".")[0];

                            return (
                                <button
                                    key={indexData.symbol}
                                    onClick={() => handleRowClick(indexData.symbol)}
                                    className="grid grid-cols-5 gap-10 items-center text-left text-[11px] transition-all duration-150 hover:bg-blue-50/30 group select-none"
                                >
                                    {/* Endeks Kısaltması (MIATK gibi kalın ve sola hizalı) */}
                                    <div className="col-span-1 text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {cleanSymbol}
                                    </div>

                                    {/* Son Fiyat */}
                                    <div className="col-span-1 text-right text-xs font-medium text-slate-700 tabular-nums">
                                        {indexData.lastPrice?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    {/* Önceki Kapanış */}
                                    <div className="col-span-1 text-right text-xs font-medium text-slate-500 tabular-nums">
                                        {indexData.previousClose?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    {/* Net Değişim Sayısal */}
                                    <div className={`col-span-1 text-right text-xs font-semibold tabular-nums ${
                                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                                    }`}>
                                        {isPositive ? '+' : ''}{indexData.changeDigit?.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    {/* Dinamik Değişim Yüzdesi (Ok işaretleri uçuruldu, jilet gibi temiz) */}
                                    <div className={`col-span-1 text-right text-xs font-bold tabular-nums ${
                                        isPositive ? 'text-emerald-500' : 'text-rose-500'
                                    }`}>
                                        {isPositive ? '+' : ''}{indexData.changePercent.toFixed(2)}%
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