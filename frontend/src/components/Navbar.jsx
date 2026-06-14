const Navbar = ({ totalTasks, completedTasks }) => {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-900 to-blue-700">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow-sm">
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="18" height="18">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <span className="font-bold text-indigo-950 text-[1.05rem] tracking-tight">
            Taskflow
          </span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10" height="10">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {totalTasks} tasks
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/35 text-indigo-200 text-xs font-semibold">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="10" height="10">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {completedTasks} done
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
