import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Trash2, Plus, CheckCircle, Circle } from "lucide-react"; // Icons
import Footer from "@/components/Footer";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // 1. Load saved todos
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // 2. Save todos on change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTask() {
    if (!task.trim()) return;
    const newTask = { id: Date.now(), text: task, complete: false };
    setTodos([newTask, ...todos]); // Add to top
    setTask("");
  }

  function toggleTask(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, complete: !t.complete } : t));
  }

  function deleteTask(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-32 pb-12">
        <h1 className="text-3xl font-bold text-center mb-8">📝 Task Master</h1>

        {/* Input Area */}
        <div className="flex gap-2 mb-8">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
            className="
              flex-1 px-4 py-3 rounded-xl 
              bg-white dark:bg-zinc-900 
              border border-zinc-200 dark:border-zinc-800
              focus:ring-2 focus:ring-zinc-500 focus:outline-none
              transition-all
            "
          />
          <button
            onClick={addTask}
            className="
              bg-zinc-900 dark:bg-white 
              text-white dark:text-black 
              px-5 py-3 rounded-xl font-medium 
              hover:opacity-90 active:scale-95 transition-all
              flex items-center gap-2
            "
          >
            <Plus size={20} /> Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`
                  flex items-center justify-between p-4 rounded-xl border transition-all
                  ${todo.complete 
                    ? "bg-zinc-100 dark:bg-zinc-900/50 border-transparent opacity-60" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm"
                  }
                `}
              >
                {/* Checkbox & Text */}
                <div 
                  onClick={() => toggleTask(todo.id)}
                  className="flex items-center gap-4 cursor-pointer flex-1"
                >
                  {todo.complete 
                    ? <CheckCircle className="text-green-500" size={24} /> 
                    : <Circle className="text-zinc-400" size={24} />
                  }
                  <span className={`text-lg ${todo.complete ? "line-through text-zinc-400" : ""}`}>
                    {todo.text}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="text-zinc-400 hover:text-red-500 p-2 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {todos.length === 0 && (
            <p className="text-center text-zinc-400 mt-8 italic">No tasks yet. Enjoy your day!</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}