import { useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUIContext } from "./UIContext";
import { fetchChatApi } from "../logic/apiRequests";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [sessionID, setSessionID] = useState(() => uuidv4());
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const { setIsLoading } = useUIContext();

  const handleUserMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", message: query };
    const assistantEmptyMessage = { role: "assistant", message: "" };

    const targetAssistantIndex = messages.length + 1;

    setMessages((prev) => [...prev, userMessage, assistantEmptyMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetchChatApi({
        body: { sessionID: sessionID, message: query }
      });

      if (response.status === 429) {
        setMessages((prev) => 
          prev.map((msg, i) => 
            i === targetAssistantIndex 
              ? { ...msg, message: "⚠️ Too many requests. Please wait a moment." } 
              : msg
          )
        );
        return; 
      }

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

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
            const cleanedLine = line.trim();
            if (cleanedLine.startsWith("data: ")) {
              try {
                const jsonString = cleanedLine.replace("data: ", "").trim();
                const parsed = JSON.parse(jsonString);

                const content = parsed.text || parsed.content || "";

                if (content) {
                  setMessages((prev) => 
                    prev.map((msg, i) => 
                      i === targetAssistantIndex 
                        ? { ...msg, message: msg.message + content } 
                        : msg
                    )
                  );
                }
              } catch (e) {
                console.log("Parsing skip:", cleanedLine);
              }
            }
          });
        }
      }
    } catch (err) {
      // console.error("Stream hatası yakalandı:", err);
      setMessages((prev) => 
        prev.map((msg, i) => 
          i === targetAssistantIndex 
            ? { ...msg, message: "❌ Sunucuyla bağlantı kurulamadı veya yanıt alınamadı." } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    messages,
    setMessages,
    query,
    setQuery,
    sessionID,
    setSessionID,
    handleUserMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);