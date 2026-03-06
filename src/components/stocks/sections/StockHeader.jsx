export function StockHeader({ stockData }) {

    if (!stockData) {
        return <div className="p-10 animate-pulse">Analiz hazirlaniyor...</div>;
    };

    return (

        <div>
            <h1 className="font-bold text-5xl">
                {stockData.symbol}  <span className="text-xl text-slate-400"> {stockData.name}</span>
            </h1>

        </div>

    );

};