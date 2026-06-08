export function StockInfoCard({ data }) {
  return (

    <div className="group px-2 py-1.5 rounded-lg transition-colors duration-200 hover:bg-slate-50">
      
      <div className="flex flex-row justify-between items-baseline">

        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
          {data.label}
        </span>
        <span className="text-sm font-bold text-slate-700 tracking-tight">
          {data.value}
        </span>
      </div>


      <div className="h-[1px] bg-slate-100 w-full mt-1.5 group-last:hidden group-hover:bg-transparent transition-colors" />
      
    </div>
  );
}