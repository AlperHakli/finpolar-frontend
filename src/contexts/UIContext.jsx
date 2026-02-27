import { createContext, useContext, useState } from "react";


export const UIContext = createContext();



export const UIProvider = ({ children }) => {


    const [isLoading, setIsLoading] = useState(false);
    const [activeTabId, setActiveTabId] = useState("chat");
    const [tabs, setTabs] = useState([{ id: "chat", title: "AI Assistant", type: "chat" }]);

    const openTab = (stock) => {
        const existingTab = tabs.find((t) => t.id === stock);
        if (existingTab) {
            setActiveTabId(stock);
        } else {
            const newTab = { id: stock, title: stock, type: "stock" };
            setTabs([...tabs, newTab]);
            setActiveTabId(stock);

        }
    };

    const closeTab = (e, id) => {
        e.stopPropagation();
        const newTabs = tabs.filter((t) => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id && newTabs.length > 0) {
            setActiveTabId(newTabs[newTabs.length - 1].id);
        }
    };



    const value = {
        activeTabId,
        setActiveTabId,
        tabs, setTabs,
        isLoading,
        setIsLoading,
        openTab,
        closeTab
    };


    return <UIContext.Provider value={value}>
        {children}
    </UIContext.Provider>

};

export const useUIContext = () => useContext(UIContext);