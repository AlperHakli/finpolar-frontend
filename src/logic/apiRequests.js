import { apiConfig } from "../config/apiconfig";


// Manages all api requests
const apiClient = async (endpoint, { method = "GET", body = null, params = {} } = {}) => {
    try {
        
        const url = new URL(`${apiConfig.apiURL}${endpoint}`);
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, params[key]);
                }
            });
        }

        // request 
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body && method !== "GET") {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url.toString(), options);


        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.detail || `HTTP Error: ${response.status}`);
        }

    
        return await response.json();

    } catch (error) {
        console.error(`API Client Error [${method} ${endpoint}]:`, error.message);
        throw error;
    }
};


// fetch stock detail
export const fetchSingleStockInformation = async  ({ ticker }) => {
    return await apiClient("/assets/stock-detail", { params: { ticker } });
};
export const fetchStockAiScore = async ({ticker , session_id}) => {
    return await apiClient("/analysis/ai-asset-summary" , {params: {ticker , session_id}});
}

// fetch asset history
export const fetchSingleStockHistory = async ({ ticker, period }) => {
    return await apiClient("/assets/asset-history", { params: { ticker, period } });
};
export const fetchMultipleStockHistory = async ({body}) => {
    return await apiClient("/assets/multiple-asset-history" , {method: "POST", body: body});
};
// fetch top 10 volume stocks
export const fetchTop10VolumeStocks = async () => {
    return await apiClient("/assets/get-top-10-volume-stock-details");
};
export const fetchMultipleRandomAssets = async () =>  {
    return await apiClient("/assets/get-random-10-assets-from-all-asset-types");
}
export const fetchMultipleStocksFilteredBySector = async () => {
    return await apiClient("/assets/multiple-stocks-filtered-by-sector");
};
export const searchMultipleAsset = async ({ search_key }) => {
    const params = new URLSearchParams({ search_key: search_key.strip?.() || search_key });
    
    return await apiClient(`/assets/search-asset?${params.toString()}`);
};
// fetch watchlist
export const fetchWatchList = async () => {
    return await apiClient("/assets/watchlist");
};

export const fetchMainMenuMarketIndices = async () => {
    return await apiClient("/assets/market-indices");
}

// fetch asset indicators
export const fetchSingleStockIndicators = async ({ body }) => {
    return await apiClient("/assets/single-stock-indicators", { method: "POST", body });
};

// talk to ai
export const fetchChatApi = async ({ body }) => {
    try {
        const url = `${apiConfig.apiURL}/analysis/chat`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return response;

    } catch (error) {
        console.error(`API Chat Client Error [POST /analysis/chat]:`, error.message);
        throw error;
    }
};

