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
    return await apiClient("/stocks/stock-detail", { params: { ticker } });
};
export const fetchStockAiScore = async ({ticker , session_id}) => {
    return await apiClient("/analysis/ai-asset-summary" , {params: {ticker , session_id}});
}

// fetch asset history
export const fetchSingleStockHistory = async ({ ticker, period }) => {
    return await apiClient("/stocks/stock-history", { params: { ticker, period } });
};

// fetch watchlist
export const fetchWatchList = async () => {
    return await apiClient("/stocks/watchlist");
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

// fetch asset indicators
export const fetchSingleStockIndicators = async ({ body }) => {
    return await apiClient("/stocks/single-stock-indicators", { method: "POST", body });
};