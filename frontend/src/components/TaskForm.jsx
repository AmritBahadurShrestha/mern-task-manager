import { useState } from "react";

const TaskForm = ({ addTask, loading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTask(value.trim());
    setValue("");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3 flex gap-2.5 items-center shadow-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        placeholder="What do you need to get done?"
        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !value.trim()}
        className="cursor-pointer h-10.5 px-5 rounded-xl bg-linear-to-br from-blue-900 to-blue-600 text-white text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {loading ? (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
        Add task
      </button>
    </div>
  );
};

export default TaskForm;
