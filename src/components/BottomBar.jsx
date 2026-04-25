export function BottomBar() {
  return (
    <footer className="w-full bg-blue-600 text-white py-1.5 px-8 flex justify-between items-center text-[11px] font-medium tracking-wide z-20">
      <div className="flex items-center gap-4">
        {/* Şimdilik boş ama görsel olarak dolu dursun diye küçük yer tutucular ekledim */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>SYSTEM ONLINE</span>
        </div>
        <span className="opacity-50">|</span>
        <span>LATENCY: 24ms</span>
      </div>

      <div className="flex items-center gap-4 opacity-80">
        <span>FINPOLAR AI v1.0.2-BETA</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}