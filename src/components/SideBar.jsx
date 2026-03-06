import { NavLink } from "react-router-dom"



export function SideBar() {


  return (

    <aside className="w-32 border-r border-slate-200 bg-white h-full flex flex-col p-4">

      <nav className="flex flex-col gap-2">

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

