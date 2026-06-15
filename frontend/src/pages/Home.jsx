import { useEffect, useState } from "react";
import { API } from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskSkeleton from "../components/TaskSkeleton";
import ProgressCard from "../components/ProgressCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("all");

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const getTasks = async () => {
    try {
      const start = Date.now();
      const { data } = await API.get("/tasks");
      const elapsed = Date.now() - start;
      if (elapsed < 800) await delay(800 - elapsed);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
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

  // Optimistic — update state immediately, revert on error
  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    const updated = !task.completed;
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: updated } : t))
    );
    try {
      await API.patch(`/tasks/${id}`, { completed: updated });
    } catch (err) {
      console.error(err);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !updated } : t))
      );
    }
  };

  // Optimistic — remove immediately, restore on error
  const deleteTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await API.delete(`/tasks/${id}`);
    } catch (err) {
      console.error(err);
      setTasks((prev) => [task, ...prev]);
    }
  };

  const completedTasks = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const hasTasks = tasks.length > 0 || adding;

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

        {/* PROGRESS — skeleton during initial load, real card after */}
        {initialLoading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-100 animate-pulse shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3.5 w-32 rounded-lg bg-slate-100 animate-pulse" />
              <div className="h-3 w-24 rounded-lg bg-slate-100 animate-pulse" />
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 animate-pulse flex-1 hidden sm:block" />
          </div>
        ) : tasks.length > 0 ? (
          <ProgressCard total={tasks.length} completed={completedTasks} />
        ) : null}

        {/* FORM */}
        <TaskForm addTask={addTask} loading={adding} />

        {/* FILTERS */}
        {initialLoading ? (
          <div className="flex gap-2 mb-3 mt-6">
            <div className="w-10 h-7 rounded-full bg-slate-100 animate-pulse" />
            <div className="w-16 h-7 rounded-full bg-slate-100 animate-pulse" />
            <div className="w-24 h-7 rounded-full bg-slate-100 animate-pulse" />
          </div>
        ) : hasTasks ? (
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
        ) : null}
        
        {/* SECTION LABEL */}
        {initialLoading ? (
          <div className="h-3 w-28 rounded-md bg-slate-100 animate-pulse mb-2" />
        ) : hasTasks ? (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2 pl-0.5">
            {filteredTasks.length + (adding ? 1 : 0)}{" "}
            {filter === "done" ? "completed" : filter === "active" ? "active" : "total"}{" "}
            task{(filteredTasks.length + (adding ? 1 : 0)) !== 1 ? "s" : ""}
          </p>
        ) : null}

        {/* LIST */}
        <div className="mt-1">
          {initialLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <TaskSkeleton key={i} />
              ))}
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              adding={adding}
              filter={filter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
