import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function StockChart({ datahistory }) {
  // Eğer veri henüz gelmediyse veya boşsa boş dön
  if (!datahistory || datahistory.length === 0) return null;

  return (
    <div className="w-full h-full min-h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={datahistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          
          <XAxis 
            dataKey="date" 
            hide={true} 
          />
          
          <YAxis 
            domain={['auto', 'auto']} 
            hide={true} 
          />

          
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            labelClassName="text-slate-400 font-medium"
            itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
          />

         
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#2563eb" 
            strokeWidth={3} 
            dot={false} 
            activeDot={{ r: 6, strokeWidth: 0 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}






export function StockAnalysisPage({ data }) {

  if (!data) return null; 

  const {
    symbol = "N/A",
    name = "Company Name Not Found",
    currentPrice = "N/A",
    marketCap = "N/A",
    peRatio = "N/A",
    summary = ""
  } = data;

  const displaySummary = summary ? summary.slice(0, 520) + "..." : "No analysis summary available.";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      

      <div className="flex flex-col mb-10">
        <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-none">
          {symbol}
        </h2>
        <p className="text-2xl font-medium text-slate-400 mt-2 tracking-tight">
          {name}
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Price</p>
          <p className="text-3xl font-mono font-bold text-slate-800">
            {currentPrice !== "N/A" ? `₺${currentPrice}` : "N/A"}
          </p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Market Cap</p>
          <p className="text-3xl font-mono font-bold text-slate-800">{marketCap}</p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">P/E Ratio</p>
          <p className="text-3xl font-mono font-bold text-slate-800">
            {typeof peRatio === "number" ? peRatio.toFixed(2) : peRatio}
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 h-[400px] bg-white rounded-4xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium italic shadow-inner">
          <StockChart datahistory={data.history} />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Summary
          </h3>
          <div className="p-5 bg-blue-50/40 rounded-3xl border border-blue-100 text-sm text-slate-700 leading-relaxed italic shadow-sm">
            {displaySummary}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StockAnalysisSkeleton() {
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