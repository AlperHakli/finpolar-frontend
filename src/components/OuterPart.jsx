import { Link } from "react-router-dom";

export function OuterPart() {
  return (
    <footer className="w-full bg-blue-600 text-white min-h-100 py-20 px-10 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sol Taraf: Logo ve Motto */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-black tracking-tighter mb-4 text-white">
            FINPOLAR <span className="text-blue-200">AI</span>
          </h2>
          <p className="text-blue-100 text-lg max-w-md">
            Yapay zeka ile finansal verileri analiz edin, 
            kararlarınızı verilerle güçlendirin. Yeni nesil borsa terminali.
          </p>
        </div>

        {/* Orta: Linkler 1 */}
        <div>
          <h3 className="font-bold mb-4 text-blue-200 uppercase text-sm tracking-wider">Ürün</h3>
          <ul className="space-y-3 font-medium">
                        <li>
              <Link 
                to="/" 
                className="text-white hover:text-amber-300 hover:underline transition-colors duration-200 inline-block cursor-pointer"
              >
                Ana Menü
              </Link>
            </li>
            <li>
              <Link 
                to="/stocks" 
                className="text-white hover:text-amber-300 hover:underline transition-colors duration-200 inline-block cursor-pointer"
              >
                Hisseler
              </Link>
            </li>
            <li>
              <Link 
                to="/ai" 
                className="text-white hover:text-amber-300 hover:underline transition-colors duration-200 inline-block cursor-pointer"
              >
                AI Analiz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Alt Çizgi ve Telif */}
      <div className="max-w-6xl mx-auto border-t border-blue-500/60 mt-20 pt-8 text-sm text-blue-100 flex justify-between">
        <p>© {new Date().getFullYear()} Finpolar AI. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}