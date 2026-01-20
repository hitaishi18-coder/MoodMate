import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

export default function VideoSearchBar({ onSearch, placeholders }) {

  const [query, setQuery] = useState("");

  // Default placeholders (used for Yoga page)
  const defaultPlaceholders = [
    "Search morning yoga...",
    "Search weight loss workout...",
    "Search meditation...",
    "Search stretching routine...",
    "Search cardio training..."
  ];

  // If custom placeholders passed (like Food page), use them
  const finalPlaceholders = placeholders || defaultPlaceholders;

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  }

  return (
    <div className="flex items-center gap-3 w-full">

      {/* Aceternity Input */}
      <div className="flex-1">
        <PlaceholdersAndVanishInput
          placeholders={finalPlaceholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={() => {
          if (!query.trim()) return;
          onSearch(query);
        }}
        className="px-5 py-2 rounded-md 
                   border border-gray-300 dark:border-zinc-700
                   bg-white dark:bg-zinc-950
                   text-sm font-medium text-gray-800 dark:text-gray-200
                   hover:bg-gray-100 dark:hover:bg-zinc-900
                   transition-all duration-200"
      >
        Search
      </button>

    </div>
  );
}
