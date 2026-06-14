import { useEffect, useState } from "react";
import { API } from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskSkeleton from "../components/TaskSkeleton";
import ProgressCard from "../components/ProgressCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("all");

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const getTasks = async () => {
    try {
      setLoading(true);
      const start = Date.now();
      const { data } = await API.get("/tasks");
      const elapsed = Date.now() - start;
      if (elapsed < 800) await delay(800 - elapsed);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getTasks(); }, []);

  const addTask = async (title) => {
    try {
      setAdding(true);
      const { data } = await API.post("/tasks", { title });
      setTasks((prev) => [data, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (!task) return;
      const updated = !task.completed;
      await API.patch(`/tasks/${id}`, { completed: updated });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: updated } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const completedTasks = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-200">
      <Navbar totalTasks={tasks.length} completedTasks={completedTasks} />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* HERO */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-700 mb-2">
            Your daily workspace
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 tracking-tight leading-tight">
            Task Manager
          </h1>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Stay organized, productive, and focused
          </p>
        </div>

        {/* PROGRESS */}
        {!loading && tasks.length > 0 && (
          <ProgressCard total={tasks.length} completed={completedTasks} />
        )}

        {/* FORM */}
        <TaskForm addTask={addTask} loading={adding} />

        {/* FILTERS */}
        {!loading && tasks.length > 0 && (
          <div className="flex gap-2 mb-3 mt-6">
            {["all", "active", "done"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize ${
                  filter === f
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50"
                }`}
              >
                {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
              </button>
            ))}
          </div>
        )}

        {/* SECTION LABEL */}
        {!loading && tasks.length > 0 && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2 pl-0.5">
            {filteredTasks.length}{" "}
            {filter === "done" ? "completed" : filter === "active" ? "active" : "total"}{" "}
            task{filteredTasks.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* LIST */}
        <div className="mt-1">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <TaskSkeleton key={i} />
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
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
          ) : (
            <TaskList
              tasks={filteredTasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
