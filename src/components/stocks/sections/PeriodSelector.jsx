import { useAnalysisContext } from "../../../contexts/AnalysisContext";

export function PeriodSelector() {
  const { period, setPeriod } = useAnalysisContext();

  const periods = [
    { label: "1D", value: "1d" },
    { label: "5D", value: "5d" },
    { label: "1M", value: "1mo" },
    { label: "6M", value: "6mo" },
    { label: "1Y", value: "1y" },
    { label: "5Y", value: "5y" },
    { label: "All", value: "max" },
  ];

  return (

    <div className="w-full py-2 flex flex-wrap gap-2">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => setPeriod(p.value)}

          className={`px-11 py-2 rounded-xl text-sm font-semibold transition-all duration-200
            ${period === p.value 
              ? "bg-blue-600 text-white shadow-md shadow-blue-100 scale-105" 
              : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"
            }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}