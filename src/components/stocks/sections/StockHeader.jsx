export function StockHeader({ stockData }) {

    if (!stockData) {
        return <div className="p-10 animate-pulse">Analiz hazirlaniyor...</div>;
    };


    return (

        <div className="gap-5">
            <h1 className="font-bold text-5xl">
                {stockData.symbol}  <span className="text-xl text-slate-400"> {stockData.name}</span>
            </h1>

            <span className={`text-2xl font-semibold ${stockData.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {stockData.changeDigit > 0 && '+'}

                {stockData.changeDigit} ({stockData.changePercent > 0 && '+'}

                %{stockData.changePercent})
            </span>

        </div>

    );

};