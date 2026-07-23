import { useAnalysisContext } from "../../contexts/AnalysisContext";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
    const navigate = useNavigate();
    const { setSearchedAssets, searchedAssets, stockSearchLoading, searchResult, setTicker } = useAnalysisContext();
        const handleRowClick = (symbol) => {
        setTicker(symbol);
        setSearchedAssets("")
        navigate("/stocks"); // Sayfa yönlendirmesi
    };

    return (
        /* 🚀 DÜZELTME: 'garp-2' -> 'gap-2' yapıldı. Sonuç panelinin taşmaması için 'relative' eklendi */
        <div className="flex flex-col gap-2 relative w-full md:w-1/2">

            {/* INPUT KISMI */}
            <input
                type="text"
                className="rounded-xl w-full px-3 py-2 border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                placeholder="Hisse adı veya sembolü ara..."
                onChange={(searchparam) => setSearchedAssets(searchparam.target.value)}
                value={searchedAssets}
            />

            {/* ARAMA SONUÇ PANELİ KISMI */}
            {searchedAssets?.trim().length > 0 && (
                stockSearchLoading ? (
                    /* ⏳ LOADING DURUMU: Şık ve dönen bir spinner */
                    <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-xl flex items-center justify-center py-6 text-xs text-slate-400 gap-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Aranıyor...</span>
                    </div>
                ) : (
                    /* ✅ SONUÇLARIN LİSTELENDİĞİ DURUM */
                    <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1 divide-y divide-slate-50">
                        {searchResult && searchResult.length > 0 ? (
                            searchResult.map((resultdata) => {

                                return (
                                    <button
                                        key={resultdata.symbol}
                                        onClick={() => handleRowClick(resultdata.symbol)}
                                        className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors group"
                                    >
                                       
                                        <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                                            {resultdata.symbol.split(".")[0]}
                                        </span>
                               
                                        <span className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">
                                            {resultdata.name}
                                        </span>
                                    </button>
                                );
                            })
                        ) : (
                            /* ❌ HİÇBİR ŞEY BULUNAMADIĞI DURUM */
                            <div className="text-center py-6 text-slate-400 text-xs font-medium">
                                Sonuç bulunamadı.
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
}