import { StockInfoCard } from "../components/StockInfoCard";
import { useUIContext } from "../../../contexts/UIContext";
import { SINGLE_STOCK_PAGE_SETTINGS } from "../../../config/uiconfig";


export function StockInfoCardOrganizer({ stockData }) {
  const { isMoreStockInformationOpen, setIsMoreStockInformationOpen } = useUIContext();

  if (!stockData) return <div className="p-10 animate-pulse">Analiz hazirlaniyor...</div>;

    const allCards = [
  { 
    id: "last_price", 
    label: "Son Fiyat", 
    value: stockData?.last_price ? `${stockData.last_price} ₺` : "-" 
  },
  { 
    id: "previous_close", 
    label: "Kapanış Fiyatı", 
    value: stockData?.previousClose ? `${stockData.previousClose} ₺` : "-" 
  },
  { 
    id: "open", 
    label: "Açılış Fiyatı", 
    value: stockData?.open ? `${stockData.open} ₺` : "-" 
  },
  { 
    id: "trailing_pe", 
    label: "F/K Oranı (PE)", 
    value: stockData?.trailingPE ?? "-" 
  },
  { 
    id: "forward_pe", 
    label: "F/K Oranı (Gelecek 1 Yıl)", 
    value: stockData?.forwardPE ?? "-" 
  },
  { 
    id: "market_cap", 
    label: "Piyasa Değeri", 
    value: stockData?.marketCap ? `${stockData.marketCap.toLocaleString('tr-TR')} ₺` : "-" 
  },
  { 
    id: "avg_volume_10d", 
    label: "10 Günlük Ort. Hacim", 
    value: stockData?.avgVolume10Days ? stockData.avgVolume10Days.toLocaleString('tr-TR') : "-" 
  },
  { 
    id: "avg_price_50d", 
    label: "50 Günlük Ort. Fiyat", 
    value: stockData?.avg50Days ? `${stockData.avg50Days.toFixed(2)} ₺` : "-" 
  },
  { 
    id: "avg_volume_3m", 
    label: "90 Günlük Ort. Hacim", 
    value: stockData?.avgVolume3Months ? stockData.avgVolume3Months.toLocaleString('tr-TR') : "-" 
  },
  { 
    id: "avg_price_200d", 
    label: "200 Günlük Ort. Fiyat", 
    value: stockData?.avg200Days ? `${stockData.avg200Days.toFixed(2)} ₺` : "-" 
  },
  { 
    id: "price_to_book", 
    label: "PD/DD Oranı", 
    value: stockData?.priceToBook ?? "-" 
  },
  { 
    id: "ev_to_ebitda", 
    label: "FD/FAVÖK Oranı", 
    value: stockData?.enterpriseToEbitda ?? "-" 
  },
  { 
    id: "current_ratio", 
    label: "Cari Oran", 
    value: stockData?.currentRatio ?? "-" 
  },
  { 
    id: "debt_to_equity", 
    label: "Borç / Özsermaye Oranı", 
    value: stockData?.debtToEquity ?? "-" 
  },
  { 
    id: "return_on_equity", 
    label: "Özsermaye Karlılığı", 
    value: stockData?.returnOnEquity ? `%${(stockData.returnOnEquity * 100).toFixed(2)}` : "-" 
  },
  { 
    id: "return_on_assets", 
    label: "Aktif Karlılık", 
    value: stockData?.returnOnAssets ? `%${(stockData.returnOnAssets * 100).toFixed(2)}` : "-" 
  },
  { 
    id: "eps", 
    label: "Hisse Başı Kazanç (EPS)", 
    value: stockData?.eps ?? "-" 
  },
  { 
    id: "year_high", 
    label: "Yıllık En Yüksek", 
    value: stockData?.yearHigh ? `${stockData.yearHigh} ₺` : "-" 
  },
  { 
    id: "year_low", 
    label: "Yıllık En Düşük", 
    value: stockData?.yearLow ? `${stockData.yearLow} ₺` : "-" 
  },
  { 
    id: "sector", 
    label: "Sektör", 
    value: stockData?.sector && stockData.sector !== "none" ? stockData.sector : "-" 
  },
  { 
    id: "day_high", 
    label: "Günün En Yüksek", 
    value: stockData?.dayHigh ? `${stockData.dayHigh} ₺` : "-" 
  },
  { 
    id: "day_low", 
    label: "Günün En Düşük", 
    value: stockData?.dayLow ? `${stockData.dayLow} ₺` : "-" 
  },
  { 
    id: "volume_cumulative", 
    label: "Kümülatif Hacim", 
    value: stockData?.volume ? stockData.volume.toLocaleString('tr-TR') : "-" 
  },
  { 
    id: "volume_daily", 
    label: "Günlük Hacim", 
    value: stockData?.lastVolume ? stockData.lastVolume.toLocaleString('tr-TR') : "-" 
  }
];



  const initialCount = SINGLE_STOCK_PAGE_SETTINGS.STOCK_INFORMATION_SECTION_SETTINGS.INITIAL_VISIBLE_COUNT;
  const initialCards = allCards.slice(0, initialCount);
  

  const extraCards = allCards.slice(initialCount);

  return (
    <div className="w-full flex flex-col gap-2">
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {initialCards.map((card) => (
          <StockInfoCard key={card.id} data={{ label: card.label, value: card.value }} />
        ))}
      </div>

  
      <div className={`
        grid transition-all duration-500 ease-in-out overflow-hidden
        ${isMoreStockInformationOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}
      `}>
        <div className="min-h-0 grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {extraCards.map((card) => (
            <StockInfoCard key={card.id} data={{ label: card.label, value: card.value }} />
          ))}
        </div>
      </div>

      {/* Buton Alanı */}
      <button 
        className="w-full py-2 mt-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-blue-600 transition-colors flex items-center justify-center gap-1"
        onClick={() => setIsMoreStockInformationOpen(!isMoreStockInformationOpen)}
      >
        {isMoreStockInformationOpen ? "Daha Az Göster ▲" : "Tüm Detayları Gör ▼"}
      </button>

    </div>
  );
}