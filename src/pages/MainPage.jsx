export  function MainPage() {
  return (
    <div className="min-h-screen bg-white text-white p-6 space-y-6">

      {/* 2. Ana Gövde Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Geniş Taraf (AI + Sektör) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center gap-2">
              ✨ Yapay Zekanın Öne Çıkardıkları
            </h2>
            {/* AI Hisse Kartları Buraya (Grid veya Flex) */}
          </div>
          
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Sektörel Dağılım</h2>
            {/* Sektör Butonları/Isı Haritası Buraya */}
          </div>
        </div>

        {/* Sağ Dar Taraf (En Çok Artanlar + Hacim Patlaması) */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4 text-red-400">Günün Hareketleri</h2>
            {/* En Çok Artan/Azalan Listesi */}
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4 text-amber-400">🔥 Olağanüstü Hacimlenenler</h2>
            {/* RVOL Listesi */}
          </div>
        </div>
      </div>
    </div>
  );
}