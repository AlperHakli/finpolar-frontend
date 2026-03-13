import { dummytext , dummysummarytext } from "../../../mockdata"
import { AIScoreBar } from "../components/AiScoreBar"

export function AiInsights() {

    return (


        <div className="flex flex-col gap-10">

            <span className="font-bold text-shadow-gray-300 text-3xl">AI Insights</span>

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