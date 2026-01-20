
import React from "react";
import { motion } from "framer-motion";

// Animation settings for smooth spring effects
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// =========================================
// MenuItem Component (The trigger text)
// =========================================
export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      
      {/* The Menu Text (e.g., "Home", "Wellness") */}
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-neutral-800 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium"
      >
        {item}
      </motion.p>

      {/* The Dropdown Content */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // Keeps the box shape consistent
                className="bg-white dark:bg-zinc-900 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.1] dark:border-white/[0.1] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// =========================================
// Menu Component (The wrapper bar)
// =========================================
export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // Close menu when mouse leaves
      className="relative rounded-full border border-black/5 dark:bg-zinc-900 dark:border-white/[0.1] bg-white shadow-lg flex justify-center space-x-6 px-8 py-4"
    >
      {children}
    </nav>
  );
};

// =========================================
// HoveredLink Component (Individual links)
// =========================================
export const HoveredLink = ({ children, ...rest }) => {
  return (
    <a
      {...rest}
      className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
    >
      {children}
    </a>
  );
};