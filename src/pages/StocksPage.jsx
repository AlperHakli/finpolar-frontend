import { StockHeader } from "../components/stocks/sections/StockHeader"
import { StockChart } from "../components/stocks/sections/StockChart"
import { SideMenu } from "../components/stocks/sections/SideMenu";
import { CardOrganizer } from "../components/stocks/sections/CardOrganizer";
import { PeriodSelector } from "../components/stocks/sections/PeriodSelector";
import { AiInsights } from "../components/stocks/sections/AiInsights.jsx";
import { useAnalysisContext } from "../contexts/AnalysisContext"
import { indicatorsData } from "../mockdata";

export function StocksPage() {
  const { stockData, stockHistory, watchList } = useAnalysisContext();

  return (

    <div className="flex flex-row w-full max-w-400 bg-white px-10 pr-20 gap-10">

      {/* SOL TARAF */}
      <div className="flex-1 flex flex-col min-w-0">
        <StockHeader stockData={stockData} />
        <div className="mt-8">
          <StockChart datahistory={stockHistory} />
          <div className="mt-4">
            <PeriodSelector />
          </div>
        </div>

        <div className="mt-10">
          <AiInsights />
        </div>

        <div className="mt-10">
          <CardOrganizer indicators={indicatorsData} />
        </div>




      </div>

      {/* SAĞ TARAF */}
      {/* pr-10 ile menülerin sağını duvardan açtık */}
      <div className="w-80 flex-shrink-0 flex flex-col pt-10 pr-10 gap-30">
        <div>
          <SideMenu watchList={watchList} />
        </div>
        <div>
          <SideMenu watchList={watchList} />
        </div>


      </div>

    </div>
  );
}