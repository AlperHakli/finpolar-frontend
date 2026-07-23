import { createContext, useContext, useState } from "react";


export const UIContext = createContext();



export const UIProvider = ({ children }) => {


    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen , setIsSidebarOpen] = useState(false)
    const [isMoreStockInformationOpen , setIsMoreStockInformationOpen] = useState(false)
    const [isSummaryExpanded , setIsSummaryExpanded] = useState(false)







    const value = {
        isLoading,
        setIsLoading,
        isSidebarOpen,
        setIsSidebarOpen,
        isMoreStockInformationOpen,
        setIsMoreStockInformationOpen,
        isSummaryExpanded,
        setIsSummaryExpanded

    };


    return <UIContext.Provider value={value}>
        {children}
    </UIContext.Provider>

};

export const useUIContext = () => useContext(UIContext);