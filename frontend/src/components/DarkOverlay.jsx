import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-zinc-700 rounded-full p-1"
    >
      <motion.div
        className="w-5 h-5 bg-white dark:bg-black rounded-full shadow-md"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          x: theme === "dark" ? 24 : 0,
        }}
      />
    </button>
  );
}
