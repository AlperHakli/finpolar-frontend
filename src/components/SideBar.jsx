import { useUIContext } from "../contexts/UIContext";

import { NavLink } from "react-router-dom"



export function SideBar() {

const {isSidebarOpen} = useUIContext();
  return (

    <aside 
className={`

    fixed top-14 left-0 z-50 h-full bg-white border-r border-slate-200
    flex flex-col transition-all duration-300 ease-in-out overflow-hidden
    

    ${isSidebarOpen 
      ? "w-64 p-4 opacity-100" // Mobilde de PC'de de sabit şık bir genişlik (64 = 16rem/256px)
      : "w-0 p-0 border-none opacity-0 pointer-events-none"
    } 
  `}
      
      >

      <nav className="flex flex-col gap-2 w-56">

                <NavLink
          to={"/"}
          className={({ isActive }) =>
            `p-3 rounded-lg flex items-center gap-2
  ${isActive ?
              "bg-blue-50 text-blue-600 font-semibold"
              : "text-slate-600 hover:bg-slate-100"}`

          }
        >
          <span className="font-medium"> Main Menu </span>

        </NavLink>

        <NavLink
          to={"/stocks"}
          className={({ isActive }) =>
            `p-3 rounded-lg flex items-center gap-2
  ${isActive ?
              "bg-blue-50 text-blue-600 font-semibold"
              : "text-slate-600 hover:bg-slate-100"}`

          }
        >
          <span className="font-medium"> Stocks </span>

        </NavLink>



        <NavLink
          to={"/ai"}
          className={({ isActive }) =>
            `p-3 rounded-lg flex items-center gap-2
  ${isActive ?
              "bg-blue-50 text-blue-600 font-semibold"
              : "text-slate-600 hover:bg-slate-100"}`

          }
        >
          <span className="font-medium"> FinpolarAI </span>

        </NavLink>

        <NavLink
          to={"/news"}
          className={({ isActive }) =>
            `p-3 rounded-lg flex items-center gap-2
  ${isActive ?
              "bg-blue-50 text-blue-600 font-semibold"
              : "text-slate-600 hover:bg-slate-100"}`

          }
        >
          <span className="font-medium"> News </span>

        </NavLink>


      </nav>



    </aside>


  );









}

