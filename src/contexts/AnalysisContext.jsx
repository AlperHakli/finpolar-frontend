import { createContext, useContext, useState , useEffect } from "react";
import { useUIContext } from "./UIContext";
import {fetchSingleTickerInformation} from "../logic/apiRequests";
export const AnalysisContext = createContext();



export const AnalysisProvider = ({ children }) => {

  const {activeTabId} = useUIContext();
  const [tickerData, setTickerData] = useState(null);
  const value = {tickerData, setTickerData }

  useEffect(() => {
    if (activeTabId !== "chat" && activeTabId) {
      const nulldata = { name: "loading...", currentPrice: "loading...", sector: "loading..." }
      setTickerData(null);
      callSingleTickerFetchApi({ tickername: activeTabId });
    }

  }, [activeTabId]);

  const callSingleTickerFetchApi = async ({ tickername }) => {
    const data = await fetchSingleTickerInformation({ ticker: tickername });
    setTickerData(data)
  }



  return <AnalysisContext.Provider value={value}>
    {children}
  </AnalysisContext.Provider>


}

export const useAnalysisContext = () => useContext(AnalysisContext);