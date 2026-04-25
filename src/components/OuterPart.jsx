export function OuterPart() {
  return (
    <footer className="w-full bg-blue-600 text-white min-h-100 py-20 px-10 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sol Taraf: Logo ve Motto */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-black tracking-tighter mb-4">
            FINPOLAR <span className="text-blue-200">AI</span>
          </h2>
          <p className="text-blue-100 text-lg max-w-md">
            Yapay zeka ile finansal verileri analiz edin, 
            kararlarınızı verilerle güçlendirin. Yeni nesil borsa terminali.
          </p>
        </div>

        {/* Orta: Linkler 1 */}
        <div>
          <h3 className="font-bold mb-4 text-blue-200 uppercase text-sm">Ürün</h3>
          <ul className="space-y-2 opacity-80">
            <li>Hisseler</li>
            <li>Haberler</li>
            <li>AI Analiz</li>
          </ul>
        </div>

        {/* Sağ: İletişim */}
        <div>
          <h3 className="font-bold mb-4 text-blue-200 uppercase text-sm">Kurumsal</h3>
          <ul className="space-y-2 opacity-80">
            <li>Hakkımızda</li>
            <li>İletişim</li>
            <li>Gizlilik Politikası</li>
          </ul>
        </div>
      </div>

      {/* Alt Çizgi ve Telif */}
      <div className="max-w-6xl mx-auto border-t border-blue-500 mt-20 pt-8 text-sm opacity-60 flex justify-between">
        <p>© 2026 Finpolar AI. Tüm hakları saklıdır.</p>
        <p>Kocaeli, Türkiye</p>
      </div>
    </footer>
  );
}