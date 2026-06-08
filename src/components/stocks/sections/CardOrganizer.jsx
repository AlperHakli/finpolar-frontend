import { ExpandableIndicatorCard } from "../components/ExpandableIndicatorCard";

export function IndicatorCardOrganizer({ indicators }) {
  if (!indicators) {
    return <div className="p-10 text-center animate-pulse text-slate-400 font-medium">İndikatörler yükleniyor...</div>;
  }

  // Backend'den gelen nesneleri parçalıyoruz
  const rsi = indicators.rsi || {};
  const ma = indicators.moving_averages || {};
  const bb = indicators.bollinger_bands || {};
  const macd = indicators.macd || {};
  const vol = indicators.volume_analysis || {};

  return (
    <div className="w-full flex flex-col gap-2.5">
      
      {/* 1. RSI KARTI */}
      <ExpandableIndicatorCard 
        title="RSI (MOMENTUM)"
        mainValue={Number(rsi.rsi_value || 0).toFixed(2)}
        status={rsi.status || "NEUTRAL"}
        extraData={[
          { key: "Kapanış Fiyatı", value: `${Number(rsi.closing_price || 0).toFixed(2)} ₺` },
          { key: "Sembol (Ticker)", value: rsi.ticker || "Bilinmiyor" }
        ]}
      />

      {/* 2. HAREKETLİ ORTALAMALAR KARTI */}
      <ExpandableIndicatorCard 
        title="HAREKETLİ ORTALAMALAR"
        mainValue={`${Number(ma.curr_price || 0).toFixed(2)} ₺`}
        status={ma.status || "NEUTRAL"}
        extraData={[
          { key: "Anlık Fiyat", value: `${Number(ma.curr_price || 0).toFixed(2)} ₺` },
          { key: `SMA Kısa (Periyot: ${ma.short_window || 20})`, value: Number(ma.sma_short || 0).toFixed(2) },
          { key: `SMA Uzun (Periyot: ${ma.long_window || 50})`, value: Number(ma.sma_long || 0).toFixed(2) }
        ]}
      />

      {/* 3. BOLLINGER BANTLARI KARTI */}
      <ExpandableIndicatorCard 
        title="BOLLINGER BANTLARI"
        mainValue={Number(bb.middle || 0).toFixed(2)} // Orta bant ana değer
        status={bb.status || "NORMAL"}
        extraData={[
          { key: "Ham Fiyat", value: `${Number(bb.price || 0).toFixed(2)} ₺` },
          { key: "Üst Bant", value: Number(bb.upper || 0).toFixed(2) },
          { key: "Orta Bant (20 SMA)", value: Number(bb.middle || 0).toFixed(2) },
          { key: "Alt Bant", value: Number(bb.lower || 0).toFixed(2) }
        ]}
      />

      {/* 4. MACD TREND KARTI */}
      <ExpandableIndicatorCard 
        title="MACD TREND"
        mainValue={Number(macd.m_line || 0).toFixed(2)} // MACD çizgisi ana değer
        status={macd.status || "NEUTRAL"}
        extraData={[
          { key: "MACD Çizgisi", value: Number(macd.m_line || 0).toFixed(2) },
          { key: "Sinyal Çizgisi", value: Number(macd.s_line || 0).toFixed(2) }
        ]}
      />

      {/* 5. HACİM ANALİZİ KARTI */}
      <ExpandableIndicatorCard 
        title="HACİM ANALİZİ"
        mainValue={Number(vol.rvol || 0).toFixed(2)} // RVOL değerini ana sütuna aldık, hacmi alta açtık
        status={vol.status || "NORMAL"}
        extraData={[
          { key: "Mevcut Hacim", value: Math.round(vol.current_volume || 0).toLocaleString('tr-TR') },
          { key: "Ortalama Hacim", value: Math.round(vol.avg_volume || 0).toLocaleString('tr-TR') },
          { key: "Göreli Hacim (RVOL)", value: Number(vol.rvol || 0).toFixed(2) },
          { key: "Fiyat Değişimi", value: `%${Number(vol.price_change || 0).toFixed(2)}` }
        ]}
      />

    </div>
  );
}