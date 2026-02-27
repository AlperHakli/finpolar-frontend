import { ChatTabSkeleton } from "./chat/ChatTabSkeleton";
import { ChatTab } from "./chat/ChatTab";
import { StockAnalysisTab } from "./analysis/StockAnalysisTab";
import { StockAnalysisTabSkeleton } from "./analysis/components/StockAnalysisTabSkeleton";
import { useUIContext } from "../contexts/UIContext";
import { useAnalysisContext } from "../contexts/AnalysisContext";
import { useChatContext } from "../contexts/ChatContext";


export function MainTabOrganizer () {

const {activeTabId} = useUIContext();
const {tickerData} = useAnalysisContext();
const {messages} = useChatContext();



    return (
        <div className="flex-1 p-8 overflow-y-auto bg-white">
            {activeTabId === "chat" ? (
              messages.length === 0 ? (
                <ChatTabSkeleton/>
              ) : (
                <ChatTab/>
              )
            ) : (
              <div className="max-w-6xl mx-auto">
                {!tickerData ? (
                <StockAnalysisTabSkeleton />
              ) : (
                <StockAnalysisTab data={tickerData} />
              )}

            
              </div>
            )}
          </div>

    )







}