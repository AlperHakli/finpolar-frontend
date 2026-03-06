import { useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUIContext } from "./UIContext";
import { fetchChatApi } from "../logic/apiRequests";


export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {
  const [sessionID, setSessionID] = useState(() => uuidv4())
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const {setIsLoading} = useUIContext();

  const handleUserMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", message: query };
    setMessages((prev) => [...prev, userMessage, { role: "assistant", message: "" }]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetchChatApi({
         sessionID: sessionID,
         query:query,
        });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const rawChunk = decoder.decode(value);
          const lines = rawChunk.split("\n");

          lines.forEach((line) => {
            if (line.startsWith("data: ")) {
              try {
                const jsonString = line.replace("data: ", "").trim();
                const parsed = JSON.parse(jsonString);
                const content = parsed.text;

                setMessages((prev) => {
                  const lastIndex = prev.length - 1;
                  return prev.map((msg, i) => {
                    if (i === lastIndex) {
                      return { ...msg, message: msg.message + content };
                    }
                    return msg;
                  });
                });
              } catch (e) {
                console.log("Parsing skip:", line);
              }
            }
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const value =
  {
    messages,
    setMessages,
    query,
    setQuery,
    sessionID,
    setSessionID,
    handleUserMessage
    
  };



  return <ChatContext.Provider value={value}>
    {children}
  </ChatContext.Provider>

};

export const useChatContext = () => useContext(ChatContext);