import { apiConfig } from "../config";



// fetch single stock information except history
export const fetchSingleStockInformation = async ({ ticker }) => {

    const params = new URLSearchParams({ ticker: ticker });
    const url = `${apiConfig.apiURL}/stocks/stock-detail?${params.toString()}`;

    try {

        const response = await fetch(url, {

            method: "GET",
            headers: {
                "Content-Type": "application/json"

            }
        })

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}))
            throw new Error(errorBody.detail || `Internal server error: ${response.status}`)


        };

        const data = await response.json();

        console.log(`Single ticker data: ${data}`)

        return data;


    }
    catch (error) {
        console.error(`Fetch error in fetchSingleStockInformation  [${ticker}]:`, error.message);
        throw error;
    }

}

// only fetch single stock history
export const fetchSingleStockHistory = async ({ ticker, period }) => {

    const params = new URLSearchParams({ ticker: ticker, period: period })
    const url = `${apiConfig.apiURL}/stocks/stock-history?${params.toString()}`
    try {
        const response = await fetch(url, {

            method: "GET",
            headers: {
                "Content-Type": "application/json"

            }

        })


        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.detail || `Internal server error: ${response.status}`);
        }

        const data = await response.json();

        console.log(`Single ticker history successfully fetched`)

        return data.history;



    }
    catch (error) {

        console.error(`Fetch error in fetchSingleStockHistory  [${ticker}]:`, error.message);
        throw error;

    }


}

export const fetchWatchList = async () => {

    const url = `${apiConfig.apiURL}/stocks/watchlist`

    try {

        const response = await fetch(url, {

            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }


        })

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.detail || `Internal server error: ${response.status}`);
        }

        const data = await response.json();

        console.log(`Watchlist successfully fetched`)

        return data;





    }
    catch (error) {

        console.error(`Fetch error in fetchWatchList  [${ticker}]:`, error.message);
        throw error;

    }
};

export const fetchChatApi = async ({ apiUrl = apiConfig.apiURL, sessionID, query }) => {


    const response = await fetch(`${apiUrl}/analysis/chat`, {
        method: "POST",
        body: JSON.stringify({ message: query, session_id: sessionID }),
        headers: { "Content-Type": "application/json" },
    });


    if (!response.ok) {
        const error = {
            status: response.status,
            message: "Internal Server Error"
        }

        throw error;

    }

    return response;

}