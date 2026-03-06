import { ChatPageBottomPart } from "../../components/chat/sections/ChatPageBottomPart";
import { ChatPageTopPart } from "../../components/chat/sections/ChatPageTopPart";
import { ChatPageInitial } from "./ChatPageInitial";
import { useChatContext } from "../../contexts/ChatContext";

export function ChatPage() {

    const { messages } = useChatContext();

    return (
        <div className="flex flex-col overflow-hidden h-full">

            {messages.length === 0 ?
                <div className="flex-1 overflow-y-auto p-6">
                    
                    <ChatPageInitial />
                </div> :

                <div className="flex-1 overflow-y-auto p-6">
                    
                    <ChatPageTopPart />
                </div>


            }

            <div className="flex-none">
                <ChatPageBottomPart />
            </div>


        </div>



    )


}