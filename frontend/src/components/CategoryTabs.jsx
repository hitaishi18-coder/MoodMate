export default function CategoryTabs({ categories, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">

      {/* All */}
      <button
        onClick={() => onSelect("All")}
        className="
          px-4 py-1 rounded-full
          border border-gray-300 dark:border-white/20
          hover:bg-gray-100 dark:hover:bg-zinc-800
          transition
        "
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="
            px-4 py-1 rounded-full capitalize
            border border-gray-300 dark:border-white/20
            hover:bg-gray-100 dark:hover:bg-zinc-800
            transition
          "
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
