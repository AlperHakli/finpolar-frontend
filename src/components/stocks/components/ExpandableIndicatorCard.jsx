import { useState } from "react";

export function ExpandableIndicatorCard({ title, mainValue, status, extraData = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden w-full">
      
      {/* KART KAPALI HALİ (Yatay Row Şeklinde) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 flex items-center bg-white hover:bg-slate-50/50 transition-colors text-left focus:outline-none"
      >
        {/* KEY (İndikatör Adı) */}
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3 min-w-[140px]">
          {title}
        </span>

        {/* VALUE (Ana Hesaplanan Değer) */}
        <span className="text-xs font-black text-slate-800 tracking-tight w-1/4 pl-4">
          {mainValue}
        </span>

        {/* STATUS (Backend'den Gelen Ham Sinyal - Renksiz, Düz Sade Metin) */}
        <span className="text-xs font-bold text-slate-500 tracking-wide uppercase ml-auto pr-2">
          {status}
        </span>

        {/* Küçük Açılma Oku */}
        <span className={`text-xs text-slate-400 font-bold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* KART UZUN HALİ (Sadece Key - Value Listesi) */}
      <div className={`
        grid transition-all duration-300 ease-in-out
        ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'}
      `}>
        <div className="min-h-0 bg-slate-50/30 px-4 py-1 flex flex-col">
          {extraData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center py-2.5">
                <span className="text-xs text-slate-400 font-medium">
                  {item.key}
                </span>
                {/* Tüm özel text-green/red renk ezmelerini kaldırdım, düz siyah-gri akıyor */}
                <span className="text-xs font-bold text-slate-700">
                  {item.value}
                </span>
              </div>
              {index !== extraData.length - 1 && (
                <div className="h-[1px] bg-slate-100 w-full" />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}