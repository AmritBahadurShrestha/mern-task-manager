const ProgressCard = ({ total, completed }) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const circumference = 2 * Math.PI * 22;
  const offset = circumference - (circumference * pct) / 100;

  const heading =
    pct === 100 ? "All done!"
    : pct >= 75  ? "Almost there!"
    : pct >= 50  ? "Halfway there!"
    : pct > 0    ? "Good progress!"
    : "Let's get started!";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 mb-6">
      {/* Ring */}
      <div className="relative w-14 h-14 shrink-0">
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <circle cx="28" cy="28" r="22" fill="none" stroke="#e0e7ff" strokeWidth="4" />
          <circle
            cx="28" cy="28" r="22" fill="none"
            stroke="url(#ringGrad)" strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-blue-700">
          {pct}%
        </div>
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-blue-900 mb-0.5">{heading}</p>
        <p className="text-xs text-slate-400">{completed} of {total} tasks completed</p>
      </div>

      {/* Bar */}
      <div className="h-1.5 rounded-full bg-blue-100 flex-1 min-w-0 hidden sm:block">
        <div className="h-1.5 rounded-full bg-linear-to-r from-blue-900 to-blue-500 overflow-hidden">
          <div
            className="h-full rounded-full bg-linear-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
