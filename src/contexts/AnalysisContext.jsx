import { createContext, useContext, useState, useEffect } from "react";
import { fetchSingleStockInformation, fetchStockAiScore , fetchSingleStockHistory, fetchWatchList , fetchSingleStockIndicators } from "../logic/apiRequests";
import {v4 as uuidv4} from "uuid"
export const AnalysisContext = createContext();



export const AnalysisProvider = ({ children }) => {

  const [period, setPeriod] = useState("1y");
  const [ticker, setTicker] = useState("THYAO.IS");
  const [stockHistory, setStockHistory] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [stockIndicators , setStockIndicators] = useState(null);
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
  const [watchList, setWatchList] = useState([])
  const [loadingWatchList, setLoadingWatchList] = useState(true)




  useEffect(() => {

    const callWatchListFetchApi = async () => {

      const data = await fetchWatchList();
      setWatchList(data)
      setLoadingWatchList(false)
    };

    callWatchListFetchApi();


  }, []);

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
    const callSingleStockHistoryFetchApi = async ({ ticker, period }) => {

      const data = await fetchSingleStockHistory({ ticker: ticker, period: period });
      setStockHistory(data);
    };
    callSingleStockHistoryFetchApi({ ticker: ticker, period: period });
  }, [ticker, period]);



  const value = {
    stockData: stockData,
    stockHistory: stockHistory,
    stockIndicators:stockIndicators,
    period: period,
    setPeriod: setPeriod,
    setTicker: setTicker,
    watchList: watchList,
    loadingWatchList: loadingWatchList
  };

  return <AnalysisContext.Provider value={value}>
    {children}
  </AnalysisContext.Provider>


};

export const useAnalysisContext = () => useContext(AnalysisContext);