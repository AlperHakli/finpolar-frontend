import { useRef , useEffect } from "react";
import { useChatContext } from "../../../contexts/ChatContext";
import  Markdown  from "react-markdown";


export function ChatPageTopPart() {
  const reference = useRef(null);
  const {messages} = useChatContext();

//   const scrollToBottom = () => {
//   reference.current?.scrollIntoView({ behavior: "smooth" });
// };


//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {messages.map((item, index) => (
        <div
          key={index}

          className={`flex w-full ${item.role === "user" ? "justify-end mb-6" : "justify-start mb-10"}`}
        >
          {item.role === "user" ? (

            <div className="p-4 rounded-2xl max-w-[85%] shadow-sm bg-blue-600 text-white rounded-tr-none ml-12">
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {item.message}
              </div>
            </div>
          ) : (

            <div className="w-full max-w-3xl mr-12">

              <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed">

                <Markdown>
                  {item.message}
                </Markdown>
              </div>
            </div>
          )}
        </div>
      ))}

      <div ref={reference} />
    </div>
  )



}