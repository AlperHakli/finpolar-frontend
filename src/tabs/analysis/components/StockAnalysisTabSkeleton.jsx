export function StockAnalysisTabSkeleton() {
  return (
    <div className="p-8 animate-pulse">

      <div className="h-12 w-48 bg-slate-200 rounded-lg mb-8"></div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-3xl border border-slate-50"></div>
        ))}
      </div>


      <div className="h-[400px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100"></div>
    </div>
  );
}