export function SideMenuSkeleton(){

            return (
            <div className="w-full h-full bg-white border-l border-slate-100 flex flex-col select-none">
                {/* Başlık İskeleti */}
                <div className="p-2.5 border-b border-slate-50 bg-slate-50/30">
                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                </div>

                {/* Satır İskeletleri (Tam 10 adet taklit satır döner) */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-50/50">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div 
                            key={index} 
                            className="w-full flex items-center justify-between px-3 py-1.5 border-l-2 border-transparent"
                        >
                            {/* Sol Taraf: Sembol (Ticker) Yeri */}
                            <div className="flex flex-col leading-none">
                                <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
                            </div>

                            {/* Sağ Taraf: Fiyat ve Yüzde Değişim Yeri */}
                            <div className="flex items-center gap-1.5">
                                {/* Fiyat İskeleti */}
                                <div className="h-3 w-14 bg-slate-200 rounded animate-pulse" />
                                {/* Yüzde İskeleti */}
                                <div className="h-3 w-10 bg-slate-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );


}