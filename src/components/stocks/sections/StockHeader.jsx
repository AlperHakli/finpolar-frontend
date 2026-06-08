export function StockHeader({ stockData }) {

    if (!stockData) {
        return <div className="p-10 animate-pulse">Analiz hazirlaniyor...</div>;
    };


    return (

<section className="flex flex-col">
    <div className="flex flex-row gap-1 items-baseline">

            <h1 className="font-bold text-2xl">
                {stockData?.symbol.split(".")[0] ?? "Undefined"}  
            </h1>

            <h2 className=" text-slate-400 align-text-bottom"> {stockData?.name}</h2>

            </div>

            <div className="flex flex-row gap-1 items-baseline">

                <div>
                    <p className="text-xl font-semibold">{(stockData?.last_price.toFixed(2) ?? 0)}
                    </p>
                    </div>
                    <span className="text-xl font-semibold text-slate-500">TRY</span>

                    <span className={`text-xs font-semibold ${stockData.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>

                        {stockData.changeDigit > 0 && '+'}

                        {(stockData.changeDigit ?? 0.00).toFixed(2)} ({stockData.changePercent > 0 && '+'}

                        %{stockData.changePercent})
                    </span>
                



            </div>


</section>

    );

};