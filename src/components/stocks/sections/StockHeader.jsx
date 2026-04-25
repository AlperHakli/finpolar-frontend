export function StockHeader({ stockData }) {

    if (!stockData) {
        return <div className="p-10 animate-pulse">Analiz hazirlaniyor...</div>;
    };


    return (

        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-5xl">
                {stockData.symbol}  <span className="text-xl text-slate-400"> {stockData.name}</span>
            </h1>



            <div className="flex flex-row gap-2 pl-3">

                <div><span className="text-3xl font-semibold">{stockData.currentPrice}</span></div>
                <div className="self-end pb-1">
                    <span className="text-xl font-semibold text-slate-500">TRY</span>
                </div>

                <div>
                    <span className={`text-3xl font-semibold ${stockData.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>

                        {stockData.changeDigit > 0 && '+'}

                        {stockData.changeDigit} ({stockData.changePercent > 0 && '+'}

                        %{stockData.changePercent})
                    </span>
                </div>



            </div>

        </div>

    );

};