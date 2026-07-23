import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { fetchSingleStockInformation, fetchMultipleRandomAssets ,  fetchMultipleStockHistory ,  fetchMainMenuMarketIndices ,  searchMultipleAsset, fetchMultipleStocksFilteredBySector, fetchTop10VolumeStocks, fetchStockAiScore, fetchSingleStockHistory, fetchWatchList, fetchSingleStockIndicators } from "../logic/apiRequests";
import { v4 as uuidv4 } from "uuid"
import { apiConfig } from "../config/apiconfig";
export const AnalysisContext = createContext();



export const AnalysisProvider = ({ children }) => {

  const [period, setPeriod] = useState("1y");
  const [ticker, setTicker] = useState("THYAO.IS");
  const [stockHistory, setStockHistory] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [stockIndicators, setStockIndicators] = useState(null);


  const [mainMenuGraph , setMainMenuGraph]= useState([]);
  const [searchedAssets, setSearchedAssets] = useState("");
  const [searchResult , setSearchResult] = useState([]);
  const [stockSearchLoading, setStockSearchLoading] = useState(false);


  const [stockIndicatorsSettings, setStockIndicatorsSettings] = useState({
    rsi_period: 14,
    bb_period: 20,
    bb_std_dev: 2,
    ma_short: 20,
    ma_long: 50,
    macd_fast: 12,
    macd_slow: 26,
    macd_signal: 9
  });
  const [watchList, setWatchList] = useState([]);
  const [top10Volume, setTop10Volume] = useState([]);
  const [random10assets , setRandom10Assets] = useState([])
  const [stocksBySector, setStocksBySector] = useState([]);
  const [currentSectorName, setCurrentSectorName] = useState("Industrials");
  const [loadingWatchList, setLoadingWatchList] = useState(true);
  const [marketIndices , setMarketIndices] = useState([])

  const singleSectorStocksList = useMemo(() => {

    if (!stocksBySector || !currentSectorName) return [];

    const currentList = stocksBySector[currentSectorName];
    return currentList ? currentList : [];


  }, [currentSectorName, stocksBySector]);

    useEffect(() => {

    const callMainMenuMarketIndices = async () => {

      const data = await fetchMainMenuMarketIndices();
      setMarketIndices(data)
    };

    callMainMenuMarketIndices();


  }, []);

  useEffect(()=>{

    if(!searchedAssets.trim()){
      setStockSearchLoading(false)
      return ;
    }
    setStockSearchLoading(true)

    const timedFnc = setTimeout(async () => {
      try{
        /* result must be a list contains dictionaries like [{result_name:result1_name,result_symbol:result1_symbol} , {result_name:resulsult_symbol:result2_symbol}] */ 
        const result = await searchMultipleAsset({search_key:searchedAssets});
        setSearchResult(result)

      }
      catch(error){
        console.log(`An error occurded while searching asset ${error}`)
      }
      finally{
        setStockSearchLoading(false)
      }

    } , 500)

  } , [searchedAssets])

  useEffect(() => {

    const callWatchListFetchApi = async () => {

      const data = await fetchWatchList();
      setWatchList(data)
      setLoadingWatchList(false)
    };

    callWatchListFetchApi();


  }, []);

    useEffect(() => {

    const callMultipleRandom10AssetsFetchApi = async () => {

      const data = await fetchMultipleRandomAssets();
      setRandom10Assets(data.data)
    };

    callMultipleRandom10AssetsFetchApi();


  }, []);

  

  useEffect(() => {

    

    const callMainMenuGraphHistoryFetchApi = async () => {
      const indicesdata = await fetchMultipleStockHistory({body:apiConfig.MULTIPLE_HISTORY_FETCH_PARAMS});
      setMainMenuGraph(indicesdata)
    };

    callMainMenuGraphHistoryFetchApi();

  } , [])

  useEffect(() => {
    const inner_function = async () => {

      const data = await fetchMultipleStocksFilteredBySector();

      setStocksBySector(data)

    }

    inner_function();

  }


    , [])

  useEffect(() => {

    const callSingleStockIndicatorsFetchApi = async () => {
      const requestBody = {
        ticker: ticker,
        period: period,
        ...stockIndicatorsSettings
      };

      const data = await fetchSingleStockIndicators({ body: requestBody });
      setStockIndicators(data);
    };


    callSingleStockIndicatorsFetchApi();

  }, [ticker]);

  useEffect(() => {
    if (!ticker) return;

    const fetchAllStockData = async () => {
      try {

        const generalData = await fetchSingleStockInformation({ ticker: ticker });


        if (generalData && generalData.symbol) {
          generalData.symbol = generalData.symbol.split(".")[0];
        }


        setStockData(generalData);


        const session_uuid = uuidv4();
        const aiData = await fetchStockAiScore({ ticker: ticker, session_id: session_uuid });


        setStockData((prev) => {
          if (!prev) return { ai_score: aiData.ai_score };
          return {
            ...prev,
            ai_score: aiData.ai_score
          };
        });

      } catch (err) {
        console.error("Finpolar veri yükleme akışında hata:", err);
      }
    };


    fetchAllStockData();

  }, [ticker]);

  useEffect(() => {
  })

  useEffect(() => {
    const callTop10VolumeStocksFetch = async () => {
      try {

        const volumeData = await fetchTop10VolumeStocks();

        if (volumeData) {
          setTop10Volume(volumeData);
        } else {
          console.warn("Top 10 Hacim API'sinden boş veya geçersiz veri döndü.");
        }
      } catch (error) {
        console.error("Top 10 Hacim verisi çekilirken API patladı:", error);
      }
    };

    callTop10VolumeStocksFetch();
  }, []);




  useEffect(() => {
    const callSingleStockHistoryFetchApi = async ({ ticker, period }) => {

      const data = await fetchSingleStockHistory({ ticker: ticker, period: period });
      setStockHistory(data);
    };
    callSingleStockHistoryFetchApi({ ticker: ticker, period: period });
  }, [ticker, period]);



  const value = {
    stockData: stockData,
    stockHistory: stockHistory,
    stockIndicators: stockIndicators,
    period: period,
    setPeriod: setPeriod,
    setTicker: setTicker,
    watchList: watchList,
    top10Volume: top10Volume,
    setCurrentSectorName: setCurrentSectorName,
    random10assets: random10assets,

    setSearchedAssets: setSearchedAssets,
    searchedAssets: searchedAssets,
    stockSearchLoading:stockSearchLoading,
    searchResult:searchResult,
    mainMenuGraph:mainMenuGraph,
    marketIndices:marketIndices,


    singleSectorStocksList: singleSectorStocksList,
    stocksBySector: stocksBySector,
    loadingWatchList: loadingWatchList
  };

  return <AnalysisContext.Provider value={value}>
    {children}
  </AnalysisContext.Provider>


};

export const useAnalysisContext = () => useContext(AnalysisContext);