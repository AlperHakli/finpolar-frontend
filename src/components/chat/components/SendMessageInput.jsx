import { useChatContext } from "../../../contexts/ChatContext";


export function SendMessageInput() {

  const {query , setQuery , handleUserMessage} = useChatContext();
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleUserMessage()}
      placeholder="Type your message here..."
      className="w-full p-4 pr-24 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
    />
  )




}