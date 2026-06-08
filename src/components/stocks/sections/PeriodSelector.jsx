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

    <div className="w-full flex flex-wrap gap-5">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => setPeriod(p.value)}

          className={`px-2 rounded-xs text-sm font-semibold transition-all duration-200
            ${period === p.value 
              ? "bg-blue-600 text-white shadow-md shadow-blue-100 scale-105" 
              : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}