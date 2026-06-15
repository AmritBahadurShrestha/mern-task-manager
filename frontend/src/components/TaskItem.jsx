const TaskItem = ({ task, toggleTask, deleteTask }) => {
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3.5 min-h-13 rounded-2xl border transition-all duration-200 ${
        task.completed
          ? "bg-slate-50 border-slate-100"
          : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task._id)}
        className={`cursor-pointer w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
          task.completed
            ? "bg-linear-to-br from-blue-700 to-blue-500 border-transparent"
            : "border-slate-300 bg-white hover:border-blue-400"
        }`}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && (
          <svg className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* Title */}
      <span
        className={`flex-1 text-sm font-medium transition-colors ${
          task.completed ? "line-through text-slate-400" : "text-slate-900"
        }`}
      >
        {task.title}
      </span>

      {/* Date */}
      <span className="text-xs text-slate-300 whitespace-nowrap hidden sm:block">
        {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </span>

      {/* Delete */}
      <button
        onClick={() => deleteTask(task._id)}
        className="cursor-pointer opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-400 transition-all"
        aria-label="Delete task"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
