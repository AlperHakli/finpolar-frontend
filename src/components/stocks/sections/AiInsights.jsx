import { dummytext , dummysummarytext } from "../../../mockdata"
import { AIScoreBar } from "../components/AiScoreBar"
import { StockPageSectionHeader } from "../../StockPageSectionHeader"
export function AiInsights() {

    return (


        <div className="flex flex-col gap-10">

            

            <div>

                <span className="w-2/3">
                    {dummytext}
                </span>

            </div>

            <AIScoreBar score={75} />


            <div className="flex-col gap-2">

                <div>

                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        AI Summary
                    </span>

                </div>

                <div>
                    <span className="w-full">
                        {dummysummarytext}
                    </span>
                </div>


            </div>



        </div>

    )





};
