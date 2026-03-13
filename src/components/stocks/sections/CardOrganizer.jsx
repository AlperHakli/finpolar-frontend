import { IndicatorCard } from "../components/IndicatorCard.jsx";

export function CardOrganizer({ indicators = [] }) {
  return (
    /* grid-cols-12: Hassas yerleşim için 12'li sistemi koruyoruz */
    /* gap-2: Kartlar arasındaki boşluğu azalttık (sıkı düzen) */
    <div className="grid grid-cols-12 gap-4 w-full px-10">
      {indicators.map((indicator, index) => {
        let spanClass = "";

        if (index === 0) {
          // ÜSTTEKİ 1. KART:
          // col-start-3: Kart 3. sütundan başlar. (Solda 2 birimlik boşluk bırakır)
          // col-span-4: 4 birim kaplar. (3, 4, 5, 6. sütunları doldurur)
          spanClass = "col-span-4 col-start-3";
        } else if (index === 1) {
          // ÜSTTEKİ 2. KART:
          // 1. kart 6. sütunda bittiği için, bu kart otomatik 7. sütundan başlar.
          // col-span-4: 4 birim kaplar. (7, 8, 9, 10. sütunları doldurur)
          // Bu sayede sağda da 2 birimlik (11 ve 12) boşluk kalır ve kartlar merkeze sıkışır.
          spanClass = "col-span-4";
        } else {
          // ALTAKİ 4 KART (index >= 2):
          // col-span-3: Her biri 3 birim kaplar (12 / 3 = 4 sütun).
          // Tam bir satıra 4 tane sığacak şekilde hizalandı.
          spanClass = "col-span-3";
        }

        return (
          <div key={indicator.id || index} className={spanClass}>
            <IndicatorCard 
              title={indicator.title} 
              data={indicator.data} 
            />
          </div>
        );
      })}
    </div>
  );
}