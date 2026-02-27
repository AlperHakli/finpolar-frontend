import { BottomPartText } from "../../components/BottomPartText";
import { SendMessageBtn } from "../../components/SendMessageBtn";
import { SendMessageInput } from "../../components/SendMessageInput";

export function ChatBottomPart () {


    return (

        (
            <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
              <div className="max-w-3xl mx-auto relative group">
                <SendMessageInput/>
                <SendMessageBtn/>
              </div>
            <BottomPartText/>
            </div>
          )


    )


}