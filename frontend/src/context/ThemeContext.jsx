import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 1. Initialize State
  const [theme, setTheme] = useState(() => {
    // Check local storage or system preference immediately
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // 2. Apply Theme to HTML Tag
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the old class and add the new one
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Toggle Function
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}