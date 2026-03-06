import { useChatContext } from "../../../contexts/ChatContext";
import { useUIContext } from "../../../contexts/UIContext";


export function SendMessageBtn() {

  const {handleUserMessage} = useChatContext();
  const {isLoading} = useUIContext();
  return (
    <button
      className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
      onClick={handleUserMessage}
      disabled={isLoading}
    >
      {isLoading ? "..." : "Send"}
    </button>

  );

}