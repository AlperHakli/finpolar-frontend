import { dummytext , dummysummarytext } from "../../../mockdata"
import { AIScoreBar } from "../components/AiScoreBar"
import { StockPageSectionHeader } from "../../StockPageSectionHeader"
import { useAnalysisContext } from "../../../contexts/AnalysisContext"
export function AiInsights() {

    const {stockData} = useAnalysisContext();
    console.log(`ai score: ${stockData?.ai_score}`)

    return (

        <div className="flex flex-col gap-10">


            
            <AIScoreBar score={stockData?.ai_score} />


            {/* <div className="flex-col gap-2">

                <div>

                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        AI Summary
                    </span>

                </div>

                <div>
                    <p >
                        {dummysummarytext}
                    </p>
                </div>


            </div> */}



        </div>

    )





};
