import { useAnalysisContext } from "../../../contexts/AnalysisContext";
import { apiConfig } from "../../../config/apiconfig";
import { MAIN_PAGE_SETTINGS } from "../../../config/uiconfig";
import { TopVolumeGrid } from "../../main/TopVolumeGrid";
import { Dropdown } from "react-bootstrap";
export function StocksBySectorGridView({headerContent , stocksBySector , setCurrentSectorName , singleSectorStocksList}){




    return(
<div className="flex flex-col gap-3">
    <Dropdown>
        <Dropdown.Toggle className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl px-4 text-xs" id="toggle_dropdown" >
Sektörler
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {apiConfig.SECTOR_NAMES_SETTINGS.map((sector_name) => (
                <Dropdown.Item key={sector_name} onClick={() => setCurrentSectorName(sector_name)}>{sector_name}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>


    {singleSectorStocksList?.length === 0 ? 
<div className="h-1/3 w-full bg-gray-400 border-slate-400 rounded-xl "></div>
:
<TopVolumeGrid watchList={singleSectorStocksList} />

}

</div>







)}