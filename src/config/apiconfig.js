export const apiConfig = {
apiURL: import.meta.env.VITE_API_URL,
SECTOR_NAMES_SETTINGS: ["Industrials" , "Consumer Cyclical" , "Financial Services" , "Utilities" , "Basic Materials" , "Healthcare" , "Energy" , "Real Estate"],
MULTIPLE_HISTORY_FETCH_PARAMS: 
{
  requests: [
    { ticker: "XU100.IS", period: "1d" },
    { ticker: "GC=F", period: "1d" }
  ]
}
};