import { SINGLE_STOCK_PAGE_SETTINGS } from "../../../config/uiconfig"
import { useUIContext } from "../../../contexts/UIContext";

export function StockSummary({text , limit = SINGLE_STOCK_PAGE_SETTINGS.SUMMARY_SETTINGS.SUMMARY_LENGTH}){

const {isSummaryExpanded , setIsSummaryExpanded} = useUIContext();    

if(!text){
    return 
}

if (text.length <= limit) {
    return <p className="text-sm leading-relaxed text-slate-600">{text}</p>;
  }


const shortText = text.slice(0,limit);

const remainingText = text.slice(limit);

return (

// short text

<p className="text-sm leading-relaxed text-slate-600">
{shortText}

// long animated text

<span className={`
        inline-grid transition-all duration-500 ease-in-out overflow-hidden vertical-bottom
        ${isSummaryExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
      `}>

<span className="min-h-0 inline-block">
          {remainingText}
        </span>

</span>

{/* read more button */}
      <button
        onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
        className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-block focus:outline-none"
      >
        {isSummaryExpanded ? "Daha Az Oku" : "Devamını Oku"}
      </button>

</p>




)







}