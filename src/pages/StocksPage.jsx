import { StockHeader } from "../components/stocks/sections/StockHeader"
import { StockChart } from "../components/stocks/sections/StockChart"
import { SideMenu } from "../components/stocks/sections/SideMenu";
import { StockSummary } from "../components/stocks/sections/StockSummary.jsx";
import { IndicatorCardOrganizer } from "../components/stocks/sections/CardOrganizer";
import { PeriodSelector } from "../components/stocks/sections/PeriodSelector";
import { AiInsights } from "../components/stocks/sections/AiInsights.jsx";
import { StockInfoCardOrganizer } from "../components/stocks/sections/StockInfoCardOrganizer.jsx";
import { useAnalysisContext } from "../contexts/AnalysisContext"
import { StockPageSectionHeader } from "../components/StockPageSectionHeader.jsx";

export function StocksPage() {
  const { stockData, stockIndicators, stockHistory, watchList } = useAnalysisContext();

  return (
    /* 🚀 SİHİRLİ DOKUNUŞ BURADA:
       - flex flex-col: Mobilde her şey (Sol blok ve Sağ blok) alt alta sıralanır.
       - lg:flex-row: Ekran genişlediğinde (1024px ve üzeri masaüstü) yan yana iki dev blok olurlar.
       - items-start: Yan yana geldiklerinde sağ menü yukarıda sabit kalır, aşağı doğru gereksiz uzamaz.
    */
    <div className="flex flex-col lg:flex-row w-full max-w-full bg-white p-4 lg:p-6 gap-6">

      {/* 📊 SOL VE ORTA ALAN (Grafikler, AI Raporları, İndikatörler) */}
      {/* lg:flex-1 çakarak bilgisayarda sağdaki menüden kalan tüm devasa alanı buraya veriyoruz */}
      <div className="lg:flex-1 flex flex-col min-w-0 gap-10 pt-5">
        
        {/* Header Section */}
        <section>
          <StockHeader stockData={stockData} />
        </section>

        {/* Graph Selector and Summary */}
        <section className="flex flex-col gap-7">
          <div className="w-full">
            <StockChart datahistory={stockHistory?.history} />
          </div>
          <div>
            <PeriodSelector />
          </div>
          <StockSummary text={stockData?.summary}/>
        </section>

        {/* AI Insights section */}
        <section className="flex flex-col gap-3">
          <StockPageSectionHeader header={"AI Insights"} />
          <AiInsights />
        </section>

        {/* Stock Info Section */}
        <section className="flex flex-col gap-10">
          <StockPageSectionHeader header={"Stock Info"} />
          <StockInfoCardOrganizer stockData={stockData || []} />
        </section>

        {/* Stock Indicators Section */}
        <section className="flex flex-col gap-10">
          <StockPageSectionHeader header={"Stock Indicators"} />
          <IndicatorCardOrganizer indicators={stockIndicators || []} />
        </section>

      </div>

      
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col pt-5 lg:pt-5 gap-10">
        <div>
          <SideMenu watchList={watchList["top_volume"]} headerContent={"Top 10 Stocks"} />
        </div>
        <div>
          <SideMenu watchList={watchList["top_gainers"]} headerContent={"Top 10 most increased Stocks"}/>
        </div>
        <div>
          <SideMenu watchList={watchList["top_losers"]} headerContent={"Top 10 most decreased Stocks"}/>
        </div>
      </div>

    </div>
  );
}