const TaskSkeleton = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-slate-100">
      <div className="w-5 h-5 rounded-md bg-slate-100 animate-pulse shrink-0" />
      <div className="flex-1 h-4 rounded-lg bg-slate-100 animate-pulse" />
      <div className="w-16 h-4 rounded-lg bg-slate-100 animate-pulse" />
    </div>
  );
};

export default TaskSkeleton;
