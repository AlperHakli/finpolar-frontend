import { createContext, useContext, useState, useEffect } from "react";
import { fetchSingleStockInformation, fetchSingleStockHistory, fetchWatchList } from "../logic/apiRequests";
export const AnalysisContext = createContext();



export const AnalysisProvider = ({ children }) => {

  const [period, setPeriod] = useState("1mo");
  const [ticker, setTicker] = useState("THYAO");
  const [stockHistory, setStockHistory] = useState(null);
  const [stockData, setStockData] = useState(null);
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

    const callSingleStockFetchApi = async ({ ticker }) => {
      const data = await fetchSingleStockInformation({ ticker: ticker });
      setStockData(data)
    };
    callSingleStockFetchApi({ ticker: ticker });

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