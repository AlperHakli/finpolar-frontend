export const IndicatorCard = ({ title, data = [] }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-1 hover:shadow-md transition-shadow h-full ">

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
        {title}
      </h3>


      <div className="flex flex-col">
        {data.map((item, index) => (
          <div key={index}>

            <div className="h-[1px] bg-slate-100 w-2/3 mx-auto " />


            <div className="flex justify-between items-center py-0.5">
              <span className="text-sm text-slate-400 font-medium">
                {item.key}
              </span>
              <span className={`text-sm font-bold ${item.color || 'text-slate-700'}`}>
                {item.value}
              </span>
            </div>
          </div>
        ))}

        <div className="h-[1px] bg-slate-100 w-full" />
      </div>
    </div>
  );
};