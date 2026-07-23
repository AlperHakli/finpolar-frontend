import { useUIContext } from "../contexts/UIContext";
import { NavLink } from "react-router-dom";

export function SideBar() {
  // 💡 Context'ten kapatma fonksiyonunu da çekiyoruz (toggleSidebar veya setIsSidebarOpen)
  const { isSidebarOpen, setIsSidebarOpen } = useUIContext();

  return (
    <>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 top-14 z-40 bg-slate-900/20 backdrop-blur-[1px] transition-opacity"
        />
      )}


      <aside
        className={`
          fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] bg-white border-r border-slate-200
          flex flex-col transition-all duration-300 ease-in-out overflow-hidden shadow-lg
          
          ${isSidebarOpen 
            ? "w-64 p-4 opacity-100" 
            : "w-0 p-0 border-none opacity-0 pointer-events-none"
          } 
        `}
      >
        <nav className="flex flex-col gap-2 w-56">
          <NavLink
            to={"/"}
            onClick={() => setIsSidebarOpen(false)} // 💡 Linke tıklayınca da kapansın
            className={({ isActive }) =>
              `p-3 rounded-lg flex items-center gap-2 transition-colors
              ${isActive 
                ? "bg-blue-50 text-blue-600 font-semibold" 
                : "text-slate-600 hover:bg-slate-100"}`
            }
          >
            <span className="font-medium"> Main Menu </span>
          </NavLink>

          <NavLink
            to={"/stocks"}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg flex items-center gap-2 transition-colors
              ${isActive 
                ? "bg-blue-50 text-blue-600 font-semibold" 
                : "text-slate-600 hover:bg-slate-100"}`
            }
          >
            <span className="font-medium"> Stocks </span>
          </NavLink>

          <NavLink
            to={"/ai"}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg flex items-center gap-2 transition-colors
              ${isActive 
                ? "bg-blue-50 text-blue-600 font-semibold" 
                : "text-slate-600 hover:bg-slate-100"}`
            }
          >
            <span className="font-medium"> FinpolarAI </span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
}