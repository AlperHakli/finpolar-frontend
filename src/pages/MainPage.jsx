import { TopVolumeGrid } from "../components/main/TopVolumeGrid";
import { useAnalysisContext } from "../contexts/AnalysisContext";
import { MarketGridOverview } from "../components/stocks/sections/MarketGridOverview";
import { StocksBySectorGridView } from "../components/stocks/sections/StocksBySectorGridView";
import { SearchBar } from "../components/main/searchbar";
import { StockChart } from "../components/stocks/sections/StockChart";
import { IndicesOverview } from "../components/stocks/sections/MarketIndices";
import { apiConfig } from "../config/apiconfig";
export  function MainPage() {
  const { top10Volume ,stocksBySector , marketIndices , random10assets,  mainMenuGraph, setCurrentSectorName , singleSectorStocksList } = useAnalysisContext();
  return (
    <div className="flex flex-col gap-15 px-2">

      <SearchBar  />
      
      <MarketGridOverview watchList={top10Volume} headerContent={"En çok hacme sahip hisseler"} />

      {mainMenuGraph?.data?.["XU100.IS"] && (
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">
          {mainMenuGraph.data["XU100.IS"].symbol.split(".")[0]}{" "}
          <span className="text-gray-500">günlük grafik</span>
        </h3>
        <StockChart datahistory={mainMenuGraph.data["XU100.IS"].history} />
      </div>
    )}

      <IndicesOverview indicesList={marketIndices} headerContent={"Hisse Endeksleri"} />
      

      <StocksBySectorGridView headerContent={"Sektöre göre hisse dağılımı"} stocksBySector={stocksBySector} setCurrentSectorName={setCurrentSectorName} singleSectorStocksList={singleSectorStocksList}/>



          {mainMenuGraph?.data?.["GC=F"] && (
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">
          {mainMenuGraph.data["GC=F"].symbol.split(".")[0]}{" "}
          <span className="text-gray-500">günlük grafik</span>
        </h3>
        <StockChart datahistory={mainMenuGraph.data["GC=F"].history} />
      </div>
    )}


    <MarketGridOverview watchList={random10assets?.stockstats} headerContent={"Hisseler"} />

    
    <MarketGridOverview watchList={random10assets?.commoditystats} headerContent={"Emtialar"} />





      

    
    </div>
  );
}