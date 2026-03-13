export const AIScoreBar = ({ score = 0 }) => {
  const clampedScore = Math.min(Math.max(score, 0), 100);

  const getGlowColor = (score) => {
    if (score >= 80) return "rgba(16, 185, 129, 0.6)"; 
    if (score >= 50) return "rgba(251, 191, 36, 0.6)"; 
    if (score >= 20) return "rgba(251, 146, 60, 0.6)"; 
    return "rgba(248, 113, 113, 0.6)"; 
  };

  const glowColor = getGlowColor(clampedScore);

  return (
    <div className="flex flex-col w-full gap-2">

      <div className="flex justify-between items-end px-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          AI Score Analysis
        </span>
        <span className="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-md shadow-sm">
          {clampedScore} / 100
        </span>
      </div>


      <div className="relative w-full h-12 bg-slate-100 rounded-full border border-slate-200 shadow-inner overflow-hidden">


        <div
          className="absolute left-0 h-full transition-all duration-1000 ease-out rounded-full"
          style={{
            width: `${clampedScore}%`, 
            background: `linear-gradient(to right, 
              #FF0000 0%,    
              #FF7700 25%,   
              #FFEE00 50%,   
              #9BE800 75%,   
              #00D627 100%   
            )`,

            backgroundSize: '1000px 100%', 
            boxShadow: `0px 0px 15px ${glowColor}`, 
          }}
        />


        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
      </div>
    </div>
  );
};