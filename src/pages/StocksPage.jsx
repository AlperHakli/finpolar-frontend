import { StockHeader } from "../components/stocks/sections/StockHeader"
import { StockChart } from "../components/stocks/sections/StockChart"
import { SideMenu } from "../components/stocks/sections/SideMenu";
import { PeriodSelector } from "../components/stocks/sections/PeriodSelector";
import { useAnalysisContext } from "../contexts/AnalysisContext"

export function StocksPage() {
  const { stockData, stockHistory, watchList } = useAnalysisContext();

  return (

    <div className="flex h-screen bg-white overflow-hidden py-8">
      

      <div className="flex-1 flex flex-col pl-10 overflow-y-auto">
        <StockHeader stockData={stockData} />
        <div className="mt-8">
          <StockChart datahistory={stockHistory} />
          <div className="mt-4">
            <PeriodSelector />
          </div>
        </div>
      </div>


      <div className="pr-30 h-2/3 pt-10">

        <SideMenu watchList={watchList} />
      </div>

    </div>
  );
}