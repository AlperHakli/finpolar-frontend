import { StockInfoCard } from "../components/StockInfoCard";

export function StockInfoCardOrganizer({ stockData = [] }) {

    return (
        <div className="grid grid-cols-3 w-full gap-x-12 gap-y-2">
            {stockData.map((data, index) => {
                return (
                    <StockInfoCard data={data} />

                );

            })}




        </div>


    )






}