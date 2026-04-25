import { useUIContext } from "../contexts/UIContext"

export function SideBarButton() {

    const {setIsSidebarOpen , isSidebarOpen} = useUIContext();

    return (

        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
           
            <div className="w-5 h-0.5 bg-slate-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-slate-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-slate-600"></div>
        </button>

    )


}