import TaskItem from "./TaskItem";
import TaskSkeleton from "./TaskSkeleton";

const TaskList = ({ tasks, toggleTask, deleteTask, adding, filter }) => {
  if (!adding && tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-blue-900 mb-1">
          {filter === "done" ? "No completed tasks yet" : "No tasks yet"}
        </h3>
        <p className="text-slate-400 text-sm">
          {filter === "done"
            ? "Complete a task to see it here"
            : "Add your first task above to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* skeleton sits at position 0 — exactly where new task will land */}
      {adding && <TaskSkeleton />}
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
